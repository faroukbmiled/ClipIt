import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ListingVideosProfile from "../../../components/user-profile/listing-videos-profile";
import FollowersProfile from "../../../components/user-profile/followers-profile";
import FollowingProfile from "../../../components/user-profile/following-profile";
import AboutProfile from "../../../components/user-profile/about-profile";
import { useSession, signOut } from "next-auth/react";
import Header from "../../../components/header/header";
import Link from "next/link";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState(session?.user?.id || null);
  const { tab } = router.query;
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || "videos");
  const [followersData, setFollowersData] = useState([]);
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
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  const handleRemoveFollowing = (followingId) => {
    axios
      .post("/api/user/me/removeFollowing", { followingId })
      .then((response) => {
        axios.get("/api/user/me/getFollowing").then((response) => {
          setFollowingData(response.data.following);
          setFollowingCount(response.data.followingCount);
        });
      })
      .catch((error) => {
        console.error("Error removing following:", error);
      });
  };

  const handleRemoveFollower = (followerId) => {
    axios
      .post("/api/user/me/removeFollower", { followerId })
      .then((response) => {
        axios.get("/api/user/me/getFollowers").then((response) => {
          setFollowersData(response.data.followers);
          setFollowersCount(response.data.followersCount);
        });
      })
      .catch((error) => {
        console.error("Error removing follower:", error);
      });
  };

  const handleTabClick = (tab) => {
    router.push(`/user/me?tab=${tab}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id) {
          setUserId(session?.user?.id);
          await fetchUserData();
          await fetchFollowersData();
          await fetchFollowingData();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [session?.user?.id, userId]);

  useEffect(() => {
    setActiveTab(tab || "videos");
  }, [tab]);

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
              <Link href="/edit-profile">
                <p className="p17">Edit</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="content-tabs pd40">
          {activeTab === "videos" && <ListingVideosProfile userId={userId} />}
          {activeTab === "followers" && (
            <FollowersProfile
              followersData={followersData}
              followersCount={followersCount}
              loading={loadingFollowers}
              isMe={true}
              removeFollowerHandler={handleRemoveFollower}
            />
          )}
          {activeTab === "following" && (
            <FollowingProfile
              followingData={followingData}
              followingCount={followingCount}
              loading={loadingFollowing}
              isMe={true}
              removeFollowingHandler={handleRemoveFollowing}
            />
          )}
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
