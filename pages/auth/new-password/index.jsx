import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const newPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const newPasswordReq = async () => {
    if (token) {
      try {
        res = await axios.post("/api/auth/newPassword", {
          token,
          password,
        });
        if (res.status === 200) {
          toast.success(
            "Password reset successful, redirecting to login page..."
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
      }
    }
  };

  return (
    <>
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
        <button onClick={newPasswordReq}>Confirm</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default newPassword;
