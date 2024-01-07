import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/authPrisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getMostFollowedUsers(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not allowed' });
    }
}

async function getMostFollowedUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const usersWithFollowers = await prisma.user.findMany({
            include: {
                followers: true,
                videos: true,
            },
        });

        const sortedUsers = usersWithFollowers.sort(
            (a, b) => b.followers.length - a.followers.length
        );

        const topUsers = sortedUsers.slice(0, 8);

        const mostFollowedUsers = await Promise.all(
            topUsers.map(async (user) => {
                const totalVideosCount = user.videos.length;

                const totalVideosViews = user.videos.reduce(
                    (totalViews, video) => totalViews + video.views,
                    0
                );

                return {
                    userId: user.id,
                    name: user.name,
                    avatar: user.image,
                    followersCount: user.followers.length,
                    totalVideosCount,
                    totalVideosViews,
                };
            })
        );

        return res.status(200).json({ mostFollowedUsers });
    } catch (error) {
        console.error('Error fetching most followed users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
