import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { followingId } = req.body;
        const user = await withAuth(req, res, true);
        const followerId = user.id;

        if (!followerId || !followingId) {
            return res.status(400).json({ message: 'Missing followerId or followingId in the request body' });
        }

        await followUser(req, res, followerId, followingId);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

async function followUser(req: NextApiRequest, res: NextApiResponse, followerId: string, followingId: string) {
    try {
        const existingFollow = await prisma.follower.findUnique({
            where: {
                followerId_followingId: {
                    followerId: followingId,
                    followingId: followerId,
                },
            },
        });

        if (existingFollow) {
            return res.status(400).json({ message: 'User is already followed' });
        }

        await prisma.follower.create({
            data: {
                followerId: followingId,
                followingId: followerId,
            },
        });

        return res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
