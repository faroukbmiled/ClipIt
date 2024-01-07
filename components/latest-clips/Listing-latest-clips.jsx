import React, { useState, useEffect } from "react";
// import videoData from "../../data/data.json"; //tesing
import { incrementView } from "@lib/incrementVideoView";
import playVideo from "../../src/assets/Icons/play-video.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";

function ListingLatestClips({ videosData }) {
  const [openModals, setOpenModals] = useState(
    Array(videosData?.length).fill(false)
  );
  const handleOpen = async (index) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);

    try {
      const updatedVideo = await incrementView(videos[index].id);

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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
  };

  return (
    <div className="fl_col gp40" id="ListingLatestClips">
      <div className="wrapper gp20">
        {videos.map((video, index) => (
          <div className="card-video rd25" key={index}>
            <div className="wrapper-card fl_col txt_white h-100 jc_s">
              <div className="card-header pd20">
                <div className="card-header-wrapper fl_row jc_s">
                  <div className="user-info fl_row gp5">
                    <img className="rd50" src={video.user_avatar} alt="" />
                    <div className="fl_col">
                      <p className="p18 w-800">{video.username}</p>
                      <p className="p14 w-300">#{video.hashtag}</p>
                    </div>
                  </div>
                  <div className="game_category pd5-t-b pd20-r-l rd30">
                    <p className="p16 w-500 uper ">{video.game_category}</p>
                  </div>
                </div>
              </div>
              <div className="card-video-src">
                <div className="playVideo">
                  <img
                    onClick={() => handleOpen(index)}
                    src={playVideo.src}
                    alt=""
                  />
                </div>
                <img
                  className="video_thumbnail"
                  src={video.video_thumbnail}
                  alt=""
                />
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
              <div className="card-footer pd20">
                <p className="p30 w-700 mx2">{video.video_title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="listing-clips"
        className="show_more btn btn-grey p14 uper w-600"
      >
        Show More
      </Link>
    </div>
  );
}

export default ListingLatestClips;
