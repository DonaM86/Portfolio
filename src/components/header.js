import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import styled from "styled-components"

const HeaderWrapper = styled.header`
  background-color: #f3f4f6;
  padding: 4rem 1rem;
`

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50%;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-left: 1rem;
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

  &:hover {
    background-color: #d63603;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulIntroduction {
        nodes {
          id
          title
          subtitle
          image {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
          description {
            id
          }
        }
      }
    }
  `)

  const introductionData = data.allContentfulIntroduction.nodes[0]
  const image = getImage(introductionData.image)

  return (
    <HeaderWrapper>
      <Container>
        <FlexContainer>
          <div>
            <div style={{ width: "180px" }}>
              <GatsbyImage
                style={{ borderRadius: "50%" }}
                image={image}
                alt={introductionData.title}
              />
            </div>
          </div>
          <TextContainer>
            <h1
              style={{
                fontSize: "2.25rem",
                lineHeight: "1.2",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              {introductionData.title}
            </h1>
            <h2
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.5",
                color: "#374151",
                marginBottom: "3rem",
              }}
            >
              {introductionData.subtitle}
            </h2>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <ContactButton>Contact me here</ContactButton>
            </Link>
          </TextContainer>
        </FlexContainer>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
