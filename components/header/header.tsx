import Link from "next/link";
import logoWhite from "../../src/assets/imgs/ClipitLogoWhite.png"
import UserNav from "../user_bar/user_bar";
function Header() {
    return (
        <div className="fl_row jc_s ai_c">
            <div className="logo">
                <img src={logoWhite.src} alt="" />
            </div>
            <div className="menu txt_white">
                <ul className="fl_row gp20 p14">
                    <Link href={"#"}><li className="active">Home</li></Link>
                    <Link href={"#"}><li>About us</li></Link>
                    <Link href={"#"}><li>Top Players</li></Link>
                    <Link href={"#"}><li>Contact</li></Link>
                </ul>
            </div>
            <div className="userNav">
                <div className="unregistred hide">
                    <Link href={"/login"}>
                        <p className="btn-primary btn">Login</p>
                    </Link>
                </div>
                <div className="registred ">
                    <UserNav></UserNav>
                </div>
            </div>
        </div>
    );
}


export default Header;
