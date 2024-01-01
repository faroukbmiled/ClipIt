import { hashPassword } from '@lib/passwordUtils';
import { Prisma } from '@prismaAuthClient';
import prisma from '@lib/authPrisma';
import { saveImage } from '@lib/imageUtils';
import { NextResponse as res } from 'next/server';
import { withAuth } from '@lib/authMiddleware';

export const bodyParser = false;

export async function PUT(req: Request, response: Response) {
    if (req.method === 'PUT') {
        try {
            const user = await withAuth(req, res, true, true);
            const formData = await req.formData();
            const { name, email, password, country } = {
                name: formData.get('name')?.toString() ?? '',
                email: formData.get('email')?.toString() ?? '',
                password: formData.get('password')?.toString() ?? '',
                country: formData.get('country')?.toString() ?? '',
            };

            const existingUser = await prisma.user.findUnique({
                where: { id: user.id as string },
            });

            if (!existingUser) {
                return res.json({ errors: ['User not found'] }, { status: 404 });
            }

            const updateData: { [key: string]: any } = {};

            if (name) {
                updateData.name = name;
            }

            if (email) {
                updateData.email = email;
            }

            if (password) {
                const hashedPassword = await hashPassword(password);
                updateData.password = hashedPassword;
            }

            if (country) {
                updateData.country = country;
            }

            const cover_file = formData.get('cover');
            if (cover_file instanceof Blob) {
                const maxSizeInBytes = 5 * 1024 * 1024;
                if (cover_file.size > maxSizeInBytes) {
                    await prisma.user.delete({ where: { id: user.id } });
                    return res.json(
                        { errors: ['Cover size exceeds the maximum allowed size (5 MB)'] },
                        { status: 400 }
                    );
                }
                try {
                    const fileExtension = cover_file.type.split('/').pop() || "invalid";
                    const buffer = Buffer.from(await cover_file.arrayBuffer());
                    const imagePath = saveImage(buffer, user.id.toString(), fileExtension);
                    updateData.cover = imagePath;
                } catch (error) {
                    await prisma.user.delete({ where: { id: user.id } });
                    console.error('Error saving the image:', error);
                    return res.json({ errors: ['Error saving cover image, please try again!'] }, { status: 500 });
                }
            };

            const image_file = formData.get('image');
            if (image_file instanceof Blob) {
                const maxSizeInBytes = 5 * 1024 * 1024;
                if (image_file.size > maxSizeInBytes) {
                    await prisma.user.delete({ where: { id: user.id } });
                    return res.json(
                        { errors: ['Cover size exceeds the maximum allowed size (5 MB)'] },
                        { status: 400 }
                    );
                }
                try {
                    const fileExtension = image_file.type.split('/').pop() || "invalid";
                    const buffer = Buffer.from(await image_file.arrayBuffer());
                    const imagePath = saveImage(buffer, user.id.toString(), fileExtension);
                    updateData.image = imagePath;
                } catch (error) {
                    await prisma.user.delete({ where: { id: user.id } });
                    console.error('Error saving the image:', error);
                    return res.json({ errors: ['Error saving cover image, please try again!'] }, { status: 500 });
                }
            };

            const updatedUser = await prisma.user.update({
                where: { id: user.id as string },
                data: updateData,
            });

            return res.json({ user: updatedUser, updated: true }, { status: 200 });
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.json({ errors: [error.message] }, { status: 400 });
            } else {
                return res.json({ errors: ['Internal server error'] }, { status: 500 });
            }
        }
    } else {
        return res.json({ message: 'Method Not allowed' }, { status: 405 });
    }
}
