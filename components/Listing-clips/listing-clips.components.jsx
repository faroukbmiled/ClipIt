import React, { useState } from 'react';
import ListingFormatIcon from "../../src/assets/Icons/Grid-format-videoIcon.svg";
import jsonData from "../data/data.json";
import playvideoIcon from "../../src/assets/Icons/play-video.svg"
function ListingClipsComponents() {
    const { DataForTesting } = jsonData;
    const [videoDurations, setVideoDurations] = useState({});
    const [isListView, setIsListView] = useState(false);

    const handleMetadataLoaded = (videoIndex, duration) => {
        setVideoDurations((prevDurations) => ({
            ...prevDurations,
            [videoIndex]: duration,
        }));
    };

    const toggleListView = () => {
        setIsListView((prevIsListView) => !prevIsListView);
    };

    return (
        <div id="ListingClips">
            <div className="ListingClips-wrapper fl_col gp22 pd40-r-l">
                <div className="clips-format-display fl_row jc_fe" >
                    <img onClick={toggleListView} src={ListingFormatIcon.src} alt="" />
                </div>
                <div className={`clips-listing ${isListView ? 'List' : ''}`}>
                    {DataForTesting.map((video, index) => (
                        <div className="video-card fl_col gp10">
                            <div className="video-clip">
                                <div className="video-display">
                                    <img src={playvideoIcon.src} alt="" className="play-video" />
                                    <img className='video-thumbnail rd10' src={video.video_thumbnail} alt="" />
                                </div>
                                <video className='hide'
                                    src={video.video_url}
                                    controls
                                    onLoadedMetadata={(e) => handleMetadataLoaded(index, e.target.duration)}
                                ></video>
                                <p className="p10 video-time">
                                    {videoDurations[index] ? formatVideoTime(videoDurations[index]) : 'Video Time Placeholder'}
                                </p>
                            </div>
                            <div className="video-info fl_row gp12">
                                <div className="user-avatar">
                                    <img className='rd50' src={video.user_avatar} alt={video.username} />
                                </div>
                                <div className="info-box fl_col gp5">
                                    <div>
                                        <p className="p12 video-title mx1 txt_white">{video.video_title}</p>
                                    </div>
                                    <div className="fl_row gp5 p12 txt_grey video-footer">
                                        <p className="username">{video.username}</p>
                                        <div className="fl_row gp2">
                                            <p className="video-views">15k Views</p>
                                            <p>.</p>
                                            <p className="post-video-date">1 week ago</p>
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
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default ListingClipsComponents;