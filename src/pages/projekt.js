import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const categories = [
  "React & Javascript",
  "HTML & CSS",
  "Vue & Vite",
  "Databases",
  "Web Development",
]

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`

const CategoryText = styled.span`
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  font-size: 1.2em;
  padding: 5px 10px;
  background-color: #ebede4;
  border-radius: 5px;
  &:hover {
    color: #666;
    background-color: #d1d1d1;
  }
  &.active {
    color: #333;
    background-color: #ccc;
  }
`

const ShowAllButton = styled.button`
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  background-color: #ebede4;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  &:hover {
    background-color: #d1d1d1;
  }
`

const ProjectCardWrapper = styled(Link)`
  margin-top: 20px;
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
`

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  height: 350px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: #ebede4;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 20px;
  margin-bottom: 10px;
  &:hover .second-image {
    opacity: 1;
  }
`

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 70%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledImage = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SecondImage = styled(GatsbyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`

const Title = styled.h3`
  margin-top: 20px;
`

const Line = styled.div`
  width: 80%;
  height: 2px;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ProjektPage = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const projects = data.allContentfulProjekt.nodes

  const handleCategoryClick = category => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.categories.includes(selectedCategory))
    : projects

  return (
    <Layout>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Categories</h2>
      <CategoryWrapper>
        {categories.map(category => (
          <CategoryText
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={category === selectedCategory ? "active" : ""}
          >
            {category}
          </CategoryText>
        ))}
      </CategoryWrapper>
      <div style={{ textAlign: "center" }}>
        <ShowAllButton onClick={() => setSelectedCategory(null)}>
          All Projects
        </ShowAllButton>
      </div>
      <div className="projectContainer">
        <GridContainer>
          {filteredProjects.map(project => {
            const { id, titel, slug, image, image2 } = project
            const imageData = getImage(image)
            const image2Data = getImage(image2)

            return (
              <ProjectCardWrapper key={id} to={`/projekt/${slug}`}>
                <ProjectCard>
                  <ImageContainer>
                    <StyledImage
                      image={imageData}
                      alt={titel || "Project Image"}
                    />
                    <SecondImage
                      className="second-image"
                      image={image2Data}
                      alt={titel || "Project Image 2"}
                    />
                    <Line />
                  </ImageContainer>
                  <Title>{titel}</Title>
                </ProjectCard>
              </ProjectCardWrapper>
            )
          })}
        </GridContainer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProjekt {
      nodes {
        id
        titel
        slug
        categories
        image {
          gatsbyImageData(placeholder: BLURRED)
        }
        image2 {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  }
`

export default ProjektPage
