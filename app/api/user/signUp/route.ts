import prisma from '@lib/authPrisma';
import { NextResponse } from "next/server";
import { Prisma } from '@prismaAuthClient';
import { hashPassword } from '@lib/passwordUtils';
import { saveImage } from '@lib/imageUtils';

export const bodyParser = false;

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const formData = await req.formData();
        const { name, email, password, country } = {
            name: formData.get('name')?.toString() ?? '',
            email: formData.get('email')?.toString() ?? '',
            password: formData.get('password')?.toString() ?? '',
            country: formData.get('country')?.toString() ?? '',
        };

        const requiredFields = ['name', 'email', 'password', 'country'];
        let errors: string[] = [];

        const missingFields = requiredFields.filter(field => !formData.get(field)?.toString());

        if (missingFields.length > 0) {
            return NextResponse.json({ errors: [`Missing fields: ${missingFields.join(', ')}`] }, { status: 400 });
        }

        if (password.length < 6) {
            errors.push('Password length should be more than 6 characters');
            return NextResponse.json({ errors }, { status: 400 });
        }

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: email },
            });

            if (existingUser) {
                errors.push('Email is already in use');
                return NextResponse.json({ errors }, { status: 400 });
            }

            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: 'user',
                    country: country,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    country: true,
                },
            });

            const file = formData.get('image');
            if (file instanceof Blob) {
                const maxSizeInBytes = 5 * 1024 * 1024;
                if (file.size > maxSizeInBytes) {
                    await prisma.user.delete({ where: { id: user.id } });
                    return NextResponse.json(
                        { errors: ['Image size exceeds the maximum allowed size (5 MB)'] },
                        { status: 400 }
                    );
                }
                try {
                    const fileExtension = file.type.split('/').pop() || "invalid";
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const imagePath = saveImage(buffer, user.id.toString(), fileExtension);

                    if (imagePath) {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { image: imagePath },
                        });
                    } else {
                        await prisma.user.delete({ where: { id: user.id } });
                        return NextResponse.json({ errors: ['Error saving the image'] }, { status: 500 });
                    }
                } catch (error) {
                    await prisma.user.delete({ where: { id: user.id } });
                    console.error('Error saving the image:', error);
                    return NextResponse.json({ errors: ['Error saving the image'] }, { status: 500 });
                }
            }

            return NextResponse.json({ user, created: true }, { status: 201 });

        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return NextResponse.json({ message: e.message }, { status: 400 });
                }
                return NextResponse.json({ message: e.message }, { status: 400 });
            } else {
                console.error('Unexpected error:', e);
                return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
            }
        }
    } else {
        return NextResponse.json({ message: 'Method Not allowed' }, { status: 405 });
    }
}
