import React, { useState, useEffect } from "react";
import Link from "next/link";
import logoWhite from "../../src/assets/imgs/ClipitLogoWhite.png";
import UserNav from "../user_bar/user_bar";

function Header({ status, session, signOut }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAuthLoading, setisAuthLoading] = useState(false); // TODO: use for lazy loader

  useEffect(() => {
    setIsUserAuthenticated(status === "authenticated");
    setisAuthLoading(status === "loading");
  }, [status]);

  return (
    <div className="fl_row jc_s ai_c">
      <div className="logo">
        <img src={logoWhite.src} alt="" />
      </div>
      <div className="menu txt_white">
        <ul className="fl_row gp40 p14" tabIndex="-1">
          <Link href="#" tabIndex="-1">
            <li className="active">Home</li>
          </Link>
          <Link href="#" tabIndex="-1">
            <li>About us</li>
          </Link>
          <Link href="#" tabIndex="-1">
            <li>Top Players</li>
          </Link>
          <Link href="#" tabIndex="-1">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="userNav">
        {isUserAuthenticated ? (
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
