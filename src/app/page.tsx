import styles from './page.module.css';
import Header from '../components/header/Header'; // Import the new Header component

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Render the Header component */}
      <Header />
      <main className={styles.pageContent}>
        {/* Put proper Router handling here*/}
        <h1>Welcome to the Home Page</h1>
        <p>This content will always take up the remaining vertical space on the page, thanks to flexbox!</p>
      </main>
    </div>
  );
}
