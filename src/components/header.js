import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import styled, { keyframes, css } from "styled-components"

const splitInPieces = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const HeaderWrapper = styled.header`
  background-color: #f3f4f6;
  padding: 4rem 1rem;
  overflow: hidden; /* Ensure content doesn't overflow during animation */
`

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem; /* Added gap to create space between image and text */
  animation: ${splitInPieces} 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @media (max-width: 768px) {
    flex-direction: column; /* Change to column layout for mobile */
    text-align: center; /* Center align all content in mobile */
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 80%; /* Adjusted max-width for mobile */
    align-items: center; /* Center align text in mobile */
  }
`

const ContactButton = styled.button`
  background-color: #ff5733;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  margin-top: 1rem;
  width: fit-content; /* Adjusted width to fit content */

  &:hover {
    background-color: #d63603;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem; /* Adjusted margin-top for mobile */
    margin-left: -4%;
  }

  ${props =>
    !props.mobile &&
    css`
      margin-left: 14%;
    `}

  &:active {
    transform: translateY(2px); /* Move button down slightly when clicked */
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2); /* Add slight shadow effect */
  }
`

const Header = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = useStaticQuery(graphql`
    query {
      allContentfulIntroduction {
        nodes {
          id
          title
          subtitle
          description {
            description
          }
          image {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `)

  if (!isClient) {
    return null
  }

  const introductionData = data.allContentfulIntroduction.nodes[0]
  const image = getImage(introductionData.image)

  return (
    <HeaderWrapper>
      <Container>
        <FlexContainer>
          <div style={{ width: "180px" }}>
            <GatsbyImage
              style={{ borderRadius: "50%" }}
              image={image}
              alt={introductionData.title}
            />
          </div>
          <TextContainer>
            <h1
              style={{
                fontSize: "2.25rem",
                lineHeight: "1.2",
                fontWeight: "800",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              {introductionData.title}
            </h1>
            <h2
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.5",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              {introductionData.subtitle}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "3rem",
              }}
            >
              {introductionData.description.description}
            </p>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <ContactButton mobile={false}>Contact me here</ContactButton>
            </Link>
          </TextContainer>
        </FlexContainer>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
