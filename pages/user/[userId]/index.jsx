import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PreloaderSpin from "../../../components/preloader";
import ListingVideosProfile from "../../../components/user-profile/listing-videos-profile";
import FollowersProfile from "../../../components/user-profile/followers-profile";
import FollowingProfile from "../../../components/user-profile/following-profile";
import AboutProfile from "../../../components/user-profile/about-profile";
import { useSession, signOut } from "next-auth/react";
import Header from "../../../components/header/header";
import FollowUser from "@assets/icons/Follow-user.svg";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userId, tab } = router.query;
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || "videos");
  const [isUserFollowed, setIsUserFollowed] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [followersData, setFollowersData] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [loadingFollowers, setLoadingFollowers] = useState(true);
  const [followingData, setFollowingData] = useState([]);
  const [followingCount, setFollowingCount] = useState();
  const [loadingFollowing, setLoadingFollowing] = useState(true);

  const fetchUserData = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/user/${userId}`);
        setUserData(response.data);
        if (!response.data || response.data.length === 0) {
          router.push("/");
        }
        console.log(response.data.isFollowed);
        setIsUserFollowed(response.data.isFollowed || false);
      }
    } catch (error) {
      router.push("/404");
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFollowingData = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/user/getFollowing/${userId}`);
        setFollowingData(response.data.following);
        setFollowingCount(response.data.followingCount);
        setLoadingFollowing(false);
      }
    } catch (error) {
      console.error("Error fetching following:", error);
      setLoadingFollowing(false);
    }
  };

  const fetchFollowersData = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/user/getFollowers/${userId}`);
        setFollowersData(response.data.followers);
        setFollowersCount(response.data.followersCount);
        setLoadingFollowers(false);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
      setLoadingFollowers(false);
    }
  };

  const followOrUnfollowUser = async () => {
    try {
      if (userId) {
        if (isUserFollowed) {
          await axios.post("/api/user/me/unfollowUser", {
            unfollowingId: userId,
          });
        } else {
          await axios.post("/api/user/me/followUser", {
            followingId: userId,
          });
        }
        await fetchUserData();
        await fetchFollowersData();
        await fetchFollowingData();
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      if (error.response && error.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchFollowersData();
    fetchFollowingData();
  }, [userId]);

  useEffect(() => {
    setActiveTab(tab || "videos");
  }, [tab]);

  useEffect(() => {
    if (userId && session?.user?.id) {
      if (userId === session?.user?.id) {
        router.push(`/user/me?tab=${tab || "videos"}`);
      }
    }
  }, [userId, session, tab]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPreloader(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!userData || showPreloader) {
    return (
      <div className="body fl_row w-100vw">
        <PreloaderSpin />
      </div>
    );
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
                <img src={userData?.cover} alt="" />
              </div>
              <div className="user-info fl_row gp24 ai_c ">
                <div className="user-avatar">
                  <img className="rd50" src={userData?.avatar} alt="" />
                </div>
                <div className="user-details fl_col">
                  <p className="p24 txt_white w-700 cap">
                    {userData?.username}
                  </p>
                  <p className="p14 txt_light-grey">
                    {userData?.followers} Followers
                  </p>
                </div>
              </div>
              <div className="user-tabs">
                <ul className="fl_row gp50 p14 txt_light-grey">
                  <li
                    onClick={() => setActiveTab("videos")}
                    className={activeTab === "videos" ? "active-tab" : ""}
                  >
                    Videos
                  </li>
                  <li
                    onClick={() => setActiveTab("followers")}
                    className={activeTab === "followers" ? "active-tab" : ""}
                  >
                    Followers
                  </li>
                  <li
                    onClick={() => setActiveTab("following")}
                    className={activeTab === "following" ? "active-tab" : ""}
                  >
                    Following
                  </li>
                  <li
                    onClick={() => setActiveTab("about")}
                    className={activeTab === "about" ? "active-tab" : ""}
                  >
                    About
                  </li>
                </ul>
              </div>
            </div>
            <div className="follow-box btn btn-primary fl_row gp10 ai_c rd20">
              <img src={FollowUser.src} alt="" />
              <p className="p17" onClick={followOrUnfollowUser}>
                {isUserFollowed ? "Unfollow" : "Follow"}
              </p>
            </div>
          </div>
        </div>
        <div className="content-tabs pd40">
          {activeTab === "videos" && (
            <ListingVideosProfile
              userData={userData}
              userId={userId}
              setUserData={setUserData}
            />
          )}
          {activeTab === "followers" && (
            <FollowersProfile
              followersData={followersData}
              followersCount={followersCount}
              loading={loadingFollowers}
            />
          )}
          {activeTab === "following" && (
            <FollowingProfile
              followingData={followingData}
              followingCount={followingCount}
              loading={loadingFollowing}
            />
          )}
          {activeTab === "about" && (
            <AboutProfile userId={userId} bioData={userData?.bio} />
          )}
        </div>
      </div>
      <div id="footer">
        {/* <pre style={{backgroundColor: "white"}}>{JSON.stringify(userData, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default UserProfile;
