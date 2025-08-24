import { headingProps } from "./type";
import styles from "./Heading.module.css"
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
        <img 
          src={logoPath}
          className={styles.logo}
          style={{ 
            height: logoSize + "rem", 
          }}    
        />
      }
      
      <div
       className={styles.heading}
      >
        {children}
      </div>

      {/* Right-aligned logo */}
      {logoPath && logoAlign=="right" && logoSize &&
        <img 
          src={logoPath} 
          className={styles.logo}
          style={{ 
            width: logoSize + "rem", 
          }}
        />
      }
    
    </HeadingTag>
  );
}