import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";

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
      <div>
        <form action="">
          <div>
            <label for=""></label>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label for=""></label>
            <input type="password" name="" id="" />
          </div>
        </form>
        <button disabled={loading} onClick={newPasswordReq}>
          Confirm
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default newPassword;
