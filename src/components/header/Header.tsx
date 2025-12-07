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
    const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    
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
                <Link href="/">Home</Link>

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
                  <p>Ambassadorship</p>
                  <div/>
                </div>
                
                <Link href="/events">Events</Link>
              </div>

              {/* Ambassadorship Submenu */}
              {(isMobileAmbassClicked || isMobileHovered) && 
                <div 
                  className={mobileStyles.mobileSubMenu}
                  onMouseEnter={()=> setIsMobileHovered(true)}
                  onMouseLeave={()=> setIsMobileHovered(false)}
                >
                  <Link href="/ambassadors">Ambassadors</Link>
                  <Link href="/projects">Projects</Link>
                  <Link href="/industry">Industry</Link>
                  {/* <Link href="/industry">journalism</Link> */}
                </div>
              }

            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className={desktopStyles.desktopContainer}>

            {/* About Us, Ambassadorship, Events Menu */}
            <div className={desktopStyles.desktopMainMenu}>

              <Link href="/">Home</Link>

              <div className={desktopStyles.desktopAmbassadorship}
                
                onMouseEnter={()=> {
                  if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
                  setIsDesktopHovered(true)
                }}
                onMouseLeave={()=> {
                  // delay closing, so moving into submenu doesn't flicker-close
                  hoverCloseTimer.current = setTimeout(() => {
                    setIsDesktopHovered(false);
                  }, 150);
                }}
              >

                <p style={{textDecoration: isDesktopHovered ? "underline" : ""}}>Ambassadorship</p>
                <div/>
              
              </div>
              
              <Link href="/events">Events</Link>

            </div>

            {/* Ambassadorship Submenu */}
            {(isDesktopHovered) &&
              <div onClick={() => {
                setIsDesktopHovered(false) 
              }}
                onMouseEnter={() => {
                  if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
                  setIsDesktopHovered(true)
                }}
                onMouseLeave={() => {
                  hoverCloseTimer.current = setTimeout(() => {
                    setIsDesktopHovered(false);
                  }, 150);
                }}
                className={desktopStyles.desktopSubMenu}
              >
                
                {/* Ambassadors tab */}
                <Link href="/ambassadors" onClick={()=> setIsDesktopHovered(false)}>
                  <div/>
                  Ambassadors
                </Link>
                
                {/* Projects tab */}
                <Link href="/projects" onClick={()=> setIsDesktopHovered(false)}>
                  <div/>                  
                  Projects
                </Link>

                {/* Industry tab */}
                <Link href="/industry" onClick={()=> setIsDesktopHovered(false)}>
                  <div/>                  
                  Industry
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
        {(isDesktopHovered) &&
          <div className={desktopStyles.backgroundBlur}/>        
        }

      </>
    );

}