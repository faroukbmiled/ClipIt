import React, { useState } from 'react';
import UploadVideoModal from '../Upload/upload-video-modal';
import Link from 'next/link';
function UserNav({ session, signOut }) {
  return (
    <div id="userNav" className="fl_row ai_c gp20">
      <UploadVideoModal></UploadVideoModal>
      <div className="user-menu">
        <img className="user-avatar rd50" src={session?.user?.image} alt="" />
        <div className="user-list-options pd20 fl_col gp10 rd10">
          <p className="p14">
            <Link href="/edit-profile">My Profile</Link>
          </p>
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
