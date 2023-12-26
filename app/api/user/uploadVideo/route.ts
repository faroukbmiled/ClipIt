import { saveVideo, saveThumbnail } from '@lib/videoUtils';
import prisma from '@lib/authPrisma';
import { NextResponse as res } from 'next/server';
import { withAuth } from '@lib/authMiddleware';

export const bodyParser = false;

export async function POST(req: Request, response: Response) {

    try {
        const user = await withAuth(req, res, true, true);
        const form = await req.formData();
        const { title, description, category, hashtag } = {
            title: form.get('title')?.toString() ?? '',
            description: form.get('description')?.toString() ?? '',
            category: form.get('category')?.toString() ?? '',
            hashtag: form.get('hashtag')?.toString() ?? '',
        };

        const requiredFields = ['title', 'description', 'category', 'hashtag'];
        const missingFields = requiredFields.filter(field => !form.get(field)?.toString());

        if (missingFields.length > 0) {
            return res.json({ errors: [`Missing fields: ${missingFields.join(', ')}`] }, { status: 400 });
        }

        const savedVideo = await prisma.video.create({
            data: {
                title,
                description,
                category,
                hashtag,
                userId: user.id,
                videoLink: '',
            },
            select: {
                id: true,
            },
        });

        const videoid = savedVideo.id.toString();

        const videoFile = form.get('video');

        if (!(videoFile instanceof Blob)) {
            await prisma.video.delete({ where: { id: savedVideo.id } });
            return res.json({ success: false, error: 'Invalid video file' }, { status: 400 });
        }

        const videoBuffer: Buffer = Buffer.from(await videoFile.arrayBuffer());
        const videoFileExtension: string = videoFile.name.split('.').pop() || '';

        const videoPath: string | null = saveVideo(videoBuffer, user.id, videoid, videoFileExtension);
        const thumbnailFile = form.get('thumbnail');

        if (!(thumbnailFile instanceof Blob)) {
            await prisma.video.delete({ where: { id: savedVideo.id } });
            return res.json({ success: false, error: 'Invalid thumbnail file' }, { status: 400 });
        }

        const thumbnailBuffer: Buffer = Buffer.from(await thumbnailFile.arrayBuffer());
        const thumbnailExtension = thumbnailFile.type.split('/').pop() || "invalid";
        const thumbnailPath: string | null = saveThumbnail(thumbnailBuffer, user.id, videoid, thumbnailExtension);

        if (!videoPath || !thumbnailPath) {
            await prisma.video.delete({ where: { id: savedVideo.id } });
            return res.json({ success: false, error: 'Error saving video or thumbnail' }, { status: 400 });
        }

        const updatedVideo = await prisma.video.update({
            where: { id: savedVideo.id },
            data: {
                videoLink: videoPath,
                thumbnail: thumbnailPath,
            },
            select: {
                title: true,
                description: true,
                category: true,
                hashtag: true,
                videoLink: true,
                thumbnail: true,
                createdAt: true,
            }
        });

        return res.json({ success: true, video: updatedVideo }, { status: 200 });
    } catch (error) {
        console.error('Error uploading video:', error);
        return res.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
