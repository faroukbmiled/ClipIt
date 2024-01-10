import React from 'react';
import LikeIcon from "@assets/icons/LikeIcon.svg";
import ShareIcon from "@assets/icons/shareIcon.svg";
export default function VideoPlayer({ src, title, date, views, likes }) {
    return (
        <div className="display_video_popup">
            <div className="video-wrapper">
                <div className="video_src">
                    <video
                        controls
                        autoPlay
                        src={src}
                    ></video>
                </div>
                <div className="box_video pd20-r-l pd10-t-b fl_row ai_c jc_s">
                    <div className="video_info fl_col gp10">
                        <p className="p18 txt_white">{title}</p>
                        <div className='fl_row'>
                            <p className="p14 txt_white views-video">{views} views</p>
                            .
                            <p className="p14 txt_white date-video">{date}</p>
                        </div>
                    </div>
                    <div className="video_tools fl_row gp20">
                        {/* liked class for liked video */}
                        <div className="fl_row gp5 ai_c liked">
                            <img src={LikeIcon.src} alt="" />
                            <p className="p14 txt_white likes-video">{likes}</p>
                        </div>
                        <div className="fl_row gp5 ai_c">
                            <img src={ShareIcon.src} alt="" />
                            <p className="p14 txt_white">share</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
