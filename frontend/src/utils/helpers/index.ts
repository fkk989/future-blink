import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export async function sendOTP(email: string, name: string, onSuccess: () => void) {
  try {
    toast.loading("Sending OTP", { id: "email-verification" });
    const res = (await axios.post(`${BACKEND_URL}/auth/send-otp`, { name, email })).data

    if (res.success) {
      toast.success("otp sent successfully", { id: "email-verification" })
      onSuccess()
    }
  } catch (error: any) {

    if (error.response?.data.message) {
      toast.error(error.response?.data.message, { id: "email-verification" })
    } else {
      toast.error(error?.message, { id: "email-verification" })
      console.log(error?.message)
    }
  }
}

export function getUserToke() {
  return localStorage.getItem("user-token")
}



