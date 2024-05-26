// src/components/layout.js

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container, heading, siteTitle } from "../styles/layout.module.css"
import Navigation from "./Navbar"
import Footer from "../components/footer"

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container} id="main-container">
      <header className={siteTitle} id="main-header">
        {pageTitle || data.site.siteMetadata.title}
      </header>
      <Navigation id="main-navigation" />
      <main>
        {pageTitle && (
          <h1 className={heading} id="main-heading">
            {pageTitle}
          </h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
