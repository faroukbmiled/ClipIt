import AddVideo from "../../src/assets/Icons/AddVideo.svg";
import Modal from "antd/es/modal/Modal";
import React, { useState } from 'react';


function UserNav({ session, signOut }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div id="userNav" className="fl_row ai_c gp20">
      <div className="UploadVideo">
        <img onClick={showModal} src={AddVideo.src} alt="" />
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
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
