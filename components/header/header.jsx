import React, { useState, useEffect } from "react";
import Link from "next/link";
import logoWhite from "../../src/assets/imgs/ClipitLogoWhite.png";
import UserNav from "../user_bar/user_bar";
import { useGlitch } from 'react-powerglitch'

function Header({ status, session, signOut }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const glitch = useGlitch();
  useEffect(() => {
    setIsUserAuthenticated(status === "authenticated");
  }, [status]);

  return (
    <div className="fl_row jc_s ai_c">
      <div className="logo">
        <Link href={"/"} tabIndex="-1">
          <img ref={glitch.ref} src={logoWhite.src} alt="" />
        </Link>
      </div>
      <div className="menu txt_white">
        <ul className="fl_row gp40 p14" tabIndex="-1">
          <Link href="/" tabIndex="-1">
            <li className="active">Home</li>
          </Link>
          <Link href="/listing-clips" tabIndex="-1">
            <li>Clips</li>
          </Link>
          {/* <Link href="#" tabIndex="-1">
            <li>Top Players</li>
          </Link> */}
          <Link href="" tabIndex="-1">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="userNav">
        {status === "loading" ? (
          <div className="unregistred">
            <p style={{ color: "white" }}>Loading...</p>
          </div>
        ) : isUserAuthenticated ? (
          <div className="registred">
            <UserNav session={session} signOut={signOut}></UserNav>
          </div>
        ) : (
          <div className="unregistred">
            <Link href="/login">
              <p className="btn-primary btn">Login</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
