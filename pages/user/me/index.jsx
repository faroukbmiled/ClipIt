import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ListingVideosProfile from "./listing-videos-profile";
import FollowersProfile from "./followers-profile";
import FollowingProfile from "./following-profile";
import AboutProfile from "./about-profile";
import { useSession, signOut } from "next-auth/react";
import Header from "../../../components/header/header";
import FollowUser from "../../../src/assets/Icons/Follow-user.svg";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setuserId] = useState(session?.user?.id || null);
  const { tab } = router.query;
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || "videos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          setuserId(session?.user?.id);
          const response = await axios.get(`/api/user/${session?.user?.id}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    setActiveTab(tab || "videos");
  }, [tab]);

  const handleTabClick = (tab) => {
    router.push(`/user/me?tab=${tab}`);
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div id="page-content" className="UserProfile-Page">
      <div className="pd40" id="header">
        <Header session={session} status={status} signOut={signOut}></Header>
      </div>
      <div id="body" className="fl_col gp20">
        <div id="HeaderProfile" className="pd40 w-100">
          <div className="HeaderProfile-wrapper fl_row jc_s ai_c w-100">
            <div className="user-box fl_col gp20">
              <div className="user-cover">
                <img src={userData.cover} alt="" />
              </div>
              <div className="user-info fl_row gp24 ai_c ">
                <div className="user-avatar">
                  <img className="rd50" src={userData.avatar} alt="" />
                </div>
                <div className="user-details fl_col">
                  <p className="p24 txt_white w-700 cap">{userData.username}</p>
                  <p className="p14 txt_light-grey">
                    {userData.followers} Followers
                  </p>
                </div>
              </div>
              <div className="user-tabs">
                <ul className="fl_row gp50 p14 txt_light-grey">
                  <li
                    onClick={() => handleTabClick("videos")}
                    className={activeTab === "videos" ? "active-tab" : ""}
                  >
                    Videos
                  </li>
                  <li
                    onClick={() => handleTabClick("followers")}
                    className={activeTab === "followers" ? "active-tab" : ""}
                  >
                    Followers
                  </li>
                  <li
                    onClick={() => handleTabClick("following")}
                    className={activeTab === "following" ? "active-tab" : ""}
                  >
                    Following
                  </li>
                  <li
                    onClick={() => handleTabClick("about")}
                    className={activeTab === "about" ? "active-tab" : ""}
                  >
                    About
                  </li>
                </ul>
              </div>
            </div>
            <div className="follow-box btn btn-primary fl_row gp10 ai_c rd20">
              {/* <img src={FollowUser.src} alt="" /> */}
              <p className="p17">Edit</p>
            </div>
          </div>
        </div>
        <div className="content-tabs pd40">
          {activeTab === "videos" && <ListingVideosProfile userId={userId} />}
          {activeTab === "followers" && <FollowersProfile userId={userId} />}
          {activeTab === "following" && <FollowingProfile userId={userId} />}
          {activeTab === "about" && <AboutProfile userId={userId} />}
        </div>
      </div>
      <div id="footer">
        {/* <pre style={{backgroundColor: "white"}}>{JSON.stringify(userData, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default UserProfile;
