import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "../styles/Contact.css"

const Contact = ({ data }) => {
  const contactInfo = data.allContentfulContact.nodes[0]

  const image = getImage(contactInfo.profilbild)

  return (
    <Layout>
      <main>
        <div className="contact-container">
          <div className="text-container">
            <h1>{contactInfo.titel}</h1>
            <p>{contactInfo.namn}</p>
            <ul>
              <li>
                <IoIosMail />
                <a
                  href={`mailto:${contactInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Send me an email</span>
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  <span>Visit my GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                  <span>Visit my LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="image-container">
            <GatsbyImage image={image} alt={contactInfo.titel} />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulContact {
      nodes {
        contentful_id
        id
        node_locale
        titel
        slug
        namn
        email
        github
        linkedin
        profilbild {
          title
          gatsbyImageData(
            layout: FIXED
            width: 400
            height: 400
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

export default Contact
