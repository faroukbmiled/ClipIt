import homeIcon from "../../src/assets/Icons/home-icon.svg";
import YourvideosIcon from "../../src/assets/Icons/Your-videos.svg";
import SubscriptionsIcon from "../../src/assets/Icons/Subscriptions-Icon.svg";
import LikedVideosIcon from "../../src/assets/Icons/Liked-VideosIcon.svg";
import Link from 'next/link'

function NavOptions() {
    return (
        <div id="navOptions">
            <div className="navOptions-wrapper">
                <ul className="menu-list fl_col gp5">
                    <li className="fl_row ai_c gp24 txt_white pd10-t-b pd28-r-l p14">
                        <img src={homeIcon.src} alt="homeIcon" />
                        <Link href="/Home"></Link>
                        <p className="p14">Home</p>
                    </li>
                    <li className="fl_row ai_c gp24 txt_white pd10-t-b pd28-r-l p14">
                        <img src={YourvideosIcon.src} alt="YourvideosIcon" />
                        <Link href="/Your-Videos"></Link>
                        <p className="p14">Your Videos</p>
                    </li>
                    <li className="fl_row ai_c gp24 txt_white pd10-t-b pd28-r-l p14">
                        <img src={SubscriptionsIcon.src} alt="SubscriptionsIcon" />
                        <Link href="/Subscriptions"></Link>
                        <p className="p14">Subscriptions</p>
                    </li>
                    <li className="fl_row ai_c gp24 txt_white pd10-t-b pd28-r-l p14">
                        <img src={LikedVideosIcon.src} alt="LikedVideosIcon" />
                        <Link href="/Liked-Videos"></Link>
                        <p className="p14">Liked Videos</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavOptions;