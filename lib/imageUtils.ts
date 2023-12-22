import fs from 'fs';
import path from 'path';

export function saveImage(imageBuffer: Buffer, userId: string, fileExtension: string): string | null {
    try {
        const validExtensions = ['jpg', 'png', 'gif', 'jpeg'];

        if (!validExtensions.includes(fileExtension.toLowerCase())) {
            throw new Error('Invalid file extension');
        }

        const uploadDir = path.join(process.cwd(), 'public', 'userdata', userId);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const imagePath = path.join(uploadDir, `profile_${Date.now()}.${fileExtension}`);

        fs.writeFileSync(imagePath, imageBuffer);

        return `/userdata/${userId}/${path.basename(imagePath)}`;
    } catch (error) {
        console.error('Error saving image:', error);
        return null;
    }
}
