import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await removeFollower(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function removeFollower(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        const { followerId } = req.body;

        await prisma.follower.delete({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: followerId,
                },
            },
        });

        return res.status(200).json({ message: 'Follower removed successfully' });
    } catch (error) {
        console.error('Error removing follower:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
