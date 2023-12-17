import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/authPrisma";
import { Prisma } from "@prismaClient";
import { hashPassword } from "@lib/passwordUtils";
import { csrf } from "@lib/CustomCSRF";
import faker from "faker";

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await createUserHandler(req, res);
    } else {
        return res.status(405).json({ message: "Method Not allowed" });
    }
}

async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
    let errors: string[] = [];

    try {

        const role = "user";

        const name = faker.name.findName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            errors.push("Email is already in use");
            return res.status(400).json({ errors });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        return res.status(201).json({ user, password: password, created: true });
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(400).json({ message: e.message });
            }
            return res.status(400).json({ message: e.message });
        }
    }
}

export default csrf(handle);
