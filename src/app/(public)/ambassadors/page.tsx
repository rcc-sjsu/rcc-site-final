// app/public/ambassadors/page.tsx
import React from 'react';
import styles from './page.module.css';
import AmbassadorCard from '../../../components/AmbassadorCard';

export default function AmbassadorsPage() {
  return (
    <main className={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Mozilla Student Ambassadors</h1>
      <div style={{ fontSize: '1.075rem', textAlign: 'center' }}>
        The Mozilla Student Ambassadorship Program at RCC empowers students to take the
        lead in shaping the future of ethical technology. Ambassadors work closely with
        Mozilla and RCC to spark campus-wide conversations on responsible computing!
        <br/>
        <br/>
          Want to get involved? Reach out to us
          at <a href="mailto:rcc.sjsu@gmail.com">rcc.sjsu@gmail.com</a> or follow
          us <a href="https://www.instagram.com/rcc.sjsu/">@rcc.sjsu</a> on Instagram to learn more!
        <br/>
        <br/>
        Our Committees:
      </div>
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
      <h1 className={styles.teamName}>Industry</h1>
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

      <br />
      <br />
      <h1 className={styles.teamName}>Web Development</h1>
      <div className={styles.teamDescription}>
        The Web Development committee designs and maintains ethical, accessible,
        and user-friendly websites that support the club's mission and initiatives.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/web-dev/ashley-roman.jpeg"
          name="Ashley Roman"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/anton-clayton.jpeg"
          name="Anton Clayton"
          role="Web Dev Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/connie-ly.jpeg"
          name="Connie Ly"
          role="Web Dev Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/preethi-mohan.jpeg"
          name="Preethi Mohan"
          role="Web Dev Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/marl-jonson.jpeg"
          name="Marl Jonson"
          role="Web Dev Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/matthew-bernard.png"
          name="Matthew Bernard"
          role="Web Dev Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Membership Outreach</h1>
      <div className={styles.teamDescription}>
        The Membership Outreach committee promotes community engagement by recruiting
        new members, organizing social events, and fostering an inclusive community
        aligned with RCC's values.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/membership-outreach/zara-rahim.png"
          name="Zara Rahim"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/membership-outreach/izabella-doser.jpg"
          name="Izabella Doser"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/membership-outreach/shravya-vinjamuri.jpeg"
          name="Shravya Vinjamuri"
          role="Membership Outreach Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/membership-outreach/updesh-sachdeva.jpeg"
          name="Updesh Sachdeva"
          role="Membership Outreach Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Marketing</h1>
      <div className={styles.teamDescription}>
        The Marketing Committee promotes the Responsible Computing Club through
        two sub-teams: Digital Marketing, which manages online content and outreach,
        and Graphic Design, which creates visual materials to support the club's initiatives!
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/marketing/melanie-regalado-hernandez.jpg"
          name="Melanie Regalado Hernandez"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/marketing/bhoomika-gupta.jpg"
          name="Bhoomika Gupta"
          role="Lead Ambassador"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/jennifer-lucero.jpeg"
          name="Jennifer Lucero"
          role="Digital Marketing Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/zara-raza.jpeg"
          name="Zara Raza"
          role="Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/saahi-madras-sivakumar.jpeg"
          name="Saahi Madras Sivakumar"
          role="Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/marc-mcdaniel.jpeg"
          name="Marc McDaniel"
          role="Digital Marketing Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/ryan-nikopour.jpeg"
          name="Ryan Nikopour"
          role="Graphic Design Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/chris-le.png"
          name="Chris Le"
          role="Graphic Design Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Journalism</h1>
      <div className={styles.teamDescription}>
        The Journalism Committee highlights RCC's initiatives by promoting awareness
        of responsible computing through event recaps and regularly published blogs
        on the Mozilla Foundation platform.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/journalism/jan-abigail-acosta.jpeg"
          name="Jan Abigail Acosta"
          role="Journalism Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/journalism/harika-chandrasekhar.jpeg"
          name="Harika Chandrasekhar"
          role="Journalism Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/journalism/jupjeet-rai.jpeg"
          name="Jupjeet Rai"
          role="Journalism Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Growth Analytics</h1>
      <div className={styles.teamDescription}>
        The Growth Analytics Committee tracks and analyzes RCC's engagement data,
        designs surveys for feedback, and creates visual summaries to inform and
        improve club outreach and events.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/growth-analytics/asmita-dulla.jpeg"
          name="Asmita Dulla"
          role="Lead Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/growth-analytics/sonya-sorkin.jpeg"
          name="Sonya Sorkin"
          role="Growth Analytics Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Finance</h1>
      <div className={styles.teamDescription}>
        The Finance Committee supports RCC by organizing fundraisers, applying for grants,
        and assisting the treasurer with reimbursements and expense tracking.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/finance/anusha-damle.jpeg"
          name="Anusha Damle"
          role="Lead Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/finance/dhwanil-ranpura.jpeg"
          name="Dhwanil Ranpura"
          role="Finance Ambassador"
        />
      </div>

    </main>
  );
}
