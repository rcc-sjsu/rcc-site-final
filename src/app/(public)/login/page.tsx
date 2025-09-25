"use server"

import LoginGraphic from "./components/LoginGraphic";
import WelcomeTitle from "./components/WelcomeTitle";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row font-sans mt-30 xs:mt-0 z-1">
      {/* Left Section: Form */}
      <div className="flex-1 flex flex-col items-center justify-center lg:w-1/2 lg:pl-10">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
          <WelcomeTitle/>
          <LoginForm/>
        </div>
      </div>

      <LoginGraphic/>
    </div>
  );
}
