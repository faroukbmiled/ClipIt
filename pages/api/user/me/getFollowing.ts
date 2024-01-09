import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getFollowing(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getFollowing(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        if (user?.id) {
            const userWithFollowing = await prisma.user.findUnique({
                where: { id: user.id },
                include: {
                    following: {
                        include: {
                            follower: { select: { id: true, image: true, name: true } },
                        },
                    },
                },
            });
            const following = userWithFollowing?.following.map((followed) => ({
                userId: followed.follower.id,
                name: followed.follower.name,
                avatar: followed.follower.image,
            }));

            const followingCount = following?.length;

            return res.status(200).json({ following, followingCount });
        }

        return res.status(200).json({});

    } catch (error) {
        console.error('Error fetching following:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
