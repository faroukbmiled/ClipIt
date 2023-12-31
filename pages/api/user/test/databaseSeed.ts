import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/authPrisma";
import { Prisma } from "@prismaAuthClient";
import { hashPassword } from "@lib/passwordUtils";
import { csrf } from "@lib/CustomCSRF";
import faker from "faker";

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await createTestUsersHandler(req, res);
    } else {
        return res.status(405).json({ message: "Method Not allowed" });
    }
}

async function createTestUsersHandler(req: NextApiRequest, res: NextApiResponse) {
    let errors: string[] = [];
    let userCredentials: {
        email: string;
        password: string;
        followingCount: number;
    }[] = [];

    try {
        const role = "user";
        const numberOfUsers = 20;
        const categories = ["FPS", "RPG", "Other"];

        for (let i = 0; i < numberOfUsers; i++) {
            const existingUsers = await prisma.user.findMany();

            const name = faker.name.findName().slice(0, 6);
            const email = faker.internet.email();
            const password = faker.internet.password();

            const existingUser = existingUsers.find((user) => user.email === email);

            if (existingUser) {
                errors.push(`Email ${email} is already in use`);
            } else {
                const hashedPassword = await hashPassword(password);
                const user = await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        role: role,
                        country: "Tunisia",
                        image: "/userdata/default/default-avatar.jpg",
                        cover: "/userdata/default/default-cover.png"
                    },
                });

                const video = await prisma.video.create({
                    data: {
                        title: `Test Video ${i + 1}`,
                        description: "This is a test video",
                        category: categories[Math.floor(Math.random() * categories.length)],
                        hashtag: "hashTest",
                        userId: user.id,
                        videoLink: "/userdata/default/video/video.mp4",
                        thumbnail: "/userdata/default/video/thumbnail.png",
                    },
                });

                await prisma.video.update({
                    where: { id: video.id },
                    data: { views: { increment: 1 } },
                });

                for (const existingUser of existingUsers) {
                    if (existingUser.id !== user.id) {
                        await prisma.follower.create({
                            data: {
                                followerId: user.id,
                                followingId: existingUser.id,
                            },
                        });

                        await prisma.user.update({
                            where: { id: user.id },
                            data: { followingCount: { increment: 1 } },
                        });

                        await prisma.user.update({
                            where: { id: existingUser.id },
                            data: { followersCount: { increment: 1 } },
                        });
                    }
                }

                const followersCount = await prisma.follower.count({
                    where: { followingId: user.id },
                });

                const followingCount = await prisma.follower.count({
                    where: { followerId: user.id },
                });

                userCredentials.push({
                    email: email,
                    password: password,
                    followingCount: followingCount,
                });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return res.status(201).json({ message: "Test users created successfully", userCredentials });
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ message: e.message });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default csrf(handle);
