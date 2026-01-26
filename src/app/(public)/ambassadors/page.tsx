// app/public/ambassadors/page.tsx
import React from 'react';
import styles from './page.module.css';
import AmbassadorCard from './components';

export default function AmbassadorsPage() {
  return (
    <main className={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Mozilla Student Ambassadors</h1>
      <div style={{ fontSize: '1.075rem', textAlign: 'center' }}>
        <br />
        <br />
        The Mozilla Student Ambassadorship Program at RCC empowers students to take the
        lead in shaping the future of ethical technology. Ambassadors work closely with
        Mozilla and RCC to spark campus-wide conversations on responsible computing!
        <br />
        <br />
        Want to get involved? Reach out to us
        at <a href="mailto:rcc.sjsu@gmail.com">rcc.sjsu@gmail.com</a> or follow
        us <a href="https://www.instagram.com/rcc.sjsu/">@rcc.sjsu</a> on Instagram to learn more!
        <br />
        <br />
        Last updated: January 26, 2026
        <br />
        <br />
        <br />
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
          photoURL="../../../../headshots/executive-board/julia-husainzada.jpg"
          name="Julia Husainzada"
          role="President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/hodo-abdulkarim.jpg"
          name="Hodo Abdulkarim"
          role="External Vice President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/pouya-anvari.png"
          name="Pouya Anvari"
          role="Internal Vice President"
        />
      </div>

      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/placeholder.png"
          name="Crystal Doan"
          role="Publicity Vice President"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/placeholder.png"
          name="TBA"
          role="Treasurer"
        />

        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/executive-board/verafaith-delrio.jpg"
          name="Vera Faith Del Rio"
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
          color="blue"
          photoURL="../../../../headshots/workshops/jupjeet-rai.jpeg"
          name="Jupjeet Rai"
          role="Lead Workshops Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/workshops/pranavi-kristipati.jpg"
          name="Pranavi Kristipati"
          role="Workshops Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/workshops/hrishikesh-giri.jpg"
          name="Hrishikesh Giri"
          role="Workshops Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/workshops/devarsh-shroff.jpg"
          name="Devarsh Shroff"
          role="Workshops Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/workshops/pearl-shah.jpg"
          name="Pearl Shah"
          role="Workshops Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/workshops/aysha-mujeeb.jpg"
          name="Aysha Mujeeb"
          role="Workshops Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/workshops/madiha-fatima.jpg"
          name="Madiha Fatima"
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
          photoURL="../../../../headshots/case/geeta-renavikar.jpg"
          name="Geeta Renavikar"
          role="Lead Case Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/case/harsha-ramesh.jpg"
          name="Harsha Ramesh"
          role="Case Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/case/eesha-maddali.png"
          name="Eesha Maddali"
          role="Case Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/case/pranavi-kristipati.jpg"
          name="Pranavi Kristipati"
          role="Case Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Consulting</h1>
      <div className={styles.teamDescription}>
        The Consulting Committee finds mission-aligned clients—such as nonprofits
        and socially responsible organizations—and works on real-world tech projects
        that apply ethical, inclusive computing principles.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/consulting/samriddhi-matharu.jpg"
          name="Samriddhi Matharu"
          role="Lead Consulting Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/consulting/sherine-aldrin.png"
          name="Sherine Aldrin"
          role="Lead Consulting Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/surabhi-bage.jpg"
          name="Surabhi Bage"
          role="Consulting Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/lexine-asuncion.jpg"
          name="Lexine Asuncion"
          role="Consulting Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/sowmika-yeturu.jpg"
          name="Sowmika Yeturu"
          role="Consulting Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/tejesh-remuduru.png"
          name="Tejesh Remuduru"
          role="Consulting Ambassador, Engineering"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/natalie-tran.png"
          name="Natalie Tran"
          role="Consulting Ambassador, Engineering"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/nancy-kanda.png"
          name="Nancy Kanda"
          role="Consulting Ambassador, Data"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/marc-mcdaniel.jpg"
          name="Marc McDaniel"
          role="Consulting Ambassador, Marketing"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/consulting/yug-more.png"
          name="Yug More"
          role="Consulting Ambassador, Business Strategy"
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
          photoURL="../../../../headshots/industry/yuwen-zhang.jpg"
          name="Yuwen Zhang"
          role="Lead Industry Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/industry/sumaiyah-alamgir.png"
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
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/industry/harshitha-venkateswaran.jpg"
          name="Harshitha Venkateswaran"
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
          photoURL="../../../../headshots/web-dev/shareen-rodrigues.jpg"
          name="Shareen Rodrigues"
          role="Lead Web Dev Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/web-dev/eesha-maddali.png"
          name="Eesha Maddali"
          role="Lead Web Dev Ambassador"
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
          photoURL="../../../../headshots/web-dev/preethi-mohan.jpg"
          name="Preethi Mohan"
          role="Web Dev Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/marl-jonson.jpg"
          name="Marl Jonson"
          role="Web Dev Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/matthew-bernard.jpg"
          name="Matthew Bernard"
          role="Web Dev Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/emily-thach.jpg"
          name="Emily Thach"
          role="Web Dev Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/caleb-fringer.png"
          name="Caleb Fringer"
          role="Web Dev Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/web-dev/alvin-tran.jpg"
          name="Alvin Tran"
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
          photoURL="../../../../headshots/membership-outreach/zara-rahim.jpg"
          name="Zara Rahim"
          role="Lead Membership Outreach Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/membership-outreach/izabella-doser.jpg"
          name="Izabella Doser"
          role="Lead Membership Outreach Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/membership-outreach/updesh-sachdeva.jpg"
          name="Updesh Sachdeva"
          role="Membership Outreach Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/membership-outreach/tabassum-zahir.jpg"
          name="Tabassum Zahir"
          role="Membership Outreach Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/placeholder.png"
          name="Mariam Jamil"
          role="Membership Outreach Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/membership-outreach/don-dang.jpg"
          name="Don Dang"
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
          photoURL="../../../../headshots/marketing/bhoomika-gupta.jpg"
          name="Bhoomika Gupta"
          role="Lead Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/jennifer-lucero.jpg"
          name="Jennifer Lucero"
          role="Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/zara-raza.jpg"
          name="Zara Raza"
          role="Digital Marketing Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/saahi-madras-sivakumar.jpeg"
          name="Saahi Madras Sivakumar"
          role="Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/marc-mcdaniel.jpg"
          name="Marc McDaniel"
          role="Digital Marketing Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/alice-wu.jpg"
          name="Alice Wu"
          role="Digital Marketing Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/shanglong-chen.png"
          name="Shanglong Chen"
          role="Lead Graphic Design Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/chris-le.jpg"
          name="Chris Le"
          role="Graphic Design Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/madelyn-whitney.jpg"
          name="Madelyn Whitney"
          role="Graphic Design Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/vy-ho.jpg"
          name='Vy "Evie" Ho'
          role="Graphic Design Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/marisa-quinones.png"
          name="Marisa Quinones"
          role="Graphic Design Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/marketing/selina-mei.png"
          name="Selina Mei"
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
          photoURL="../../../../headshots/placeholder.png"
          name="TBA"
          role="Lead Journalism Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/placeholder.png"
          name="Trisha Subramanian"
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
          photoURL="../../../../headshots/growth-analytics/asmita-dulla.jpg"
          name="Asmita Dulla"
          role="Lead Growth Analytics Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/growth-analytics/zainab-shaikh.jpg"
          name="Zainab Shaikh"
          role="Growth Analytics Ambassador"
        />
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/growth-analytics/vani-sethi.jpg"
          name="Vani Sethi"
          role="Growth Analytics Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="red"
          photoURL="../../../../headshots/placeholder.png"
          name="Keya Chaudhari"
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
          color="blue"
          photoURL="../../../../headshots/placeholder.png"
          name="TBA"
          role="Lead Finance Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/finance/dhwanil-ranpura.jpg"
          name="Dhwanil Ranpura"
          role="Finance Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Project Group</h1>
      <div className={styles.teamDescription}>
        The Project Group Committee supports RCC by guiding student project teams
        through the full lifecycle of RCC's semester project program. They support
        project scoping, weekly execution, and final presentations.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/project-group/amishi-seth.png"
          name="Amishi Seth"
          role="Lead Project Group Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/project-group/siddarth-shekhar.png"
          name="Siddarth Shekhar"
          role="Lead Project Group Ambassador"
        />
      </div>
      
      <br />
      <br />
      <h1 className={styles.teamName}>Research & Documentation</h1>
      <div className={styles.teamDescription}>
        The Research & Documentation Committee supports RCC by managing RCC's
        data collection, impact tracking, and archival documentation. This role
        helps organize information for grants, partnerships, and program evaluation.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/shubh-rawal.png"
          name="Shubh Rawal"
          role="Lead Research & Documentation Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/akash-karthik.png"
          name="Akash Karthik"
          role="Lead Research & Documentation Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/ashton-moraes.png"
          name="Ashton Moraes"
          role="Research & Documentation Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/shravya-parampalli.png"
          name="Shravya Parampalli"
          role="Research & Documentation Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/placeholder.png"
          name="Ashley Chen"
          role="Research & Documentation Ambassador"
        />
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/phuong-hua.png"
          name="Phuong Hua"
          role="Research & Documentation Ambassador"
        />
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/rnd/bhavya-vatsavayi.png"
          name="Bhavya Vatsavayi"
          role="Research & Documentation Ambassador"
        />
      </div>

      <br />
      <br />
      <h1 className={styles.teamName}>Research & Documentation</h1>
      <div className={styles.teamDescription}>
        The Risk Management Committee supports RCC's safety, compliance,
        and ethical standards by reviewing event proposals, identifying risks,
        and ensuring alignment with university guidelines and the RCC Constitution.
      </div>
      <div className={styles.ambassadorCards}>
        <AmbassadorCard
          color="blue"
          photoURL="../../../../headshots/risk-management/tekhum-sultanali.png"
          name="Tekhum Sultanali"
          role="Lead Risk Management Ambassador"
        />
      </div>

    </main>
  );
}
