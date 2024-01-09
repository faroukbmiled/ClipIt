import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import playVideo from "@assets/Icons/play-video.svg";

function ListingVideosProfile({ userId, userData, removeVideo, isMe = false }) {
  const [openModals, setOpenModals] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [videoDurations, setVideoDurations] = useState({});

  const toggleListView = () => {
    setIsListView((prevIsListView) => !prevIsListView);
  };

  const HandleRemoveVideo = async (videoId) => {
    await removeVideo(videoId);
  };

  const handleMetadataLoaded = (videoIndex, duration) => {
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [videoIndex]: duration,
    }));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!userId && !userData) {
    return <div>User not found</div>;
  }

  if (!userId) {
    return <div>User not found</div>;
  }

  return (
    <div id="ListingClips">
      <div className="ListingClips-wrapper fl_col gp40">
        <div className="clips-format-display fl_row jc_fe">
          <svg
            onClick={toggleListView}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#fff"
              d="M12 0v4h4V0h-4zm3 3h-2V1h2v2zm-3 3v4h4V6h-4zm3 3h-2V7h2v2zM6 0v4h4V0H6zm3 3H7V1h2v2zM6 6v4h4V6H6zm3 3H7V7h2v2zm3 3v4h4v-4h-4zm3 3h-2v-2h2v2zm-9-3v4h4v-4H6zm3 3H7v-2h2v2zM0 0v4h4V0H0zm3 3H1V1h2v2zM0 6v4h4V6H0zm3 3H1V7h2v2zm-3 3v4h4v-4H0zm3 3H1v-2h2v2z"
            ></path>
          </svg>
        </div>
        <div className={`clips-listing ${isListView ? "List" : ""}`}>
          {userData.videos?.map((video, index) => (
            <div className="video-card fl_col gp10" key={index}>
              <div className="video-clip">
                <div className="video-display">
                  <img src={playVideo.src} alt="" className="play-video" />
                  <img
                    className="video-thumbnail rd10"
                    src={video.video_thumbnail}
                    alt=""
                  />
                </div>
                <video
                  className="hide"
                  src={video.video_url}
                  controls
                  onLoadedMetadata={(e) =>
                    handleMetadataLoaded(index, e.target.duration)
                  }
                ></video>
                <p className="p10 video-time">
                  {videoDurations[index]
                    ? formatVideoTime(videoDurations[index])
                    : "00:00"}
                </p>
              </div>
              <div className="video-info fl_row gp12">
                <div className="user-avatar">
                  <img
                    className="rd50"
                    src={video.user_avatar}
                    alt={video.username}
                  />
                </div>
                <div className="info-box fl_col gp5">
                  <div>
                    <p className="p12 video-title mx1 txt_white">
                      {video.video_title}
                    </p>
                  </div>
                  <div className="fl_col gp5 p12 txt_grey video-footer">
                    <p className="username">{video.username}</p>
                    <div className="fl_row gp2">
                      <p className="video-views">{video.views} Views</p>
                      <p>.</p>
                      <p className="post-video-date">
                        {formatTimeAgo(video.creation_date)}
                      </p>
                    </div>
                    {isMe && (
                      <button
                        className="remove-video-btn"
                        onClick={() => HandleRemoveVideo(video.videoId)}
                      >
                        Remove Video
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to format video time (convert seconds to minutes:seconds)
function formatVideoTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Helper function to format time ago (replace with your implementation)
function formatTimeAgo(creationDate) {
  // Implement your logic to calculate time ago
  return "1 day ago";
}

export default ListingVideosProfile;
