import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import axios from "axios";
import ClipitLogoWhite from "@assets/imgs/ClipitLogoWhite.png";

const resetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState(null);

  const resetPasswordReq = async () => {
    if (email) {
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/resetPassword", {
          email,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      toast.info("If your email is valid an email will be sent", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    }
  };

  return (
    <>
      <Head>
        <title>Clipit - Reset Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth_user">
      <img className="logo-header" src={ClipitLogoWhite.src} alt="" />
        <div className="auth-wrapper fl_col gp20">
          <p className="p40 txt_white">Reset Password</p>
          <div className="fl_row">
            <form action="">
              <div className="light-input">
                <label for=""></label>
                <input
                  type="email"
                  name=""
                  id=""
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clip@clipit.tn"
                />
              </div>
            </form>
            <button className="btn btn-primary" disabled={loading} onClick={resetPasswordReq}>
              Request
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default resetPassword;
