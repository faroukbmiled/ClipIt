import Head from "next/head";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LoadingSpin from "react-loading-spin";
import { setup } from "@lib/CustomCSRF";
import { useRouter } from "next/router";
import ClipiTLogo from "../../src/assets/imgs/ClipiT-logo.png";
import GmailIcon from "../../src/assets/Icons/google.svg";

function Login() {
  const { data: session, status } = useSession();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  function handleSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const returnUrl =
      new URLSearchParams(window.location.search).get("returnUrl") || "/";
    signIn("credentials", {
      email,
      password,
      rememberMe: rememberMe.toString(),
      callbackUrl: returnUrl,
    });
  }

  return (
    <div className="body fl_row w-100vw">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" ? (
        <div className="jc_c fl_row w-100vw h-100vh ai_c">
          <LoadingSpin />
        </div>
      ) : (
        <>
          <main id="login-auth" className="auth-layout w-100vw">
            <div className="auth-wrapper fl_row h-100vh">
              <div className="left-side fl-1 h-100 fl_col gp25 ai_c jc_fe ">
                <div className="left-side-wrapper txt_center pd40-r-l">
                  <p className="p40 w-700 txt_white">
                    Turn your ideas into reality.
                  </p>
                  <p className="p22 w-300 txt_white">
                    Start for free and get attractive offers from the community
                  </p>
                </div>
              </div>
              <div className="right-side fl-1 h-100  fl_col ai_c jc_c">
                <div className="right-side-wrapper w-100 fl_col gp30">
                  <div className="fl_row jc_c">
                    <img className="logo" src={ClipiTLogo.src} alt="" />
                  </div>
                  {session ? (
                    <>
                      <p>Welcome, {session.user.name}!</p>
                      <img className="logo" src={session.user.image} alt="" />
                      <button onClick={() => signOut()}>Sign out</button>
                      {/* {router.push("/")} */}
                    </>
                  ) : (
                    <>
                      <div className="form-header fl_col gp2 txt_grey txt_left">
                        <div className="fl_col gp32">
                          <div className="fl_col">
                            <p className="p36">Login to your Account</p>
                            <p className="p16">
                              See what is going on with your business
                            </p>
                          </div>
                          <button className="btn btn-light gp5">
                            <img src={GmailIcon.src} alt="" />
                            Continue with Google
                          </button>
                          <p className="p12 txt_center txt_darkGrey w-400">
                            ------------- or Sign in with Email -------------{" "}
                          </p>
                        </div>
                      </div>
                      <form action="" onSubmit={handleSignIn}>
                        <div className="form-fields fl_col gp10">
                          <div className="light-input fl_col gp20">
                            <div className="inp_col fl_col">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                type="email"
                                placeholder="mail@clipit.com"
                              />
                            </div>
                            <div className="inp_col fl_col">
                              <label htmlFor="password">Password</label>
                              <input
                                id="password"
                                type="password"
                                placeholder="*****************"
                              />
                            </div>
                          </div>
                          <div className="fl_row jc_s">
                            <div className="fl_row gp5">
                              <input
                                type="checkbox"
                                name="remmeberme"
                                id="remmeberme"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                              />
                              <label htmlFor="remmeberme">Remember Me</label>
                            </div>
                            <a href="">
                              <p className="p12 txt_primary">
                                Forgot Password?
                              </p>
                            </a>
                          </div>
                        </div>
                        <button className="fl_row btn btn-primary p18 mg35-t-b txt_center w-100 jc_c w-500">
                          Login
                        </button>
                        <div className="fl_row jc_c p15 gp10 p14">
                          <p className="txt_grey">Not Registered Yet?</p>
                          <a href="">
                            <p className="txt_primary">Create an account</p>
                          </a>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = setup(async ({ req, res }) => {
  return { props: {} };
});

export default Login;
