import axios from 'axios';

const BASE_API_URL = '/api/videos/';

export async function likeVideo(videoId: string) {
    try {
        const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');

        if (likedVideos.includes(videoId)) {
            console.log(`Video with ID ${videoId} has already been liked.`);
            return true;
        }

        const response = await axios.post(`${BASE_API_URL}/likeVideo`, {
            videoId,
        });

        if (response.status === 200) {
            localStorage.setItem('likedVideos', JSON.stringify([...likedVideos, videoId]));
            console.log(response.data);
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export function isVideoLiked(videoId: string): boolean {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    return likedVideos.includes(videoId);
}
