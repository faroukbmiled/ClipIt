import React, { useState, useEffect } from "react";
import axios from "axios";

function FollowersProfile({ userId }) {
  const [followersData, setFollowersData] = useState();
  const [followersCount, setFollowersCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/user/getFollowers/${userId}`)
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

  return (
    <div id="FollowersProfile" className="fl_col gp40">
      <p className="p20 title-block txt_center pd40-b txt_white">
        Followers {followersCount > 0 && `(${followersCount})`}
      </p>
      {loading || !followersData ? (
        <p className="p20 txt_center">Loading...</p>
      ) : (
        <div className="listing-profiles">
          {followersData.map((follower, index) => (
            <div key={index} className="user-data pd20 fl_row gp20 ai_c rd15">
              <img src={follower.avatar} alt="" />
              <p className="p14">{follower.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowersProfile;
