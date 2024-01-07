import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/authPrisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { videoId } = req.body;
        console.log(videoId);

        try {
            const video = await prisma.video.findUnique({
                where: {
                    id: videoId,
                },
            });

            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            const updatedVideo = await prisma.video.update({
                where: {
                    id: videoId,
                },
                data: {
                    views: { increment: 1 },
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
}
