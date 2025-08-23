// app/public/ambassadors/page.tsx
import React from 'react';
import styles from './page.module.css';
import AmbassadorCard from '../../../components/AmbassadorCard';

export default function AmbassadorsPage() {
  return (
    <main className={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Mozilla Student Ambassadors</h1>
      <br />
      <br />
      <h1 className={styles.teamName}>Executive Board</h1>
      <div className={styles.teamDescription}>
        The Executive Board oversees the organization's vision, strategy, and operations.
        They lead team coordination, manage partnerships, and ensure all initiatives align
        with RCC's mission and values!
      </div>

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
          color="blue"
          photoURL="../../../../headshots/executive-board/melanie-regalado-hernandez.jpg"
          name="Melanie Regalado Hernandez"
          role="Publicity Vice President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/anusha-damle.jpeg"
          name="Anusha Damle"
          role="Treasurer"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/kalyn-bui.png"
          name="Kalyn Bui"
          role="Secretary"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Workshops</h1>
      <div className={styles.teamDescription}>
        The Workshops Committee organizes and facilitates engaging sessions that teach
        ethical, inclusive, and sustainable computing practices, while fostering
        collaboration among students from all majors!
      </div>

      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/workshops/pranavi-kristipati.jpeg"
          name="Pranavi Kristipati"
          role="Workshops Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/workshops/jupjeet-rai.jpeg"
          name="Jupjeet Rai"
          role="Workshops Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Case</h1>
      <div className={styles.teamDescription}>
        The Case Competition Committee designs and hosts challenges that encourage 
        participants to solve real-world tech ethics problems, promoting critical
        thinking, teamwork, and responsible innovation.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/case/geeta-renavikar.jpeg"
          name="Geeta Renavikar"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/case/ashley-roman.jpeg"
          name="Ashley Roman"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/case/harsha-ramesh.jpeg"
          name="Harsha Ramesh"
          role="Case Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/case/eesha-maddali.png"
          name="Eesha Maddali"
          role="Case Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/case/pranavi-kristipati.jpeg"
          name="Pranavi Kristipati"
          role="Case Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Case</h1>
      <div className={styles.teamDescription}>
        The Consulting Committee finds mission-aligned clients—such as nonprofits
        and socially responsible organizations—and works on real-world tech projects
        that apply ethical, inclusive computing principles.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/consulting/glerys-gonzalez.jpeg"
          name="Glerys Gonzalez"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/consulting/samriddhi-matharu.jpeg"
          name="Samriddhi Matharu"
          role="Project Manager"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/surabhi-bage.png"
          name="Surabhi Bage"
          role="Consulting Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/lexine-asuncion.jpeg"
          name="Lexine Asuncion"
          role="Consulting Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Case</h1>
      <div className={styles.teamDescription}>
        The Industry Committee connects with professionals and companies to
        organize panels, speaker events, and networking opportunities that give
        members insight into how responsible computing is practiced across all industries.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/industry/madison-ammirati.jpeg"
          name="Madison Ammirati"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/industry/sumaiyah-alamgir.jpeg"
          name="Sumaiyah Alamgir"
          role="Industry Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/industry/yamini-karthik.jpeg"
          name="Yamini Karthik"
          role="Industry Ambassador"
        />
      </div>

    </main>
  );
}
