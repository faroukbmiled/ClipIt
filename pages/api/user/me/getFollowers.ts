import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getFollowers(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getFollowers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        if (user?.id) {

            const userWithFollowers = await prisma.user.findUnique({
                where: { id: user.id },
                include: {
                    followers: {
                        include: {
                            following: { select: { id: true, image: true, name: true } },
                        },
                    },
                },
            });

            const followers = userWithFollowers?.followers.map((follower) => ({
                userId: follower.following.id,
                name: follower.following.name,
                avatar: follower.following.image,
            }));

            const followersCount = followers?.length;

            return res.status(200).json({ followers, followersCount });
        }

        return res.status(200).json({});

    } catch (error) {
        console.error('Error fetching followers:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
