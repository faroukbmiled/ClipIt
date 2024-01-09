import sys
from moviepy.editor import VideoFileClip

def optimize_video(user_id, video_id, video_extension):
    input_path = f"public/userdata/{user_id}/videos/{video_id}/video.{video_extension}"
    output_path = f"public/userdata/{user_id}/videos/{video_id}/optimized_video.{video_extension}"

    try:
        video_clip = VideoFileClip(input_path)
        optimized_clip = video_clip.resize(width=640)
        optimized_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")

        print(f"Video optimized and saved to {output_path}")
    except Exception as e:
        print(f"Error optimizing video: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python optimize_video.py <user_id> <video_id> <video_extension>")
        sys.exit(1)

    user_id, video_id, video_extension = sys.argv[1:]
    optimize_video(user_id, video_id, video_extension)
