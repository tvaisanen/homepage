import React from "react"
import { Link, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { format, parse } from "date-fns"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              date
              path
              title
              slug
            }
          }
        }
      }
    }
  `)

  const {
    allMarkdownRemark: { edges },
  } = data

  const links = edges.map(({ node }) => {
    const {
      frontmatter: { path, title, date },
    } = node
    const d = parse(date, "yyyy-mm-dd", new Date())

    return (
      <li>
        <small>{format(d, "MMM dd yyyy")}</small>
        <br />
        <StyledLink to={path}>{title}</StyledLink>
      </li>
    )
  })
  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Posts</h1>
      <LinkList>{links}</LinkList>
    </Layout>
  )
}

const LinkList = styled.ul`
  list-style: none;
  padding: none;
  small {
    font-weight: bold;
  }
  li {
    margin: 8px 0 16px 0px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.1em;
`

export default SecondPage
