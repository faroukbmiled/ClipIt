import AddVideo from "../../src/assets/Icons/AddVideo.svg";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function UserNav({ session, signOut }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [swiper, setSwiper] = useState(null);

  return (
    <div id="userNav" className="fl_row ai_c gp20">
      <div className="UploadVideo">
        <img onClick={handleOpen} src={AddVideo.src} alt="" />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Swiper
              slidesPerView={1}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              <SwiperSlide>
                <div className="card-user fl_col gp10">
                  <p className="p22 txt_center w-700 pd40-b">Upload Video</p>
                  <div className="boxUploadSection">
                    <input type="file" id="avatar" name="avatar" accept="video/mp4, video/webm" />
                  </div>
                </div>
                <button onClick={() => swiper.slideNext()}>Next</button>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card-user fl_col gp10">
                  <p className="p22 txt_center w-700 pd40-b">Video Informations</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, adipisci repellendus harum similique unde fuga excepturi iure repudiandae, sequi est consequuntur rerum quos iste ad saepe cupiditate illum doloribus sint?</p>
                </div>
                <button onClick={() => swiper.slidePrev()}>Previous</button>
              </SwiperSlide>
            </Swiper>
            {swiper && (
              <>


              </>
            )}
          </Box>
        </Modal>
      </div>
      <div className="user-menu">
        <img className="user-avatar rd50" src={session?.user?.image} alt="" />
        <div className="user-list-options pd20 fl_col gp10 rd10">
          <p className="p14">My Profile</p>
          <p className="p14">Settings</p>
          <p className="p14">Top Clips</p>
          <p className="p14" onClick={() => signOut()}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
