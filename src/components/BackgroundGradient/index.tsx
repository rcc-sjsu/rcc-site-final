import { gradientProps } from "./type";
import styles from "./BackgroundGradient.module.css"

export default function BackgroundGradient({className, color}: gradientProps) {
  
  return (
    
    <div
    className={`${className} ${styles.gradientContainer}`}
    >
      <div
        className={styles.gradient}
        style={{
          backgroundColor: color == "blue" ? "#E2E8FD" : "#DEB8FE",
          opacity: color == "blue" ? "1" : "0.6",
        }}
      />
    </div>

  );
}
