import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import followers_icon from "@assets/icons/followers_icon.svg";
import eye_icon from "@assets/icons/eye.svg";
import videos_icon from "@assets/icons/videos.svg";
import "swiper/css";
import Link from "next/link";

export default function MostFollowedUsers() {
  const [mostFollowedUsers, setMostFollowedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/getMostFollowedUsers")
      .then((response) => {
        setMostFollowedUsers(response.data.mostFollowedUsers);
      })
      .catch((error) => {
        console.error("Error fetching most followed users:", error);
      });
  }, []);

  return (
    <div id="MostFollowedUsers">
      <div className="wrapper fl_col gp60">
        <div className="header-block fl_row ai_c jc_s">
          <p className="p31 txt_white w-700">Most Followed Users</p>
          <p className="btn btn-grey p14"> SEE ALL</p>
        </div>
        <div className="users-listing fl_col">
          {mostFollowedUsers.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Swiper slidesPerView={4} spaceBetween={20}>
              {mostFollowedUsers.map((user) => (
                <SwiperSlide key={user.userId}>
                  <div className="card-user fl_col gp10">
                    <Link href={"/user/" + user.userId}></Link>
                    <div className="user-avatar">
                      <img className="rd20 user-img" src={user.avatar} alt="" />
                      <div className="user-info pd40 rd20 fl_col txt_white">
                        <p className="p24 ">{user.name}</p>
                        <div className="fl_row gp5 ai_c">
                          <img src={eye_icon.src} alt="" />
                          <p className="p22">{user.totalVideosViews}</p>
                        </div>
                        <div className="fl_row gp5 ai_c">
                          <img src={videos_icon.src} alt="" />
                          <p className="p22">{user.totalVideosCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fl_row gp10 jc_c">
                      <img src={followers_icon.src} alt="" />
                      <p className="p22 txt_white">
                        {user.followersCount} Followers
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
