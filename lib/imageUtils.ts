import fs from 'fs';
import path from 'path';

export function saveImage(base64Data: string, userId: string): string | null {
    try {
        const uploadDir = path.join(process.cwd(), 'public', 'userdata', userId);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const imageBuffer = Buffer.from(base64Data, 'base64');
        const imagePath = path.join(uploadDir, `profile_${Date.now()}.jpg`);

        fs.writeFileSync(imagePath, imageBuffer);

        return `/userdata/${userId}/${path.basename(imagePath)}`;
    } catch (error) {
        console.error('Error saving image:', error);
        return null;
    }
}
