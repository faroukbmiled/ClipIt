import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import UploadVideoIcon from "@assets/icons/UploadVideoIcon.svg";
import removeIcon from "@assets/icons/removeIcon.svg";
import { useRouter } from "next/router";
import AddVideo from "@assets/icons/AddVideo.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LinearProgress from "@mui/material/LinearProgress";
import gameCategoriesData from "./categories.json";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import "react-toastify/dist/ReactToastify.css";

function UploadVideoModal({ session, signOut }) {
  const router = useRouter();

  const [selectedFileName, setSelectedFileName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [swiper, setSwiper] = useState(null);
  const [UploadProgress, setUplaodProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gameCategories, setGameCategories] = useState([]);
  const cancelTokenSourceRef = useRef(axios.CancelToken.source());

  useEffect(() => {
    setGameCategories(gameCategoriesData.gameCategories);
  }, []);
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
      cancelTokenSourceRef.current = axios.CancelToken.source();

      const response = await axios.post("/api/user/uploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // mahdouch use this to show upload progress
          const percentComplete =
            (progressEvent.loaded / progressEvent.total) * 100;
          setUplaodProgress(percentComplete);
          console.log("Upload Progress: " + percentComplete + "%");
        },
        cancelToken: cancelTokenSourceRef.current.token,
      });

      if (response.status === 200) {
        const result = response.data;
        toast.success("Video uploaded successfully");
        console.log(result);
        router.reload();
      } else {
        if (response?.data?.error) {
          toast.error(error.response?.data?.error);
        } else {
          toast.error("Error uploading video");
        }
        console.error("Error uploading video:", response.statusText);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response?.data?.errors.join(","));
      } else {
        toast.error("Error uploading video");
      }
      console.error("Error uploading video:", error.message);
    } finally {
      setUplaodProgress(0);
    }
  };

  const cancelUpload = () => {
    if (UploadProgress !== 0) {
      cancelTokenSourceRef.current.cancel("Upload canceled by user");
      setUplaodProgress(0);
    }
  };

  const handlePrevious = () => {
    cancelUpload();
    swiper.slidePrev();
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
                    <p className="p22 txt_center w-700 pd40-b txt_white">
                      Upload Video
                    </p>
                    <div className="boxUploadSection fl_col gp20 pd20">
                      <div className="boxupload txt_center">
                        <input
                          type="file"
                          id="video"
                          name="video"
                          accept="video/mp4, video/webm"
                          onChange={handleFileChange}
                          required
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
                          required
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
                  <div className="fl_col gp10 cardInfo">
                    <p className="p22 txt_center w-700 txt_white">
                      Video Information
                    </p>
                    <div className="boxinputsSection light-input fl_col gp20 ">
                      <div className="inp-col fl_col">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          required
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={UploadProgress !== 0}
                        />
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          required
                          disabled={UploadProgress !== 0}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="category">Category</label>
                        {/* <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          onChange={(e) => setCategory(e.target.value)}
                        /> */}
                        <select
                          name="category"
                          required
                          disabled={UploadProgress !== 0}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Select Category
                          </option>
                          {gameCategories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="inp-col fl_col">
                        <label htmlFor="hashtag">Hashtag</label>
                        <input
                          type="text"
                          name="hashtag"
                          required
                          placeholder="Hashtag"
                          disabled={UploadProgress !== 0}
                          onChange={(e) => setHashtag(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="UploadProgress">
                      {UploadProgress !== 0 && (
                        <LinearProgress
                          variant="determinate"
                          value={parseFloat(UploadProgress)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="card-footer fl_row gp20">
                    <p
                      onClick={handlePrevious}
                      className="p14 btn txt_center btn-light fl-1 txt_white"
                    >
                      {UploadProgress !== 0 ? "Cancel" : "Previous"}
                    </p>
                    <button
                      className="p14 btn btn-primary txt_center fl-1"
                      type="submit"
                      disabled={UploadProgress !== 0}
                    >
                      {UploadProgress !== 0 ? (
                        <BeatLoader color="white" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                  <ToastContainer pauseOnFocusLoss draggable autoClose={2000} />
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
