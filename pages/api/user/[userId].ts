import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@lib/authMiddleware';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getUserData(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getUserData(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userId = req.query.userId as string;

        const user = await withAuth(req, res, true, false, true);

        const requser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                followers: true,
                following: true,
                videos: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!requser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isFollowed = user && requser.followers.some(followedUser => followedUser.followingId === user.id);

        const formattedData = {
            userId: requser.id,
            avatar: requser.image,
            cover: requser.cover,
            followers: requser.followers.length,
            username: requser.name,
            isFollowed: isFollowed || false,
            bio: requser.bio,
            videos: requser.videos.map((video) => ({
                username: video.user.name,
                user_avatar: video.user.image,
                game_category: video.category,
                hashtag: [video.hashtag],
                views: video.views,
                likes: video.likesConunt,
                creation_date: video.createdAt,
                video_title: video.title,
                video_thumbnail: video.thumbnail,
                video_url: video.videoLink,
            })),
        };

        res.status(200).json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
