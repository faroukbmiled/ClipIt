import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getLatestClips(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getLatestClips(req: NextApiRequest, res: NextApiResponse) {
    try {
        const videos = await prisma.video.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        const gameCategories = Array.from(new Set(videos.map((video) => video.category)));

        const formattedData = {
            videos: videos.map((video) => ({
                userId: video.user.id,
                username: video.user.name,
                user_avatar: video.user.image,
                game_category: video.category,
                hashtag: [video.hashtag],
                views: video.views,
                likes: video.likesCount,
                creation_date: video.createdAt,
                video_title: video.title,
                video_thumbnail: video.thumbnail,
                video_url: video.videoLink,
                videoId: video.id,
            })),
            game_categories: gameCategories,
        };

        res.status(200).json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
