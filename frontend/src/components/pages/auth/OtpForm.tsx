import { useState, FormEvent } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/constants";
import toast from "react-hot-toast";

export const inputStyle =
  "w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

export const OtpForm: React.FC<{ email: string; onSuccess: () => void }> = ({
  email,
  onSuccess,
}) => {
  //
  const [otp, setOtp] = useState("");

  const [errorState, setErrorState] = useState({
    otp: "",
  });
  //

  //

  const handleSubmit = async (e: FormEvent) => {
    setErrorState({ otp: "" });
    e.preventDefault();

    try {
      const response = (
        await axios.post(`${BACKEND_URL}/auth/verify-email`, { otp, email })
      ).data;

      if (response.success) {
        onSuccess();
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.data?.errors) {
        setErrorState((pre) => ({ ...pre, ...error.response.data.errors }));
      } else {
        toast.error(error.response?.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
      <div className="flex flex-col jus gap-[10px]">
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          placeholder="Enter your 6 digit OTP"
          className={inputStyle}
        />
        <div className="w-full flex justify-end">
          <div
            onClick={handleSubmit}
            className="h-[15px] text-blue-500 hover:text-blue-400 text-[18px] cursor-pointer"
          >
            send OTP
          </div>
        </div>
        {/* error div */}
        <div
          className={`${
            errorState.otp ? "text-[tomato]" : "text-black"
          } h-[20px]`}
        >
          {errorState.otp}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer mt-[5px]"
      >
        Submit
      </button>
    </form>
  );
};
