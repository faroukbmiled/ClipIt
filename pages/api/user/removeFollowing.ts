import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await removeFollowing(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function removeFollowing(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        const { followingId } = req.body;

        await prisma.follower.delete({
            where: {
                followerId_followingId: {
                    followerId: followingId,
                    followingId: user.id,
                },
            },
        });

        return res.status(200).json({ message: 'Following removed successfully' });
    } catch (error) {
        console.error('Error removing following:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
