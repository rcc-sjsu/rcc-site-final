import { ambassadorCardProps } from "./type";
import styles from "./AmbassadorCard.module.css"

export default function AmbassadorCard({ color, photoURL, name, role, date, summary, tag }:ambassadorCardProps) {
  return  (
    <section
      style={{
        boxShadow: color == "red" ? "0px 4px 8px #9A0146" : color == "blue" ? "0px 4px 8px #3852AD" : "",
        border: color == "red" ? "2px solid #9A0146" : color == "blue" ? "2px solid #3852AD" : "",
      }} 
      className={styles.container}
    >

      {/* Photo, Name, Role */}
      <div>

        <div style={{ backgroundImage: `url(${photoURL})` }} className={styles.photo}/>
        <div className={styles.ambassadorDetails}>
          <p className={styles.ambassadorName}>
            {name}
          </p>
          <p className={styles.ambassadorRole}>
            {role}
          </p>
        </div>
      </div>
      
    </section>
  );
}