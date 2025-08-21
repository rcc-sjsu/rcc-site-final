import { dividerProps } from "./type";
import styles from "./Divider.module.css"


export default function Divider({size, align}: dividerProps) {
  return (
    <div className={styles.dividerContainer}>
      <hr 
      style={{
        width: size ? size + "%" : "100%",
        margin: align == "left" ? "auto auto auto 0" : "auto"
      }}
      className={styles.divider}
      />
    </div>
  );
}
