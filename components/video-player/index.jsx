import React, { use, useEffect, useState } from "react";
import { likeVideo, isVideoLiked, removeLikedVideo } from "@lib/likeVideo";
import LikeIcon from "@assets/icons/LikeIcon.svg";
import ShareIcon from "@assets/icons/shareIcon.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VideoPlayer({
  src,
  title,
  date,
  views,
  likes,
  videoId,
  onLikeUpdate,
}) {
  const [videoLiked, setVideoLiked] = useState(isVideoLiked(videoId));
  const [vlikes, setLikes] = useState();
  const likeVideoReq = async () => {
    const res = await likeVideo(videoId);
    if (res || res === 0) {
      onLikeUpdate(videoId, res);
      setLikes(res);
      if (videoLiked) {
        setVideoLiked(false);
        removeLikedVideo(videoId);
      } else {
        setVideoLiked(true);
      }
    } else {
      removeLikedVideo(videoId);
      setVideoLiked(false);
    }
  };

  useEffect(() => {
    if (likes) {
      setLikes(likes);
    }
  }, [likes]);

  return (
    <div className="display_video_popup">
      <div className="video-wrapper">
        <div className="video_src">
          <video controls autoPlay src={src}></video>
        </div>
        <div className="box_video pd20-r-l pd10-t-b fl_row ai_c jc_s">
          <div className="video_info fl_col gp10">
            <p className="p18 txt_white">{title}</p>
            <div className="fl_row gp5">
              <p className="p14 txt_white views-video">{views} views</p>.
              <p className="p14 txt_white date-video">{date}</p>
            </div>
          </div>
          <div className="video_tools fl_row gp20">
            <div className="fl_row gp5 ai_c liked" onClick={likeVideoReq}>
              <img src={LikeIcon.src} alt="" />
              <p className={`p14 txt_white ${videoLiked ? "likes-video" : ""}`}>
                {vlikes || 0}
              </p>
            </div>
            <div className="fl_row gp5 ai_c">
              <img src={ShareIcon.src} alt="" />
              <p className="p14 txt_white">share</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
