"use client";
import { useState } from "react";
import { login } from "../../../utils/authUtils/authActions";
import styles from "../LoginPage.module.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <form action={login} className="flex flex-col gap-3">
      {/* Email Input */}
      <p className="font-bold text-lg sm:text-xl tracking-widest">Email</p>
      <div className={styles["signup-input-container"]}>
        <input
          type="email"
          name="email"
          placeholder="rcc.sjsu@gmail.com"
          className={`${styles["signup-input"]} py-2 px-3 text-sm sm:py-2 sm:px-4 sm:text-base md:py-3 md:px-5 md:text-lg`}
          required
        />
      </div>

      {/* Password Input */}
      <p className="font-bold text-lg sm:text-xl tracking-widest">Password</p>
      <div className={styles["signup-input-container"]}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="password"
          className={`${styles["signup-input"]} py-2 px-3 text-base sm:py-2 sm:px-4 sm:text-lg md:py-3 md:px-5 md:text-xl`}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <VisibilityIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-900 mb-3 mr-1 z-5" />
          ) : (
            <VisibilityOffIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-900 mb-3 mr-1 z-5" />
          )}
        </button>
      </div>

      {/* Forget Password Link */}
      <div className="text-center mt-2 sm:mt-3 mb-2">
        <a
          href="#"
          className="text-[#470085] hover:underline font-semibold text-sm md:text-base lg:text-lg tracking-wider"
        >
          Forget password?
        </a>
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles["sign-up-button"]}>
        Sign In
      </button>
    </form>
  );
}
