import React from "react";
import PreloaderSpin from "../../components/preloader";

function FollowingProfile({
  followingData,
  followingCount,
  loading,
  isMe = false,
  removeFollowingHandler,
}) {
  const handleRemoveFollowing = (followingId) => {
    if (isMe) {
      removeFollowingHandler(followingId);
    }
  };

  return (
    <div id="FollowingProfile" className="fl_col gp40">
      <p className="p20 title-block txt_center pd40-b txt_white">
        Following {followingCount > 0 && `(${followingCount})`}
      </p>
      {loading || !followingData ? (
        <div className="jc_c fl_row w-100vw h-100vh ai_c">
          <PreloaderSpin />
        </div>
      ) : (
        <div className="listing-profiles">
          {followingData.map((following, index) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => (location.href = "/user/" + following.userId)}
              key={index}
              className="user-data pd20 fl_row gp20 ai_c rd15"
            >
              {isMe && (
                <p
                  className="unfollow-user txt_white"
                  onClick={() => handleRemoveFollowing(following.userId)}
                >
                  x
                </p>
              )}
              <img src={following.avatar} alt="" />
              <p className="p14 txt_white">{following.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FollowingProfile;
