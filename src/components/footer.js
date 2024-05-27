import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  background-color: #e1ddd2;
  color: #333;
  text-align: center;
  padding: 20px;
`

const ContentContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1rem; /* Added padding for mobile */
`

const IconList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  list-style: none; /* Added to remove default list styling */
  padding: 0; /* Added to remove default padding */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack icons vertically on smaller screens */
  }
`

const IconItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem; /* Changed to use margin for spacing */

  &:last-child {
    margin-right: 0;
  }
`

const StyledIcon = styled.span`
  margin-bottom: 0.5rem;
  font-size: 24px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 20px; /* Smaller icon size on mobile */
  }
`

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover,
  &:focus {
    color: #c66216;
  }

  @media (max-width: 768px) {
    font-size: 14px; /* Smaller text size on mobile */
  }
`

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
    <FooterWrapper>
      <ContentContainer>
        <div>
          <IconList>
            <IconItem>
              <StyledIcon>
                <IoIosMail />
              </StyledIcon>
              <StyledLink href={`mailto:${email}`}>{email}</StyledLink>
            </IconItem>
            <IconItem>
              <StyledIcon>
                <FaGithub />
              </StyledIcon>
              <StyledLink
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit my GitHub!
              </StyledLink>
            </IconItem>
            <IconItem>
              <StyledIcon>
                <FaLinkedin />
              </StyledIcon>
              <StyledLink
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit my LinkedIn!
              </StyledLink>
            </IconItem>
          </IconList>
        </div>
        <div>
          <p>
            © {new Date().getFullYear()} Liridona Myftari Portfolio. All Rights
            Reserved.
          </p>
        </div>
      </ContentContainer>
    </FooterWrapper>
  )
}

export default Footer
