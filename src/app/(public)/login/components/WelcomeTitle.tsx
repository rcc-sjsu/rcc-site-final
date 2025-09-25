import React from 'react'
import Link from 'next/link'

const WelcomeTitle = () => {
  return (
    <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 lg:mb-6 text-center lg:text-left tracking-wider">
            WELCOME BACK!
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-14 lg:mb-20 text-center lg:text-left tracking-wider">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#470085] hover:underline font-semibold">
                Sign up
            </Link>
        </p>
    </div>
  )
}

export default WelcomeTitle