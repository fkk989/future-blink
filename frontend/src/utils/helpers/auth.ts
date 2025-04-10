import { SignUpData } from "../../components/pages/auth/Signup";
import { SetStateAction } from "react";
import { LoginData } from "../../components/pages/auth/Login";
import { sendOTP } from "./index";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import toast from "react-hot-toast";
import { LogedUser } from "../types";
import { NavigateFunction } from "react-router-dom";


interface HandleSubmit<T extends "signup" | "login"> {
  resetErrorState: () => void, formData: T extends "signup" ? SignUpData : LoginData,
  setShowOtpFrom: React.Dispatch<SetStateAction<boolean>>,
  setErrorState: React.Dispatch<SetStateAction<T extends "signup" ? SignUpData : LoginData>>
  updateUser?: (userData: LogedUser) => void
  navigate: NavigateFunction
}

export const handleSignup = async ({ resetErrorState, formData, setShowOtpFrom, setErrorState }: HandleSubmit<"signup">) => {
  resetErrorState();
  toast.loading("Signing up user", { id: "sign-up" })
  try {
    const response = (
      await axios.post(`${BACKEND_URL}/auth/signup`, formData)
    ).data;

    if (response.success) {
      await sendOTP(formData.email, formData.name, () => {
        setShowOtpFrom(true);
      });
      toast.success("Signed up successfully", { id: "sign-up" })
    }
    //
  } catch (error: any) {
    toast.error("Signed up successfully", { id: "sign-up" })
    console.log(error.response);
    if (error.response?.data?.errors) {
      setErrorState((pre) => ({ ...pre, ...error.response.data.errors }));
    } else {
      toast.error(error.response?.data.message);
    }
  }
};

export const handleLogin = async ({ navigate, resetErrorState, formData, setShowOtpFrom, setErrorState, updateUser }: HandleSubmit<"login">) => {
  resetErrorState();

  toast.loading("login in", { id: "log-in" })
  try {
    const response = (await axios.post(`${BACKEND_URL}/auth/login`, formData))
      .data;

    if (response.success) {
      //
      const { name, email, isVerified, role, id } = response.data.user
      // @ts-ignore
      updateUser({ name, email, isVerified, role, id })
      // 

      if (!response.data.user.isVerified) {
        // if user is not verified seding otp again
        await sendOTP(formData.email, response.data.user.name, () => {
          setShowOtpFrom(true);
        });
      } else {
        toast.success("loged In successfully", { id: "log-in" })
        // if user is verified 
        localStorage.setItem("user-token", response.token)
        navigate("/sequence")
      }
    }

  } catch (error: any) {
    toast.error("Error Loging In", { id: "log-in" })
    console.log("error: ", error.response);
    if (error.response?.data?.errors) {
      setErrorState((pre) => ({ ...pre, ...error.response.data.errors }));
    } else {
      toast.error(error.response?.message, { id: "log-in" });
    }
  }
};