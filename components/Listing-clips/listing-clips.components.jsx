import React, { useState, useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import ListingFormatIcon from "@assets/icons/Grid-format-videoIcon.svg";
import { incrementView } from "@lib/incrementVideoView";
// import jsonData from "../data/data.json"; // testing
import playvideoIcon from "@assets/icons/play-video.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LazyImage from "../image";
function ListingClipsComponents({ videosData, setVideosData }) {
  //   const { DataForTesting } = jsonData; // testing
  const [videoDurations, setVideoDurations] = useState({});
  const [isListView, setIsListView] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState(16);

  const [openModals, setOpenModals] = useState(
    Array(videosData?.length).fill(false)
  );
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
  const formatTimeAgo = (creationDate) => {
    const now = new Date();
    const differenceInDaysValue = differenceInDays(now, new Date(creationDate));

    if (differenceInDaysValue > 7) {
      return `${Math.floor(differenceInDaysValue / 7)} week${
        Math.floor(differenceInDaysValue / 7) === 1 ? "" : "s"
      } ago`;
    } else if (differenceInDaysValue > 0) {
      return `${differenceInDaysValue} day${
        differenceInDaysValue === 1 ? "" : "s"
      } ago`;
    }

    const differenceInHoursValue = differenceInHours(
      now,
      new Date(creationDate)
    );

    if (differenceInHoursValue > 0) {
      return `${differenceInHoursValue} hour${
        differenceInHoursValue === 1 ? "" : "s"
      } ago`;
    }

    const differenceInMinutesValue = differenceInMinutes(
      now,
      new Date(creationDate)
    );
    return `${differenceInMinutesValue} minute${
      differenceInMinutesValue === 1 ? "" : "s"
    } ago`;
  };

  const handleMetadataLoaded = (videoIndex, duration) => {
    setVideoDurations((prevDurations) => ({
      ...prevDurations,
      [videoIndex]: duration,
    }));
  };

  const toggleListView = () => {
    setIsListView((prevIsListView) => !prevIsListView);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
  };

  return (
    <div id="ListingClips">
      <div className="ListingClips-wrapper fl_col gp22 pd40-r-l">
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
          {videosData?.map((video, index) => (
            <div className="video-card fl_col gp10">
              <div className="video-clip">
                <div className="video-display">
                  <img
                    onClick={() => handleOpen(index)}
                    src={playvideoIcon.src}
                    alt=""
                    className="play-video"
                  />
                  {/* <img
                    className="video-thumbnail rd10"
                    src={video.video_thumbnail}
                    alt=""
                  /> */}
                  <LazyImage src={video.video_thumbnail} className="lazy_img video_thumbnail rd10"/>
                  <Modal
                    className="popupDisplayVideo rd25"
                    open={openModals[index]}
                    onClose={() => handleClose(index)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <video
                        controls
                        autoPlay
                        // muted
                        src={video.video_url}
                      ></video>
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
                    style={{ cursor: "pointer" }}
                    onClick={() => (location.href = "/user/" + video.userId)}
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
                    <p
                      className="username"
                      style={{ cursor: "pointer" }}
                      onClick={() => (location.href = "/user/" + video.userId)}
                    >
                      {video.username}
                    </p>
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
          ))}
        </div>
      </div>
    </div>
  );
}

function formatVideoTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default ListingClipsComponents;
