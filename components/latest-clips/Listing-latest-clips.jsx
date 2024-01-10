import React, { useState, useEffect } from "react";
import { incrementView } from "@lib/incrementVideoView";
import playVideo from "@assets/icons/play-video.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import shadowCard from "@assets/imgs/shadow.png";
import LazyImage from "../image";
import VideoPlayer from "../video-player";

function ListingLatestClips({ videosData }) {
  const [openModals, setOpenModals] = useState(Array(videosData?.length).fill(false));

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

  const videos = videosData || [];

  return (
    <div className="fl_col gp40" id="ListingLatestClips">
      <div className="wrapper gp20">
        {videos.map((video, index) => {
          const creationDate = new Date(video.creation_date);
          const formattedDate = creationDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div className="card-video rd25" key={index}>
              <div className="wrapper-card fl_col txt_white h-100 jc_s">
                {/* ... (your existing code) ... */}
                <div className="card-video-src">
                  <div className="playVideo">
                    <img
                      onClick={() => handleOpen(index)}
                      src={playVideo.src}
                      alt=""
                    />
                  </div>
                  <LazyImage src={video.video_thumbnail} className="lazy_img video_thumbnail" />
                  <Modal
                    tabIndex={-1}
                    className="popupDisplayVideo rd25"
                    open={openModals[index]}
                    onClose={() => handleClose(index)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}>
                      <VideoPlayer
                        title={video.video_title}
                        date={formattedDate}
                        views={video.views}
                        likes={video.likes}
                        src={video.video_url}
                      />
                    </Box>
                  </Modal>
                </div>
                <div className="card-footer pd20-r-l">
                  <p className="p22 w-700 mx1">{video.video_title}</p>
                </div>
              </div>
              <img className="shadow-card" src={shadowCard.src} alt="" />
            </div>
          );
        })}
      </div>
      <Link href="listing-clips" className="show_more btn btn-grey p14 uper w-600">
        Show More
      </Link>
    </div>
  );
}

export default ListingLatestClips;
