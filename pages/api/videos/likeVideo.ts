import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/authPrisma';
import { withAuth } from '@lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { videoId } = req.body;

        try {
            const user = await withAuth(req, res, true, false, true);

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const existingLike = await prisma.videoLike.findFirst({
                where: {
                    userId: user.id,
                    videoId: videoId,
                },
            });

            if (existingLike) {
                const video = await prisma.video.update({
                    where: {
                        id: videoId,
                    },
                    data: {
                        likesCount: { decrement: 1 },
                        likes: { deleteMany: { userId: user.id } },
                    },
                });

                if (!video) {
                    return res.status(404).json({ error: 'Video not found' });
                }

                return res.status(200).json(video);
            }

            const updatedVideo = await prisma.video.update({
                where: {
                    id: videoId,
                },
                data: {
                    likesCount: { increment: 1 },
                    likes: { create: { userId: user.id } },
                },
            });

            return res.status(200).json(updatedVideo);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};
