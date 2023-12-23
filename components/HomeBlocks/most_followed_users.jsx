import { Swiper, SwiperSlide } from 'swiper/react';
import followers_icon from "../../src/assets/Icons/followers_icon.svg"
import 'swiper/css';
export default function MostFollowedUsers() {
    return (
        <div id="MostFollowedUsers">
            <div className="wrapper fl_col gp60">
                <div className="header-block fl_row ai_c jc_s">
                    <p className="p31 txt_white w-700">
                        Most Followed Users
                    </p>
                    <p className="btn btn-grey p14"> SEE ALL</p>
                </div>
                <div className="users-listing fl_col">
                    <Swiper
                        slidesPerView={4}
                    >
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-man-w-mohawk-and-sunglasses-on-a-red-background-image_2940215.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://e1.pxfuel.com/desktop-wallpaper/285/251/desktop-wallpaper-youtube-fire-gaming-logo-fire-guild-logos-thumbnail.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                        <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://w0.peakpx.com/wallpaper/576/602/HD-wallpaper-gaming-logo-sheikhshahan.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-bearded-man-with-b-earbuds-and-headphones-image_2946528.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-man-w-mohawk-and-sunglasses-on-a-red-background-image_2940215.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-man-w-mohawk-and-sunglasses-on-a-red-background-image_2940215.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="card-user fl_col gp10">
                                <div className='user-avatar'>
                                    <img className='rd20' src="https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-man-w-mohawk-and-sunglasses-on-a-red-background-image_2940215.jpg"alt="" />
                                </div>
                                <div className='fl_row gp10 jc_c'>
                                    <img src={followers_icon.src} alt="" />
                                    <p className="p22 txt_white">40 Followers</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
