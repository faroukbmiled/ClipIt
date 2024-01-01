import React, { useEffect, useState } from "react";
import axios from "axios";

function MostFollowedUsersListing() {
  const [followingData, setFollowingDataData] = useState([]);
  const [followingCount, setFollowingCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/getFollowing");
        setFollowingDataData(response.data.following);
        setFollowingCount(response.data.followingCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="MostFollowedUsersListing">
      <div className="MostFollowedUsersListing-wrapper pd24-r-l fl_col gp20">
        <div className="header-wrapper">
          <p className="p14">Following {followingCount > 0 && `(${followingCount})`}
      </p>
        </div>
        <div className="body-wrapper">
          {loading || !followingData ? (
            <p>Loading...</p>
          ) : (
            <div className="users-listing fl_col gp15">
              {followingData.map((user, index) => (
                <div className="card-user fl_row gp24 ai_c" key={index}>
                  <img className="rd50" src={user.avatar} alt={user.name} />
                  <p className="p14 txt_white">{user.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MostFollowedUsersListing;
