import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useSpring, animated } from "react-spring"

const Snippet = ({ limit, showDescriptions }) => {
  const data = useStaticQuery(graphql`
    query {
      contentfulProjectPage {
        description {
          raw
        }
        projectpage {
          ... on ContentfulRecepten {
            id
            childContentfulReceptenTextTextNode {
              text
            }
            screen2 {
              gatsbyImage(width: 300, height: 200)
            }
          }
          ... on ContentfulSpaceJam {
            id
            screen3 {
              gatsbyImage(width: 300, height: 200)
            }
          }
          ... on ContentfulVader {
            id
            screenshot1 {
              gatsbyImage(width: 300, height: 200)
            }
          }
        }
      }
    }
  `)

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 1000, friction: 100 },
  })

  return (
    <animated.div
      className="m-2 mt-0 pt-10 flex flex-row flex-wrap justify-center"
      style={springProps}
    >
      {data.allContentfulAllProjects.nodes.map(project => (
        <Link to={`/${project.slug}`} key={project.id} className="snippet-link">
          <div className="snippet-card">
            {project.screen1 && (
              <GatsbyImage
                image={getImage(project.screen1)}
                alt={project.tite}
                className="snippet-image"
              />
            )}
            {project.screen2 && (
              <GatsbyImage
                image={getImage(project.screen2)}
                alt={project.tite}
                className="snippet-image"
              />
            )}
            {project.screen3 && (
              <GatsbyImage
                image={getImage(project.screen3)}
                alt={project.tite}
                className="snippet-image"
              />
            )}
            <div className="snippet-content">
              <h5 className="snippet-title">{project.tite}</h5>
              {showDescriptions && (
                <div
                  className="snippet-description"
                  dangerouslySetInnerHTML={{
                    __html: project.text && project.text.raw,
                  }}
                ></div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </animated.div>
  )
}

export default Snippet
