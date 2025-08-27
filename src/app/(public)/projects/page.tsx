import Image from 'next/image';
import Heading from '@/components/Heading';
import ProjectCard from '@/components/ProjectCard';
import Divider from '@/components/Divider';
import { projectProps } from '@/components/ProjectCard/type';
import styles from './page.module.css';
import BackgroundGradient from '@/components/BackgroundGradient';

/**
 * Projects Page Component
 * 
 * This page containes three main sections:
 * 1. Hero section with mission statement
 * 2. Portfolio section displaying project cards
 * 3. Interest form section with embedded Google form
 */
export default function ProjectsPage() {
  const sampleProjects: projectProps[] = [
    {
      color: "blue" as const,
      photoURL: "/mozilla-logo.png", 
      projectName: "Responsible Computing Club Website",
      projectURL: "#",
      teamName: "Web Development Committee",
      description: "The website you are on right now!",
      teamMembers: {
        "Project Manager": [
          { name: "Ynha Nguyen", linkedInURL: "https://www.linkedin.com/in/ynha-nguyen-74459a334/" }
        ],
        "Lead Ambassador": [
          { name: "Tyler Awender", linkedInURL: "https://www.linkedin.com/in/tylerawender/" }
        ],
        "Ambassadors": [
          { name: "Anton Clayton", linkedInURL: "https://www.linkedin.com/in/anton-clayton/" },
          { name: "Connie Ly", linkedInURL: "https://www.linkedin.com/in/conniely04/" },
          { name: "Preethi Mohan", linkedInURL: "https://www.linkedin.com/in/preethi-mohan-73331628a/" },
          { name: "Marl Jonson", linkedInURL: "https://www.linkedin.com/in/marl-jonson/" },
          { name: "Ashley Roman", linkedInURL: "https://www.linkedin.com/in/ashley-roman-sjsu/" }
        ]
      }
    },
    {
      color: "red" as const,
      photoURL: "/iw-logo.png", 
      projectName: "Inclusive World Website",
      projectURL: "#",
      teamName: "Inclusive World Intern Team",
      description: "Website for differently abled students to develop skills and abilities.",
      teamMembers: {
        "Project Manager": [
          { name: "Samriddhi Matharu", linkedInURL: "https://www.linkedin.com/in/samriddhi-matharu-827082235/" }
        ],
        "Operations": [
          { name: "Wilfredo Concepcion", linkedInURL: "https://www.linkedin.com/in/wlfrdoconc/" },
          { name: "Tyler Awendor", linkedInURL: "https://www.linkedin.com/in/tylerawender/" },
          { name: "Jaime Elepano", linkedInURL: "https://www.linkedin.com/in/jaime-elepano/?trk=people-guest_people_search-card" },
          { name: "Ashley Roman", linkedInURL: "https://www.linkedin.com/in/ashley-roman-sjsu/" }
        ],
        "Development Leads": [
          { name: "Mel Regalado-Hernandez", linkedInURL: "https://www.linkedin.com/in/melanie-regalado-hernandez/" },
          { name: "Bence Danko", linkedInURL: "https://www.linkedin.com/in/bence-jordan-danko/" },
        ],
        "Development Interns": [
          { name: "Shreyas Boyar", linkedInURL: "#" },
          { name: "Preethi Mohan", linkedInURL: "https://www.linkedin.com/in/preethi-mohan-73331628a/" },
          { name: "Abigail Acosta", linkedInURL: "https://www.linkedin.com/in/jan-abigail-acosta/" },
          { name: "Ynha Nguyen", linkedInURL: "https://www.linkedin.com/in/ynha-nguyen-74459a334/" },
          { name: "Matthew Bernard", linkedInURL: "https://www.linkedin.com/in/matthewbernard/" },
          { name: "Kenny Nguyen", linkedInURL: "https://www.linkedin.com/in/kennyiscool/" }
        ]
      }
    },
    {
      color: "blue" as const,
      photoURL: "/epa-logo.png", 
      projectName: "EPA ESA Website",
      projectURL: "#",
      teamName: "EPA ESA Intern Team",
      description: "An application that makes the Endangered Species Act (ESA) easier to access for farmers.",
      teamMembers: {
        "Project Manager": [
          { name: "Surabhi Bage", linkedInURL: "https://www.linkedin.com/in/surabhibage/" }
        ],
        "Full Stack": [
          { name: "Yuli Tatishchev", linkedInURL: "https://www.linkedin.com/in/yuri-tatishchev/" },
          { name: "Shakshi Sharma", linkedInURL: "https://www.linkedin.com/in/shakshi-sharma-aa5306213/" },
          { name: "Rupashi Bahl", linkedInURL: "https://www.linkedin.com/in/rupashibahl/" },
          { name: "Eric Nguyen", linkedInURL: "https://www.linkedin.com/in/eric-nguyen-089b7530a/" }
        ],
        "Machine Learning": [
          { name: "Dylan Matthews", linkedInURL: "https://www.linkedin.com/in/dylanmatthews0/" },
          { name: "Bhoomika Gupta", linkedInURL: "https://www.linkedin.com/in/bhoomikagupta44/" },
          { name: "Atharva Berde", linkedInURL: "https://www.linkedin.com/in/atharva-berde-24756b1ba/" }
        ],
        "User Research": [
          { name: "Madison Ammirati", linkedInURL: "https://www.linkedin.com/in/madison-ammirati/" },
          { name: "Pranavi Kristipati", linkedInURL: "https://www.linkedin.com/in/pranavikris/" },
          { name: "Shannon Lo", linkedInURL: "https://www.linkedin.com/in/shannon-yuhsin-lo/" }
        ]
      }
    }
  ];

  return (
    <div className={styles.container}>
      
      
      {/* <div className={styles.glowHero} aria-hidden /> */}

      <main id="main-content" className={styles.main}>
        
        {/* <div className={styles.glowPortfolio} aria-hidden /> */}

        {/* ProjectsHero Section */}
        <section className={styles.heroSection} aria-labelledby="projects-heading">
          <Heading
            headingTag="h1"
            align="center"
            logoPath="/lightbulb-sticker.svg"
            logoAlign="right"
            logoSize={6}
          >
            Projects
          </Heading>
          
          <div className={styles.heroGlowAndText}>
            
            <BackgroundGradient className={styles.glowHero} color="purple"/>

            <div className={styles.heroContent}>
              <div className={styles.textContent}>
                <p className={styles.missionText}>
                  RCC aims to spread its impact beyond the college campus; 
                  we've partnered with individuals and organizations — from 
                  senior scientists to non-profits — to create {' '}
                  <strong> projects with a real, tangible impact</strong> on our community.
                </p>
                
                <p className={styles.contactText}>
                <strong><em>Interested in collaborating? Reach out to us at{' '}
                  <a 
                    href="mailto:rccmozillaconsulting@gmail.com"
                    className={styles.emailLink}
                    aria-label="Email RCC for collaboration"
                  >
                    rccmozillaconsulting@gmail.com
                  </a>{' '}
                  or fill out{' '}
                  <a 
                    href="#interest-form" 
                    className={styles.formLink}
                    aria-label="Go to interest form section"
                  >
                    this interest form
                  </a>{' '}
                  to get in contact!</em></strong>
                </p>
              </div>
              
              <div className={styles.imageContainer}>
                <Image
                  src="/projects-heroimg.png"
                  alt="Students collaborating on a project"
                  width={315}
                  height={215}
                  className={styles.heroImage}
                  priority // Above the fold image
                />
              </div>
            </div>
          </div>
        </section>

        <hr />

        {/* Portfolio Section */}
        <section className={styles.portfolioSection} aria-labelledby="portfolio-heading">

          <Heading
            headingTag="h2"
            align="center"
          >
            Our Portfolio
          </Heading>
          
          <div className={styles.projectGlowAndGrid}>
            
            <BackgroundGradient className={styles.glowPortfolio} color="purple"/>

            <div 
              className={styles.projectGrid}
              role="grid"
              aria-label="Project portfolio grid"
            >
              {sampleProjects.map((project, index) => (
                <div 
                  key={index} 
                  role="gridcell"
                  className={styles.projectCardWrapper}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </section>

       
        <hr />

        {/* Interest Form Section */}
        <section 
          id="interest-form"
          className={styles.interestSection} 
          aria-labelledby="interest-heading"
        >
          <Heading
            headingTag="h2"
            align="left"
            logoPath="/shapes-sticker.svg"
            logoAlign="left"
            logoSize={6}
            customStyle={{ 
              marginBottom: '2rem',
            }}
          >
            Interest Form
          </Heading>
          
          <div className={styles.formContainer}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSftzzJxWcuwH7CupNY4Vnd11s2_YALM007D_f9iRG-e75-xnw/viewform?embedded=true"
              className={styles.googleForm}
              title="Partnership & Collaboration Inquiry Form"
              aria-label="Google Form for partnership and collaboration inquiries"
              loading="lazy" // Lazy load for performance
            >
              Loading form...
            </iframe>
            
            {/* Fallback link if iframe fails */}
            <noscript>
              <p className={styles.fallbackText}>
                If the form doesn't load, you can{' '}
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSftzzJxWcuwH7CupNY4Vnd11s2_YALM007D_f9iRG-e75-xnw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.formLink}
                >
                  open it in a new tab
                </a>
                .
              </p>
            </noscript>
          </div>
        </section>
      </main>
    </div>
  );
}
