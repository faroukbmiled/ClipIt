import React, { useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import UploadVideoIcon from "../../src/assets/Icons/UploadVideoIcon.svg";
import removeIcon from "../../src/assets/Icons/removeIcon.svg";
import { useRouter } from "next/router";
import AddVideo from "../../src/assets/Icons/AddVideo.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function UploadVideoModal({ session, signOut }) {
  const router = useRouter();

  const [selectedFileName, setSelectedFileName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [swiper, setSwiper] = useState(null);
  const [UploadProgress, setUplaodProgress] = useState("0%");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const fileName = file ? file.name : "";
    setSelectedFileName(fileName);
  };

  const displayThubmnailImage = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Unsupported file type for thumbnail");
    }
  };

  const removeThubmnailImage = () => {
    setThumbnailUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("hashtag", hashtag);
      formData.append("video", event.target.elements.video.files[0]);
      formData.append("thumbnail", event.target.elements.thumbnail.files[0]);

      const response = await axios.post("/api/user/uploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => { // mahdouch use this to show upload progress
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
          setUplaodProgress(`${percentComplete} %`)
          console.log("Upload Progress: " + percentComplete + "%");
        },
      });

      if (response.status === 200) {
        const result = response.data;
        console.log(result);
        router.reload();
      } else {
        console.error("Error uploading video:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading video:", error.message);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <Swiper
              slidesPerView={1}
              onSwiper={(swiper) => swiper && setSwiper(swiper)}
            >
              <SwiperSlide>
                <div className="card-user fl_col gp10 h-100">
                  <div className="card-content">
                    <p className="p22 txt_center w-700 pd40-b">Upload Video</p>
                    <div className="boxUploadSection fl_col gp20 pd20">
                      <div className="boxupload txt_center">
                        <input
                          type="file"
                          id="video"
                          name="video"
                          accept="video/mp4, video/webm"
                          onChange={handleFileChange}
                        />
                        <img src={UploadVideoIcon.src} alt="" />
                        <p className="p16">
                          Drag & drop files or{" "}
                          <span className="txt_primary w-700">Browse</span>
                        </p>
                        <p className="p12 txt_grey">
                          Supported formats: MP4, WEBM
                        </p>
                        <p className="p10">{selectedFileName}</p>
                      </div>
                      <div className="inp-col fl_col video-thumbnail pd30">
                        <p className="p16">
                          Choose Video{" "}
                          <span className="txt_primary w-700">Thumbnail</span>
                        </p>
                        <input
                          className="txt_center"
                          onChange={displayThubmnailImage}
                          type="file"
                          id="thumbnail"
                          name="thumbnail"
                        />
                        {thumbnailUrl && (
                          <img
                            className="ImagePreview"
                            src={thumbnailUrl}
                            alt="Uploaded Thumbnail"
                          />
                        )}
                        <img
                          className="removeThubmnailImage"
                          onClick={removeThubmnailImage}
                          src={removeIcon.src}
                          alt="removeIcon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer fl_row jc_c">
                    <p
                      onClick={() => swiper.slideNext()}
                      className="p14 btn-next btn btn-primary txt_center"
                    >
                      Next
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-user fl_col gp20">
                  <div className="fl_col gp10">
                    <p className="p22 txt_center w-700">
                      Video Information
                    </p>
                    <div className="boxinputsSection light-input fl_col gp20 ">
                      <div className="inp-col fl_col">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="category">Category</label>
                        <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="hashtag">Hashtag</label>
                        <input
                          type="text"
                          name="hashtag"
                          placeholder="Hashtag"
                          onChange={(e) => setHashtag(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-footer fl_row gp20">
                    <p
                      onClick={() => swiper.slidePrev()}
                      className="p14 btn txt_center btn-light fl-1"
                    >
                      Previous
                    </p>
                    <button
                      className="p14 btn btn-primary txt_center fl-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadVideoModal;
