import { headingProps } from "./type";
import styles from "./Heading.module.css"

export default function Heading({children, customStyle, align, logoPath, logoAlign, logoSize}: headingProps) {
  
  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-zilla-slab)",
    fontSize: "4.5rem",
    justifyContent: align == "left" ? "left" : "center",
    display: "flex",
    gap: "1rem",
    fontWeight: "bold",
    lineHeight: "5rem",
    color: "#470085"
  } 

  const combinedStyle = {
    ...h1Style,
    ...customStyle
  }
  
  return (
    <h1 
      style={combinedStyle}
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
    
    </h1>
  );
}