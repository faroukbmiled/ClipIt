// /lib/api.ts
import axios from 'axios';

const BASE_API_URL = '/api/videos/';

export async function incrementView(videoId: string) {
    try {
        const viewedVideos = JSON.parse(localStorage.getItem('viewedVideos') || '[]');

        if (viewedVideos.includes(videoId)) {
            console.log(`Video with ID ${videoId} has already been viewed.`);
            return;
        }

        const response = await axios.post(`${BASE_API_URL}/incrementView`, {
            videoId,
        });

        if (response.status === 200) {
            localStorage.setItem('viewedVideos', JSON.stringify([...viewedVideos, videoId]));

            return response.data;
        } else {
            throw new Error('Failed to increment views count');
        }
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
}
