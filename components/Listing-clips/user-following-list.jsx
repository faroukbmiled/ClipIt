import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Link from "next/link";
import axios from "axios";

function MostFollowedUsersListing({ session }) {
  const [followingData, setFollowingData] = useState([]);
  const [followingCount, setFollowingCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/me/getFollowing");
        setFollowingData(response.data.following);
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
          <p className="p14">
            Following {followingCount > 0 && `(${followingCount})`}
          </p>
        </div>
        <div className="body-wrapper">
          {loading ? (
            <PulseLoader color="#7F56D9"/>
          ) : (
            <div className="users-listing fl_col gp15">
              {session?.user ? (
                followingData.length > 0 ? (
                  followingData.map((user, index) => (
                    <div
                      className="card-user fl_row gp24 ai_c"
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => (location.href = "/user/" + user.userId)}
                    >
                      <img className="rd50" src={user.avatar} alt={user.name} />
                      <p className="p14 txt_white">{user.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="p10 txt_white">You are not following anyone</p>
                )
              ) : (
                <p className="p10 txt_white">
                  Please <Link href="/login">log in</Link> to view this content
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MostFollowedUsersListing;
