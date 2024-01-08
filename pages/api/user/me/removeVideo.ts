import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await removeVideo(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function removeVideo(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        const { videoId } = req.body;

        const video = await prisma.video.findUnique({
            where: {
                id: videoId,
            },
            include: {
                user: true,
            },
        });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        if (video.userId !== user.id) {
            return res.status(403).json({ message: 'Permission denied. You are not the owner of this video.' });
        }

        await prisma.videoLike.deleteMany({
            where: {
                videoId,
            },
        });

        await prisma.video.delete({
            where: {
                id: videoId,
            },
        });

        return res.status(200).json({ message: 'Video removed successfully' });
    } catch (error) {
        console.error('Error removing video:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
