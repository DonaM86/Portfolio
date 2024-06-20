import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const ProjectCardWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  text-decoration: none;
  color: inherit;
`

const ProjectCard = styled.div`
  display: flex;
  max-width: 1200px;
  height: auto;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 100px;
  margin-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`

const TextSide = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: #dfe2d2;
  padding-bottom: 5%;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

const ContentContainer = styled.div`
  flex-grow: 1;
  text-align: center;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Description = styled.div`
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const ImageSide = styled.div`
  flex: 2;
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const StyledImage = styled(GatsbyImage)`
  width: auto;
  height: 100%;
  object-fit: contain;
  border: 4px solid #351f39;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`

const HoveredImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 105%;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
  }
`

const ImageContainer = styled.div`
  position: relative;
  background-color: #dfe2d2;
  width: 100%;
  height: 97%;
  display: flex;
  justify-content: center;

  &:hover ${HoveredImage} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: auto;
  }
`

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProjekt
  const imageData = getImage(project.image)
  const image2Data = getImage(project.image2)

  const rawTextToText = rawText => {
    try {
      const json = JSON.parse(rawText)
      return json.content.map(content => content.content[0].value).join(" ")
    } catch (error) {
      console.error("Error parsing raw text:", error)
      return ""
    }
  }

  const projectText = rawTextToText(project.text.raw)

  return (
    <Layout>
      <ProjectCardWrapper to="#">
        <ProjectCard>
          <TextSide>
            <ContentContainer>
              <Title>{project.titel}</Title>
              <Description>{projectText}</Description>
            </ContentContainer>
          </TextSide>
          <ImageSide>
            <ImageContainer>
              <StyledImage image={imageData} alt={project.titel} />
              <HoveredImage image={image2Data} alt={project.titel} />
            </ImageContainer>
          </ImageSide>
        </ProjectCard>
      </ProjectCardWrapper>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    contentfulProjekt(slug: { eq: $slug }) {
      id
      titel
      spaceId
      slug
      text {
        raw
      }
      image {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
      }
      image2 {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`

export default ProjectTemplate
