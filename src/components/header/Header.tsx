"use client"

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import mobileStyles from './mobileHeader.module.css'
import desktopStyles from "./desktopHeader.module.css"


export default function Header() {

    // Mobile Click and Hover listeners
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
    const [isMobileHovered, setIsMobileHovered] = useState(false)
    const [isMobileAmbassClicked, setIsMobileAmbassClicked] = useState(false)

    // Desktop Click and Hover listeners
    const [isDesktopHovered, setIsDesktopHovered] = useState(false)
    const [isDesktopAmbassadorshipClicked, setIsDesktopAmbassadorshipClicked] = useState(false)

    
  const clickRef = useRef<HTMLElement>(null)

  useEffect(() => {
  
    const handleOutsideClick = (event: MouseEvent) => {
      if (clickRef.current && !clickRef.current.contains(event.target as Node)) {
        setIsHamburgerClicked(false)
        setIsMobileHovered(false)
        setIsMobileAmbassClicked(false)
        setIsDesktopHovered(false)
        setIsDesktopAmbassadorshipClicked(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }

  })

    return (
      <>      
        <header ref={clickRef} className={desktopStyles.header}>

          {/* Mobile Menu */}
          <div className={mobileStyles.mobileContainer}>

            {/* Navbar Hamburger Button */}
            <button type="button" onClick={() => !isHamburgerClicked ? setIsHamburgerClicked(true) : setIsHamburgerClicked(false)}>
              <img src="/header/Hamburger_icon.svg"/>
            </button>

            <div style={{display: isHamburgerClicked ? "flex" : "none"}}>

              {/* About Us, Ambassadorship, Events Menu */}
              <div 
              className={mobileStyles.mobileMainMenu}
              >
                <Link href="/">home</Link>

                <div 
                  onMouseEnter={()=> setIsMobileHovered(true)}
                  onMouseLeave={()=> setIsMobileHovered(false)}
                  onClick={() => {
                    if (!isMobileAmbassClicked) {
                      setIsMobileAmbassClicked(true)
                    } 
                    else {
                      setIsMobileAmbassClicked(false)
                      setIsMobileHovered(false)
                    } 
                  }}
                  className={mobileStyles.mobileAmbassadorship}
                  style={{backgroundColor: isMobileHovered || isMobileAmbassClicked ? "oklch(92.8% 0.006 264.531)" : ""}}
                >
                  <p>ambassadorship</p>
                  <div/>
                </div>
                
                <Link href="/events">events</Link>
              </div>

              {/* Ambassadorship Submenu */}
              {(isMobileAmbassClicked || isMobileHovered) && 
                <div 
                  className={mobileStyles.mobileSubMenu}
                  onMouseEnter={()=> setIsMobileHovered(true)}
                  onMouseLeave={()=> setIsMobileHovered(false)}
                >
                  <Link href="/ambassadors">ambassadors</Link>
                  <Link href="/projects">projects</Link>
                  <Link href="/industry">industry</Link>
                  {/* <Link href="/industry">journalism</Link> */}
                </div>
              }

            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className={desktopStyles.desktopContainer}>

            {/* About Us, Ambassadorship, Events Menu */}
            <div className={desktopStyles.desktopMainMenu}>

              <Link href="/">home</Link>

              <div className={desktopStyles.desktopAmbassadorship}
                onClick={() => {
                  if (isDesktopAmbassadorshipClicked) {
                    setIsDesktopAmbassadorshipClicked(false)
                    setIsDesktopHovered(false)
                   }
                   else { 
                    setIsDesktopAmbassadorshipClicked(true)                   
                  }
                }}
                onMouseEnter={()=> setIsDesktopHovered(true)}
                onMouseLeave={()=> setIsDesktopHovered(false)}
              >

                <p style={{textDecoration: isDesktopAmbassadorshipClicked || isDesktopHovered ? "underline" : ""}}>ambassadorship</p>
                <div/>
              
              </div>
              
              <Link href="/events">events</Link>

            </div>

            {/* Ambassadorship Submenu */}
            {(isDesktopHovered || isDesktopAmbassadorshipClicked) &&
              <div 
                onMouseEnter={() => setIsDesktopHovered(true)}
                onMouseLeave={() => setIsDesktopHovered(false)}
                className={desktopStyles.desktopSubMenu}
              >
                
                {/* Ambassadors tab */}
                <Link href="/ambassadors">
                  <div/>
                  ambassadors
                </Link>
                
                {/* Projects tab */}
                <Link href="/projects">
                  <div/>                  
                  projects
                </Link>

                {/* Industry tab */}
                <Link href="/industry">
                  <div/>                  
                  industry
                </Link>

                {/* Journalism tab */}
                {/* <Link href="/" 
                  onMouseEnter={()=> setIsDesktopJournalismHovered(true)}
                  onMouseLeave={()=> setIsDesktopJournalismHovered(false)}
                >
                  <div style={{visibility: isDesktopJournalismHovered ? "visible" : "hidden"}}/>                  
                  journalism
                </Link> */}
                
              </div>
            } 
            
          </div>

        </header>

        {/* Background blur when Ambassadorship tab is open */}
        {(isDesktopHovered || isDesktopAmbassadorshipClicked) &&
          <div className={desktopStyles.backgroundBlur}/>        
        }

      </>
    );

}