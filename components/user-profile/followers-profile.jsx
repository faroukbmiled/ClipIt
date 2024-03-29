import React from "react";
import PreloaderSpin from "../../components/preloader";

function FollowersProfile({
  followersData,
  followersCount,
  loading,
  isMe = false,
  removeFollowerHandler,
}) {
  const handleRemoveFollower = (followerId) => {
    if (isMe) {
      removeFollowerHandler(followerId);
    }
  };

  return (
    <div id="FollowersProfile" className="fl_col gp40">
      <p className="p20 title-block txt_center pd40-b txt_white">
        Followers {followersCount > 0 && `(${followersCount})`}
      </p>
      {loading || !followersData ? (
        <div className="jc_c fl_row w-100vw h-100vh ai_c">
          <PreloaderSpin />
        </div>
      ) : (
        <div className="listing-profiles">
          {followersData.length > 0 ? (
            followersData.map((follower, index) => (
              <div
                style={{ cursor: "pointer" }}
                key={index}
                className="user-data pd20 fl_row gp20 ai_c rd15"
              >
                {isMe && (
                  <p
                    className="unfollow-user"
                    onClick={() => handleRemoveFollower(follower.userId)}
                  >
                    x
                  </p>
                )}
                <img
                  src={follower.avatar}
                  alt=""
                  onClick={() => (location.href = "/user/" + follower.userId)}
                />
                <p
                  className="p14 txt_white"
                  onClick={() => (location.href = "/user/" + follower.userId)}
                >
                  {follower.name}{" "}
                </p>
              </div>
            ))
          ) : (
            <p className="txt_white">No followers found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FollowersProfile;
