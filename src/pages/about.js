import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"

const CardTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  font-family: "Cormorant Garamond, serif";
  color: #333333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const CardText = styled.div`
  font-size: 1.4rem;
  color: #283618;
  line-height: 1.6;
  max-width: 800px;
  font-family: "Cormorant Garamond-Light, serif";

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Image = styled.img`
  border-radius: 50%;
  width: 330px;
  height: 330px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const SideBySideContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`

const SideBySideItem = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: left;
  font-family: "Cormorant Garamond, serif";
  margin-bottom: 2rem;
  max-width: 400px;

  @media (min-width: 769px) {
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`

const ButtonContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const RomanticButton = styled(Link)`
  background-color: #ff5733;
  color: #333333;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
  margin: 0.5rem;

  &:hover {
    background-color: #f26f80;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulAboutMe {
        nodes {
          contentful_id
          id
          node_locale
          titel
          text {
            raw
          }
          experience {
            raw
          }
          education {
            raw
          }
          image1 {
            title
            file {
              url
            }
          }
        }
      }
    }
  `)

  const omMigNodes = data.allContentfulAboutMe.nodes

  omMigNodes.sort((a, b) => {
    if (a.titel < b.titel) return -1
    if (a.titel > b.titel) return 1
    return 0
  })

  return (
    <Layout>
      <main className="bg-rose-100 py-16 px-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {omMigNodes.map((node, index) => (
            <Container key={index}>
              <CardTitle>{node.titel}</CardTitle>
              {node.image1 && (
                <Image src={node.image1.file.url} alt={node.image1.title} />
              )}
              <CardText>
                {node.text &&
                  documentToReactComponents(JSON.parse(node.text.raw))}
              </CardText>
              <ButtonContainer>
                <RomanticButton to="/contact">Contact Me</RomanticButton>
                <RomanticButton to="/projekt">My Projects</RomanticButton>
              </ButtonContainer>
              <SideBySideContainer>
                {node.experience && (
                  <SideBySideItem>
                    <div>
                      {documentToReactComponents(
                        JSON.parse(node.experience.raw)
                      )}
                    </div>
                  </SideBySideItem>
                )}
                {node.education && (
                  <SideBySideItem>
                    <div>
                      {documentToReactComponents(
                        JSON.parse(node.education.raw)
                      )}
                    </div>
                  </SideBySideItem>
                )}
              </SideBySideContainer>
            </Container>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage
