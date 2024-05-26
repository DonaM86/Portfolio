import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/skills.css"

const Skills = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSkills {
        nodes {
          contentful_id
          id
          node_locale
          category
          skills {
            category
            skills
          }
          spaceId
        }
      }
    }
  `)

  const skillsInfo = data.allContentfulSkills.nodes[0]

  return (
    <div
      className="container mx-auto my-20 py-10"
      style={{ marginTop: "4rem", marginBottom: "4rem", textAlign: "center" }}
    >
      <h2
        className="skill-title"
        style={{
          fontSize: "2.5rem",
          marginBottom: "2rem",
        }}
      >
        Skills
      </h2>
      <div className="grid grid-cols-2 gap-6 skill-section">
        {skillsInfo.skills.map((skill, index) => (
          <div
            key={index}
            className="skill-card"
            style={{
              backgroundColor: "#f3f4f6",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {" "}
            <h3
              className="skill-category"
              style={{ marginBottom: "1rem", fontWeight: "bolder" }}
            >
              {skill.category}
            </h3>
            <ul className="skill-list">
              {skill.skills.map((subSkill, subIndex) => (
                <li
                  key={subIndex}
                  className="skill-list-item"
                  style={{ fontWeight: "bolder" }}
                >
                  {subSkill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .skill-section {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Skills
