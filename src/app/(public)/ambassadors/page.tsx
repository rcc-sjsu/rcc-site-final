// app/public/ambassadors/page.tsx
import React from 'react';
import styles from './page.module.css';
import AmbassadorCard from '../../../components/AmbassadorCard';

export default function AmbassadorsPage() {
  return (
    <main className={styles.container}>
      <h1>Meet Our Ambassadors</h1>
      <br />
      <h1>Executive Board</h1>
      <div>The Executive Board oversees the organization's vision, strategy, and operations.
        They lead team coordination, manage partnerships, and ensure all initiatives align
        with RCC's mission and values!
      </div>
      <br />
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/executive-board/julia-husainzada.jpeg"
          name="Julia Husainzada"
          role="President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/shannon-lo.jpg"
          name="Shannon Lo"
          role="External Vice President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/emily-leson.jpeg"
          name="Emily Leson"
          role="Internal Vice President"
        />
      </div>
      
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/executive-board/melanie-regalado-hernandez.jpg"
          name="Melanie Regalado Hernandez"
          role="President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/anusha-damle.jpeg"
          name="Anusha Damle"
          role="Treasurer"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/kalyn-bui.jpeg"
          name="Kalyn Bui"
          role="Secretary"
        />
      </div>
    </main>
  );
}
