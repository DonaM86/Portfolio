import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulFooter {
        email
        linkedin
        github
      }
    }
  `)

  const { email, linkedin, github } = data.contentfulFooter

  return (
    <footer
      style={{
        backgroundColor: "#e1ddd2",
        color: "#333",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ul
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1rem",
              }}
            >
              <IoIosMail
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "24px",
                  transition: "color 0.3s ease",
                }}
              />
              <a
                href={`mailto:${email}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={e => (e.target.style.color = "#c66216")}
                onMouseOut={e => (e.target.style.color = "inherit")}
                onFocus={e => (e.target.style.color = "#c66216")}
                onBlur={e => (e.target.style.color = "inherit")}
              >
                {email}
              </a>
            </li>
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1rem",
              }}
            >
              <FaGithub
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "24px",
                  transition: "color 0.3s ease",
                }}
              />
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={e => (e.target.style.color = "#c66216")}
                onMouseOut={e => (e.target.style.color = "inherit")}
                onFocus={e => (e.target.style.color = "#c66216")}
                onBlur={e => (e.target.style.color = "inherit")}
              >
                Visit my GitHub!
              </a>
            </li>
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaLinkedin
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "24px",
                  transition: "color 0.3s ease",
                }}
              />
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={e => (e.target.style.color = "#c66216")}
                onMouseOut={e => (e.target.style.color = "inherit")}
                onFocus={e => (e.target.style.color = "#c66216")}
                onBlur={e => (e.target.style.color = "inherit")}
              >
                Visit my LinkedIn!
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <span style={{ fontSize: "14px", color: "inherit" }}>
            © {new Date().getFullYear()} Liridona Myftari Portfolio. All Rights
            Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
