import { useState, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ClosedEye, OpenEye } from "../../logos/eye";
import { OtpForm } from "./OtpForm";
import { handleLogin } from "../../../utils/helpers/auth";
import { LogedUser } from "../../../utils/types";
import { useUser } from "../../../context/UserContext";

export interface LoginData {
  email: string;
  password: string;
}

export const inputStyle =
  "w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function LoginForm() {
  //
  const navigate = useNavigate();
  //
  const { setUser } = useUser();
  const updateUser = (userData: LogedUser) => {
    setUser(userData);
  };

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOtpFrom, setShowOtpFrom] = useState(false);

  const [errorState, setErrorState] = useState({
    email: "",
    password: "",
  });
  //
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //
  const resetErrorState = useCallback(() => {
    setErrorState({
      email: "",
      password: "",
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[600px]  p-[40px] bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showOtpFrom ? "Enter you OTP" : "Login"}
        </h2>
        {showOtpFrom ? (
          <OtpForm
            email={formData.email}
            onSuccess={() => {
              navigate("/sequence");
            }}
          />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin({
                resetErrorState,
                formData,
                setShowOtpFrom,
                setErrorState,
                updateUser,
                navigate,
              });
            }}
            className="flex flex-col gap-[10px]"
          >
            {/* email input */}
            <div className="flex flex-col gap-[10px]">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputStyle}
              />
              {/* error div */}
              <div
                className={`${
                  errorState.email ? "text-[tomato]" : "text-black"
                } h-[20px]`}
              >
                {errorState.email}
              </div>
            </div>
            {/* password input */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[5px]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={inputStyle}
                />
                {showPassword ? (
                  <ClosedEye
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <OpenEye
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
              {/* error div */}
              <div
                className={`${
                  errorState.password ? "text-[tomato]" : "text-black"
                } h-[20px]`}
              >
                {errorState.password}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer mt-[5px]"
            >
              Sign up
            </button>
          </form>
        )}
        <div
          className="flex justify-end items-center mt-[5px] cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          {!showOtpFrom && (
            <div className="flex gap-[5px]">
              Dont have an account ?{" "}
              <p className="text-blue-500 hover:text-blue-400">Sign up</p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
