import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getLikedVideos(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getLikedVideos(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await withAuth(req, res, true);

        if (!user) {
            return res.status(400).json({ error: 'Unauthorized' });
        }

        const likedVideos = await prisma.videoLike.findMany({
            where: {
                userId: user.id,
            },
            include: {
                video: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedLikedVideos = likedVideos.map((like) => ({
            userId: like.video.user.id,
            username: like.video.user.name,
            user_avatar: like.video.user.image,
            game_category: like.video.category,
            hashtag: [like.video.hashtag],
            views: like.video.views,
            likes: like.video.likesCount,
            creation_date: like.video.createdAt,
            video_title: like.video.title,
            video_thumbnail: like.video.thumbnail,
            video_url: like.video.videoLink,
            videoId: like.video.id,
        }));

        res.status(200).json({ likedVideos: formattedLikedVideos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
