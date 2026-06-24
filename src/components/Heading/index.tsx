import { headingProps } from "./type";
import styles from "./Heading.module.css"
import Image from "next/image";
import { JSX } from "react";

export default function Heading({headingTag, className, children, align, logoPath, logoAlign, logoSize}: headingProps) {
  
  const HeadingTag = headingTag as keyof JSX.IntrinsicElements

  return (
    <HeadingTag 
      style={{justifyContent: align == "left" ? "left" : "center"}}
      className={`${styles.heading} ${className}`}
    >

      {/* Left-aligned logo */}
      {logoPath && logoAlign=="left" && logoSize &&
        <Image
          src={logoPath}
          className={styles.logo}
          style={{ 
            height: logoSize + "rem", 
          }}    
          alt=""
        />
      }
      
      <div
       className={styles.heading}
      >
        {children}
      </div>

      {/* Right-aligned logo */}
      {logoPath && logoAlign=="right" && logoSize &&
        <Image
          src={logoPath} 
          className={styles.logo}
          alt=""
          style={{ 
            width: logoSize + "rem", 
          }}
        />
      }
    
    </HeadingTag>
  );
}