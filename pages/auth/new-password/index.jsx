import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import ClipitLogoWhite from "@assets/imgs/ClipitLogoWhite.png";

const newPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const newPasswordReq = async () => {
    if (token) {
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/newPassword", {
          token,
          password,
        });
        if (res.data.success) {
          toast.success(
            "Password reset successful, redirecting to login page...",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          setTimeout(() => {
            router.push("/login");
          }, 4000);
        }
      } catch (error) {
        console.log(error);
        if (error.response?.data?.error) {
          toast.error(error.response?.data?.error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Verification token not found, redirecting to login page...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Clipit - New Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth_user new_password">
        <img className="logo-header" src={ClipitLogoWhite.src} alt="" />
        <div className="auth-wrapper fl_col gp20">
          <p className="p40 txt_white">New Password</p>
          <div className="fl_col gp20 ai_c light-input">
            <form className="fl_col gp5" action="">
              <div className="">
                <input
                  type="password"
                  name=""
                  id=""
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                />
              </div>
              <div>
                <input type="password" name="" id="" placeholder="Repeat Password" />
              </div>
            </form>
            <button className="btn btn-primary" disabled={loading} onClick={newPasswordReq}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default newPassword;
