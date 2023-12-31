import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/dist/client/link";
import Header from "../../components/header/header";
import LogoutIcon from "../../src/assets/Icons/LogoutIcon.svg";
import UserInfo from "./user-info";
import FollowersProfile from "./followers.profile";
import FollowingProfile from "./following.profile";

function EditProfile() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("My Account");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div id="page-content" className="pd40">
            <div id="header">
                <Header session={session} status={status} signOut={signOut}></Header>
            </div>
            <div id="body">
                <div id="EditProfile">
                    <div className="EditProfile-wrapper fl_col gp40">
                        <div className="header-block fl_col gp40">
                            <div className="fl_row jc_s">
                                <p className="p32 txt_white w-600">Edit Profile</p>
                                <div className="btn btn-red fl_row gp5 ai_c" onClick={() => signOut()}>
                                    <p>Logout</p>
                                    <img src={LogoutIcon.src} alt="" />
                                </div>
                            </div>
                            <div className="fl_row tab-menu txt_white gp40">
                                <p
                                    className={`p14 ${activeTab === "My Account" ? "active-tab" : ""}`}
                                    onClick={() => handleTabClick("My Account")}
                                >
                                    My Account
                                </p>
                                <p
                                    className={`p14 ${activeTab === "Followers" ? "active-tab" : ""}`}
                                    onClick={() => handleTabClick("Followers")}
                                >
                                    Followers
                                </p>
                                <p
                                    className={`p14 ${activeTab === "Following" ? "active-tab" : ""}`}
                                    onClick={() => handleTabClick("Following")}
                                >
                                    Following
                                </p>
                            </div>
                        </div>
                        <div className="profile-info ">
                            <div className="tabs-content pd20-r-l pd40-t-b rd10">
                                {activeTab === "My Account" && <div className="myacc-tab txt_white">
                                    <UserInfo></UserInfo>
                                </div>}
                                {activeTab === "Followers" && <div className="followers-tab txt_white">
                                    <FollowersProfile></FollowersProfile>
                                </div>}
                                {activeTab === "Following" && <div className="following-tab txt_white">
                                    <FollowingProfile></FollowingProfile>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer"></div>
        </div>
    );
}

export default EditProfile;
