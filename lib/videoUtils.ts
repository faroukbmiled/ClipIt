import fs from 'fs';
import { spawn } from 'child_process';
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

export function deleteVideo(userId: string, videoId: string, extension: string): void {
    const videoPath = path.join(process.cwd(), 'public', 'userdata', userId, 'videos', videoId, `video.${extension}`);
    if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
    }
}

export function deleteThumbnail(userId: string, videoId: string, extension: string): void {
    const thumbnailPath = path.join(process.cwd(), 'public', 'userdata', userId, 'videos', videoId, `thumbnail.${extension}`);
    if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
    }
}

export function deleteVideoAndThumbnail(userId: string, videoId: string, videoExtension: string, thumbnailExtension: string = ""): void {
    const folderPath = path.join(process.cwd(), 'public', 'userdata', userId, 'videos', videoId);
    deleteVideo(userId, videoId, videoExtension);
    deleteThumbnail(userId, videoId, thumbnailExtension);
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }
}

export function optimizeVideo(userId: string, videoId: string, videoExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = path.join(process.cwd(), 'optimize_video.py');
        const args = [userId, videoId, videoExtension];

        const pythonProcess = spawn('python', [pythonScriptPath, ...args]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python Script Output: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python Script Error: ${data}`);
            reject(data);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Python Script executed successfully');
                resolve();
            } else {
                reject(`Python Script exited with code ${code}`);
            }
        });
    });
}
