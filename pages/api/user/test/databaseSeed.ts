import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/authPrisma";
import { Prisma } from "@prismaAuthClient";
import { hashPassword } from "@lib/passwordUtils";
import { csrf } from "@lib/CustomCSRF";
import faker from "faker";
import fs from "fs";
import path from "path";

const usedFiles: Record<string, Set<string>> = {};

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await createTestUsersHandler(req, res);
    } else {
        return res.status(405).json({ message: "Method Not allowed" });
    }
}

async function getRandomFile(folderPath: string): Promise<string | null> {
    try {
        usedFiles[folderPath] = usedFiles[folderPath] || new Set();

        const files = await fs.promises.readdir(folderPath);
        const unusedFiles = files.filter((file) => !usedFiles[folderPath].has(file));

        if (unusedFiles.length === 0) {
            const randomIndex = Math.floor(Math.random() * files.length);
            return files[randomIndex];
        }

        const randomIndex = Math.floor(Math.random() * unusedFiles.length);
        const selectedFile = unusedFiles[randomIndex];

        usedFiles[folderPath].add(selectedFile);

        return selectedFile;
    } catch (error) {
        console.error(`Error reading files from ${folderPath}:`, error);
        return null;
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

        const avatarFolder = path.join(process.cwd(), "public", "userdata", "data", "avatar");
        const coverFolder = path.join(process.cwd(), "public", "userdata", "data", "cover");
        const thumbnailFolder = path.join(process.cwd(), "public", "userdata", "data", "thumbnails");
        const videoFolder = path.join(process.cwd(), "public", "userdata", "data", "videos");

        for (let i = 0; i < numberOfUsers; i++) {
            const existingUsers = await prisma.user.findMany();

            const name = faker.name.findName().slice(0, 6);
            const email = faker.internet.email();
            const password = faker.internet.password();

            const existingUser = existingUsers.find((user) => user.email === email);

            const avatarFileName = await getRandomFile(avatarFolder);
            const coverFileName = await getRandomFile(coverFolder);
            const thumbnailFileName = await getRandomFile(thumbnailFolder);
            const videoFileName = await getRandomFile(videoFolder);

            if (!avatarFileName || !coverFileName || !thumbnailFileName || !videoFileName) {
                errors.push(`Error getting random files for user ${i + 1}`);
                continue;
            }

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
                        image: `/userdata/data/avatar/${avatarFileName}`,
                        cover: `/userdata/data/cover/${hashedPassword}`
                    },
                });

                const video = await prisma.video.create({
                    data: {
                        title: `Test Video ${i + 1}`,
                        description: "This is a test video",
                        category: categories[Math.floor(Math.random() * categories.length)],
                        hashtag: "hashTest",
                        userId: user.id,
                        videoLink: `/userdata/data/videos/${videoFileName}`,
                        thumbnail: `/userdata/data/thumbnails/${thumbnailFileName}`,
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
