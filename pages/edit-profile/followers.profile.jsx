import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";

function FollowersProfile() {
  const [followersData, setFollowersData] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/me/getFollowers")
      .then((response) => {
        setFollowersData(response.data.followers);
        setFollowersCount(response.data.followersCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
        setLoading(false);
      });
  }, []);

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

  return (
    <div id="FollowersProfile" className="fl_col gp40">
      <p className="p20 title-block txt_center pd40-b">
        Followers {followersCount > 0 && `(${followersCount})`}
      </p>
      {loading || !followersData ? (
        <PulseLoader color="#7F56D9"/>
      ) : (
        <div className="listing-profiles">
          {followersData.map((follower, index) => (
            <div key={index} className="user-data pd20 fl_row gp20 ai_c rd15">
              <p
                className="unfollow-user"
                onClick={() => handleRemoveFollower(follower.userId)}
              >
                x
              </p>
              <img
                src={follower.avatar}
                alt=""
                onClick={() => (location.href = "/user/" + follower.userId)}
              />
              <p
                className="p14"
                onClick={() => (location.href = "/user/" + follower.userId)}
              >
                {follower.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowersProfile;
