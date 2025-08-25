/*

  You need to include individual ProjectCard components in a flex parent in order
  to get the layout seen on the Figma

*/

import Divider from "../Divider";
import { projectProps } from "./type";
import styles from "./ProjectCard.module.css"

export default function ProjectCard({color, photoURL, projectName, projectURL, teamName, description, teamMembers}: projectProps) {
  return (

    <section 
      style={{
        boxShadow: color == "blue" ? "0px 4px 8px #3852AD" : color == "red" ? "0px 4px 8px #9A0146" : "",
        border: color == "blue" ? "2px solid #3852AD" : color == "red" ? "2px solid #9A0146" : ""
      }} 
      className={styles.container}
    >
      
      {/* Photo, Project Name, Team Name */}
      <div>
  
        <div
          style={{ backgroundColor: color == "blue" ? "#E2E8FD" : color == "red" ? "#F4DFF8" : "" }}
          className={styles.photoContainer}
        >
          <img className={styles.photo} src={photoURL}/>
        </div>

        <div className={styles.projectDetails}>
        
          <a href={projectURL} className={styles.projectName}>
            {projectName}
          </a>
          
          <h2 className={styles.teamName}>
            by {teamName}
          </h2>   

        </div>

        <p className={styles.description}>
          {description}
        </p>

      </div>
      
      {/* Divider and Team Members */}
      <div className={styles.teamContainer}>

        <Divider/>

        {/* Team Members */}
        <div className={styles.teammateContainer}>

          {Object.entries(teamMembers).map(([position, members]) => (

            <p key={position}>
              <strong >{position}: </strong>
              
              {/* Writing individual teammate names */}
              {Object.values(members).map((member, index) => (
                  <span key={index}>
                    <a  className={styles.teammate} href={member.linkedInURL} target="_blank" rel="noopener noreferrer">
                      {member.name}
                    </a>
                    {index < members.length - 1 && ", "}
                  </span>
              ))}

            </p>

          ))}
          
        </div>

      </div>
          
    </section>

  );
}
