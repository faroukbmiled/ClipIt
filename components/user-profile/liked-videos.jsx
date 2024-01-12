import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import playVideo from "@assets/icons/play-video.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import VideoPlayer from "../../components/video-player";

function LiedVideosMyProfile() {
  const [LikedVideos, setLikedVideos] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [openModals, setOpenModals] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});

  useEffect(() => {
    axios
      .get("/api/user/me/getLikedVideos")
      .then((response) => {
        setLikedVideos(response.data.likedVideos);
      })
      .catch((error) => {
        console.error("Error fetching most followed users:", error);
      });
  }, []);
  const handleOpen = async (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);

    try {
      const updatedVideo = await incrementView(videosData[index].videoId);
      console.log("Views count incremented:", updatedVideo.views);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClose = (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };
  const handleLikeUpdate = (videoId, newLikesCount) => {
    const videoIndex = LikedVideos.findIndex(
      (video) => video.videoId === videoId
    );
    if (videoIndex !== -1) {
      const updatedVideos = [...LikedVideos];
      updatedVideos[videoIndex].likes = newLikesCount;
      const updatedUserData = { ...updatedVideos };
      console.log(updatedUserData);
      setLikedVideos(updatedUserData);
      return updatedUserData;
    }
    return userData;
  };

  const handleMetadataLoaded = (videoIndex, duration) => {
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [videoIndex]: duration,
    }));
  };

  const formatDate = (creation_date) => {
    const creationDate = new Date(creation_date);
    const formattedDate = creationDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div id="LikedVideos">
      <div className={`clips-listing ${isListView ? "Grid" : "Grid"}`}>
        {LikedVideos.length > 0 ? (
          LikedVideos.map((video, index) => (
            <div
              style={{ position: "relative" }}
              className="video-card fl_col gp10"
              key={index}
            >
              <div className="video-clip">
                <div className="video-display">
                  <img
                    src={playVideo.src}
                    alt=""
                    className="play-video"
                    onClick={() => handleOpen(index)}
                  />
                  <img
                    className="video_thumbnail rd10"
                    src={video.video_thumbnail}
                    alt=""
                  />
                  <Modal
                    tabIndex={-1}
                    className="popupDisplayVideo rd25"
                    open={openModals[index]}
                    onClose={() => handleClose(index)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <VideoPlayer
                        title={video.video_title}
                        date={formatDate(video.creation_date)}
                        views={video.views}
                        likes={video.likes}
                        src={video.video_url}
                        videoId={video.videoId}
                        onLikeUpdate={handleLikeUpdate}
                      />
                    </Box>
                  </Modal>
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
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="txt_white">No liked videos found.</div>
        )}
      </div>
    </div>
  );
}
function formatVideoTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function formatTimeAgo(creationDate) {
  return "1 day ago";
}

export default LiedVideosMyProfile;
