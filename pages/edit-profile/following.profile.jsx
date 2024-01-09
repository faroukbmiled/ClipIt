import React, { useState, useEffect } from "react";
import LoadingSpin from "react-loading-spin";
import axios from "axios";

function FollowingProfile() {
  const [followingData, setFollowingData] = useState([]);
  const [followingCount, setFollowingCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/me/getFollowing")
      .then((response) => {
        setFollowingData(response.data.following);
        setFollowingCount(response.data.followingCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching following:", error);
        setLoading(false);
      });
  }, []);

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
  return (
    <div id="FollowingProfile" className="fl_col gp40">
      <p className="p20 title-block txt_center pd40-b">
        Following {followingCount > 0 && `(${followingCount})`}
      </p>
      {loading || !followingData ? (
        <LoadingSpin />
      ) : (
        <div className="listing-profiles">
          {followingData.map((following, index) => (
            <div key={index} className="user-data pd20 fl_row gp20 ai_c rd15">
              <p
                className="unfollow-user"
                onClick={() => handleRemoveFollowing(following.userId)}
              >
                x
              </p>
              <img src={following.avatar} alt="" />
              <p className="p14">{following.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowingProfile;
