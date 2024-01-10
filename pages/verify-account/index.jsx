import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const verifyAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const newVerification = async () => {
    if (token) {
      try {
        res = await axios.post("/api/auth/newVerification", { token });
        if (res.status === 200) {
          router.push("/login");
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
        <button onClick={newVerification}>verify account</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default verifyAccount;
