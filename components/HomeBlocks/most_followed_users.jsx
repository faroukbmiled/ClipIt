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
                    <p className="btn btn-grey"> SEE ALL</p>
                </div>
                <div className="users-listing fl_col">
                    <Swiper
                        slidesPerView={4}
                    >
                        <SwiperSlide>
                            <div className="card-user">
                                <div>
                                    <img src=""alt="" />
                                </div>
                                <div className='fl_row gp10'>
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
