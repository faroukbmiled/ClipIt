import axios from 'axios';
import { toast } from "react-toastify";

const BASE_API_URL = '/api/videos/';

export async function likeVideo(videoId: string) {
    try {
        const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');

        // if (likedVideos.includes(videoId)) {
        //     console.log(`Video with ID ${videoId} has already been liked.`);
        //     return true;
        // }

        const response = await axios.post(`${BASE_API_URL}/likeVideo`, {
            videoId,
        });

        if (response.status === 200) {
            if (!likedVideos.includes(videoId)) {
                localStorage.setItem('likedVideos', JSON.stringify([...likedVideos, videoId]));
            }
            return response.data.likesCount;
        } else {
            toast.error('Only logged in users can like videos');
            return false;
        }
    } catch (error) {
        toast.error('Only logged in users can like videos');
        return false;
    }
}


export function isVideoLiked(videoId: string): boolean {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    return likedVideos.includes(videoId);
}

export function removeLikedVideo(videoId: string): boolean {
    try {
        let likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
        const index = likedVideos.indexOf(videoId);
        if (index !== -1) {
            likedVideos.splice(index, 1);
            localStorage.setItem('likedVideos', JSON.stringify(likedVideos));

            return true;
        } else {
            console.log(`Video with ID ${videoId} not found in liked videos.`);
            return false;
        }
    } catch (error) {
        console.error('Error removing liked video:', error);
        return false;
    }
}
