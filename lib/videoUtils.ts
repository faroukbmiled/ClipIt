import fs from 'fs';
import path from 'path';

export function saveVideo(videoBuffer: Buffer, userId: string, videoId: string, extension: string): string | null {
    try {
        const validExtensions = ['mp4', 'webm'];

        if (!validExtensions.includes(extension.toLowerCase())) {
            console.error('Invalid video extension');
            return null;
        }

        const uploadDir = path.join(process.cwd(), 'public', 'userdata', userId, 'videos', videoId);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const videoPath = path.join(uploadDir, `video.${extension}`);

        fs.writeFileSync(videoPath, videoBuffer);

        return `/userdata/${userId}/videos/${videoId}/video.${extension}`;
    } catch (error) {
        console.error('Error saving video:', error);
        return null;
    }
}

export function saveThumbnail(thumbnailBuffer: Buffer, userId: string, videoId: string, extension: string): string | null {
    try {
        const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];

        if (!validExtensions.includes(extension.toLowerCase())) {
            console.error('Invalid thumbnail extension');
            return null;
        }

        const uploadDir = path.join(process.cwd(), 'public', 'userdata', userId, 'videos', videoId);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const thumbnailPath = path.join(uploadDir, `thumbnail.${extension}`);

        fs.writeFileSync(thumbnailPath, thumbnailBuffer);

        return `/userdata/${userId}/videos/${videoId}/thumbnail.${extension}`;
    } catch (error) {
        console.error('Error saving thumbnail:', error);
        return null;
    }
}
