import React from 'react'
import Image from "next/image";
import styles from "../LoginPage.module.css";

const LoginGraphic = () => {
  return (
    <div className="flex flex-1">
        {/* Right Section: Image */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden z-5">
        <Image
          src="/images/login/LoginGraphic.png"
          alt="Requirements Steps"
          layout="responsive"
          width={800}
          height={970}
          className={`${styles["signup-graphic-shadow"]} relative z-10 max-w-full lg:max-w-[80%] xl:max-w-[65%] h-auto rounded-lg lg:mt-20 lg:mr-0 xl:mb-20 xl:mr-10`}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/5 -translate-y-2/5
                   w-[80vw] h-[50vh] xl:w-[60vw] xl:h-[70vh]
                   rounded-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600
                   opacity-25 blur-[200px] z-0 hidden lg:block"
      />
    </div>
  )
}

export default LoginGraphic