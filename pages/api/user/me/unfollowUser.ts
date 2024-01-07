import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { unfollowingId } = req.body;
        const user = await withAuth(req, res, true);
        const followerId = user.id;

        if (!followerId || !unfollowingId) {
            return res.status(400).json({ message: 'Missing followerId or unfollowingId in the request body' });
        }

        await unfollowUser(req, res, followerId, unfollowingId);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function unfollowUser(req: NextApiRequest, res: NextApiResponse, followerId: string, unfollowingId: string) {
    try {
        const existingFollow = await prisma.follower.findUnique({
            where: {
                followerId_followingId: {
                    followerId: unfollowingId,
                    followingId: followerId,
                },
            },
        });

        if (!existingFollow) {
            return res.status(400).json({ message: 'User is not currently followed' });
        }

        await prisma.follower.delete({
            where: {
                followerId_followingId: {
                    followerId: unfollowingId,
                    followingId: followerId,
                },
            },
        });

        return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
