import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNavbar {
        nodes {
          id
          slug
          logo {
            gatsbyImageData(width: 120)
            title
          }
        }
      }
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  const navbar = data.allContentfulNavbar.nodes[0]
  const image = getImage(navbar.logo)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav
      style={{
        backgroundColor: "#f3f4f6",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ marginRight: "auto" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <GatsbyImage
              image={image}
              alt={navbar.logo.title}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Link>
        {!isSmallScreen && (
          <div
            className="menu"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {data.site.siteMetadata.menuLinks.map(link => (
              <Link
                key={link.name}
                to={link.link}
                className="text-lg text-gray-800 my-nav-link"
                activeClassName="font-semibold text-orange-500"
                style={{
                  textDecoration: "none",
                  fontFamily: "'Cormorant Garamond Medium', serif",
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                  transition: "color 0.3s",
                  margin: "0 1rem",
                }}
                onMouseEnter={e => {
                  e.target.style.color = "#FFA500"
                }}
                onMouseLeave={e => {
                  e.target.style.color = "#4a5568"
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isSmallScreen && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                appearance: "none",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                marginRight: "1rem",
                fontSize: "1.5rem",
              }}
            >
              ☰
            </button>
          )}
        </div>
      </div>
      {isSmallScreen && (
        <div
          className="menu"
          style={{
            display: isMenuOpen ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data.site.siteMetadata.menuLinks.map(link => (
            <Link
              key={link.name}
              to={link.link}
              className="text-lg text-gray-800 my-nav-link"
              activeClassName="font-semibold text-orange-500"
              style={{
                textDecoration: "none",
                fontFamily: "'Cormorant Garamond Medium', serif",
                fontSize: "1.25rem",
                fontWeight: "500",
                letterSpacing: "0.5px",
                transition: "color 0.3s",
                margin: "0.5rem 0",
              }}
              onMouseEnter={e => {
                e.target.style.color = "#FFA500"
              }}
              onMouseLeave={e => {
                e.target.style.color = "#4a5568"
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation
