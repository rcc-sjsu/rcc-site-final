import { blogCardProps } from "./type";
import styles from "./BlogCard.module.css"

export default function BlogCard({ color, photoURL, title, author, date, summary, tag }:blogCardProps) {
  return  (
    <section
      style={{
        boxShadow: color == "red" ? "0px 4px 8px #9A0146" : color == "blue" ? "0px 4px 8px #3852AD" : "",
        border: color == "red" ? "2px solid #9A0146" : color == "blue" ? "2px solid #3852AD" : "",
      }} 
      className={styles.container}
    >

      {/* Photo, Title, Author, Date */}
      <div>

        <div style={{ backgroundImage: `url(${photoURL})` }} className={styles.photo}/>

        <div className={styles.blogDetails}>
        
          <p className={styles.blogTitle}>
            {title}
          </p>
          <p className={styles.blogAuthorship}>
            by {author} | {date}
          </p>

        </div>
          
      </div>

      {/* Summary */}
      <p className={styles.summary}>
        {summary}
      </p>
  
      {/* Tag */}
      <p 
        style={{ color: color == "red" ? "#9A0146" : color == "blue" ? "#3852AD" : "" }}
        className={styles.tag}
      >
        {tag}
      </p>
      
    </section>
  );
}