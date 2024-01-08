import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/authPrisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const takeParam = req.query.take as string;
        const take = takeParam ? parseInt(takeParam, 10) : 10;

        const latestUsers = await prisma.user.findMany({
            take,
            select: {
                id: true,
                name: true,
                image: true,
                followers: {
                    select: {
                        follower: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedUsers = latestUsers.map((user) => ({
            id: user.id,
            username: user.name,
            avatar: user.image,
            followersCount: user.followers.length,
        }));

        return res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Error fetching latest users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
