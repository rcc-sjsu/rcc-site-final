import aboutStyles from "./(public)/home/about.module.css"
import missionStyles from "./(public)/home/mission.module.css"
import BackgroundGradient from "@/components/BackgroundGradient";
import Heading from "@/components/Heading";

export default function Home() {
  return (
    <div style={{overflow: "clip"}}>

      {/* About */}
      <section className={aboutStyles.container}>

        {/* Image and gradient container */}
        <div className={aboutStyles.imageContainer}> 

          <div className={aboutStyles.photo}>
            <img className={aboutStyles.lightbulbIcon} src="/home_icons/lightbulb.svg"/>
            <div className={aboutStyles.mozillaLogo}/>
            <img className={aboutStyles.smileyIcon} src="/home_icons/smiley-icon.svg"/>
          </div>
          <BackgroundGradient className={aboutStyles.gradient} color="purple"/>

        </div>

        <div className={aboutStyles.allText}>

          <Heading headingTag="h1"> Responsible Computing Club </Heading>

          <p className={aboutStyles.description}>
            The Responsible Computing Club (RCC) at SJSU, partnering with Mozilla, empowers students to shape the future of tech. 
            We unite students to explore the ethics of tech through hands-on, 
            cross-disciplinary projects. Together, we’re shaping a more responsible and inclusive future. Connect with us below!
          </p>

          <div className={aboutStyles.socialContainer}>

            <a href="">
              <img src="/home_icons/Instagram.svg"></img>
            </a>
            <a href="">
              <img src="/home_icons/LinkedIn.svg"></img>
            </a>
            <a href="">
              <img src="/home_icons/Mail.svg"></img>
            </a>
            <a href="">
              <img src="/home_icons/Discord.svg"></img>
            </a>

          </div>

        </div>

      </section>

      

      {/* Mission Statement */}
      <section className={missionStyles.section}>
        
        {/* Image and gradient container */}
        <div className={missionStyles.imageContainer}>
          
          <div className={missionStyles.photo}/>
          <BackgroundGradient className={missionStyles.gradient} color="purple"/>
        
        </div>  
      
        <div className={missionStyles.allText}>

          <Heading headingTag="h2"> Our Mission Statement </Heading>

          <p className={missionStyles.description}>
            RCC’s mission is to make responsible computing 
            <strong><em> relevant to everyone </em></strong> 
            and 
            <strong><em> applicable to their everyday lives</em></strong>, 
            no matter their background. In order to harness our mission of inviting 
            <strong><em> all majors </em></strong>
            (and minors) to hone their 
            <strong><em> collective strengths</em></strong>, we've created 
            <strong><em> dedicated teams </em></strong> focused on areas like workshops, consulting, marketing, web dev, and so much more! 
          </p>
          
        </div>

      </section>

    </div>

  );
}
