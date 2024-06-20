// src/pages/404.js

import * as React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"

const Main = styled.main`
  color: #333;
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
`

const Heading = styled.h1`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 2rem;
`

const Text = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
`

const LinkStyled = styled(Link)`
  color: #007acc;
  text-decoration: none;
  font-weight: bold;
`

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentful404FelSida {
        pagenotfound
      }
    }
  `)

  return (
    <Layout>
      <Main>
        <Heading>{data.contentful404FelSida.pagenotfound}</Heading>
        <Text>
          Gå tillbaka till <LinkStyled to="/">startsidan</LinkStyled>.
        </Text>
      </Main>
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>404 - Sidan kunde inte hittas</title>
    <meta
      name="description"
      content="Sidan du försöker nå kunde inte hittas. Gå tillbaka till startsidan för att fortsätta."
    />
  </>
)

export default NotFoundPage
