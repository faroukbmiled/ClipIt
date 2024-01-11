import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import ClipitLogoWhite from "@assets/imgs/ClipitLogoWhite.png";

const verifyAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const newVerification = async () => {
    if (token) {
      try {
        setLoading(true);
        const res = await axios.post("/api/auth/newVerification", { token });
        if (res.data.success) {
          toast.success(
            "Verification successful, redirecting to login page...",
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
        <title>Clipit - Verify Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth_user">
        <img className="logo-header" src={ClipitLogoWhite.src} alt="" />
        <div className="fl_col ai_c gp20">
          <p className="p12 txt_center txt_white">Kindly verify your account to <br />complete your account registration.</p>
          <button className="btn btn-primary" disabled={loading} onClick={newVerification}>
            verify account
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default verifyAccount;
