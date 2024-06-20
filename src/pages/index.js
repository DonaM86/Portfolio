import React from "react"
import Layout from "../components/layout"
import Header from "../components/header"
import { Link, graphql } from "gatsby"
import Skills from "../components/skills"
import { GatsbyImage } from "gatsby-plugin-image"

const pageStyles = {
  color: "#564154",
  fontFamily: "'Cormorant Garamond', serif",
  marginTop: "20px",
  marginBottom: "50px",
}

const projectsWrapperStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
}

const projectContainerStyles = {
  width: "350px",
  boxSizing: "border-box",
  textAlign: "center",
  marginRight: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#f8f8f8",
  transition: "transform 0.3s ease",
}

const imageWrapperStyles = {
  borderRadius: "5px",
  overflow: "hidden",
  height: "200px",
}

const imageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
}

const linkStyles = {
  color: "#FF5733",
  fontSize: "2rem",
  textDecoration: "none",
  transition: "font-size 0.3s ease",
}

const IndexPage = ({ data }) => {
  const projects = data.allContentfulProjekt.nodes || []

  return (
    <Layout>
      <main style={pageStyles}>
        <Header />
        <Skills />
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Projects
        </h2>
        <div style={projectsWrapperStyles}>
          {projects.slice(0, 3).map(project => (
            <div
              key={project.id}
              style={projectContainerStyles}
              className="project-container"
            >
              <Link to={`/projekt/${project.slug}`}>
                <div style={imageWrapperStyles}>
                  {project.image && (
                    <GatsbyImage
                      image={project.image.gatsbyImageData}
                      alt={project.titel || "Project Image"}
                      style={imageStyles}
                    />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/projekt" style={linkStyles} className="project-link">
            View All Projects ➔
          </Link>
        </div>
      </main>
      <style>
        {`
          .project-container:hover {
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .project-link {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>My Projects</title>
    <meta
      name="description"
      content="Explore my projects and see the work I have done. View details of each project and find out more about my skills and experience."
    />
  </>
)

export const query = graphql`
  query {
    allContentfulProjekt {
      nodes {
        id
        titel
        slug
        image {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  }
`

export default IndexPage
