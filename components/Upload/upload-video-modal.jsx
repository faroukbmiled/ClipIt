
import AddVideo from "../../src/assets/Icons/AddVideo.svg";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import UploadVideoIcon from "../../src/assets/Icons/UploadVideoIcon.svg";
import removeIcon from "../../src/assets/Icons/removeIcon.svg"

function UploadVideoModal({ session, signOut }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const displayFileName = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const fileName = file ? file.name : "";
        setSelectedFileName(fileName);
    };

    const displayThubmnailImage = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Unsupported file type for thumbnail');
        }
    };
    const [swiper, setSwiper] = useState(null);
    const removeThubmnailImage = () => {
        setThumbnailUrl("");
    }
    return (
        <div className="UploadVideo">
            <img onClick={handleOpen} src={AddVideo.src} alt="" />
            <Modal
                className="rd25"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-post-upload">
                    <form action="">
                        <Swiper
                            slidesPerView={1}
                            onSwiper={(swiper) => setSwiper(swiper)}
                        >
                            <SwiperSlide>
                                <div className="card-user fl_col gp10 h-100">
                                    <div className="card-content">
                                        <p className="p22 txt_center w-700 pd40-b">Upload Video</p>
                                        <div className="boxUploadSection fl_col gp20">
                                            <div className="boxupload txt_center">
                                                <input type="file" id="avatar" name="avatar" accept="video/mp4, video/webm" onChange={displayFileName} />
                                                <img src={UploadVideoIcon.src} alt="" />
                                                <p className="p16">Drag & drop files or <span className="txt_primary w-700">Browse</span></p>
                                                <p className="p12 txt_grey">Supported formates: MP4,WEBM</p>
                                                <p className="p10">{selectedFileName}</p>
                                            </div>
                                            <div className="inp-col fl_col video-thumbnail pd30">
                                                <p className="p16">Choose Video <span className="txt_primary w-700">Thumbnail</span></p>
                                                <input onChange={displayThubmnailImage} type="file" id="Thumbnail" name="Thumbnail" />
                                                {thumbnailUrl && <img className="ImagePreview" src={thumbnailUrl} alt="Uploaded Thumbnail" />}
                                                <img className="removeThubmnailImage" onClick={removeThubmnailImage} src={removeIcon.src} alt="removeIcon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <p onClick={() => swiper.slideNext()} className="p14 btn-next btn btn-primary txt_center">Next</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-user fl_col gp20">
                                    <div className="fl_col gp10">
                                        <p className="p22 txt_center w-700 pd40-b">Video Informations</p>
                                        <div className="boxinputsSection light-input fl_col gp20 ">
                                            <div className="inp-col fl_col">
                                                <label htmlFor="Title">Title</label>
                                                <input type="text" name="Title" placeholder="Title" />
                                            </div>
                                            <div className="inp-col fl_col">
                                                <label htmlFor="Description">Description</label>
                                                <input type="text" name="Description" placeholder="Description" />
                                            </div>
                                            <div className="inp-col fl_col">
                                                <label htmlFor="Category">Category</label>
                                                <input type="text" name="Category" placeholder="Category" />
                                            </div>
                                            <div className="inp-col fl_col">
                                                <label htmlFor="Hashtag">Hashtag</label>
                                                <input type="text" name="Hashtag" placeholder="Hashtag" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer fl_col gp20">
                                        <p onClick={() => swiper.slidePrev()} className="p14 btn txt_center btn-light fl-1">Previous</p>
                                        <button className="p14 btn btn-primary txt_center fl-1" type="submit">Submit</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </form>
                    {swiper && (
                        <>


                        </>
                    )}
                </Box>
            </Modal>
        </div>
    )
}
export default UploadVideoModal;
