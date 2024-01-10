import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const resetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);

  const resetPasswordReq = async () => {
    if (email) {
      try {
        res = await axios.post("/api/auth/resetPassword", {
          email,
        });
      } catch (error) {
        console.log(error);
      }
      toast.info("If your email is valid an email will be sent");
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    }
  };

  return (
    <>
      <div>
        <form action="">
          <div>
            <label for=""></label>
            <input
              type="email"
              name=""
              id=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </form>
        <button onClick={resetPasswordReq}>Request</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default resetPassword;
