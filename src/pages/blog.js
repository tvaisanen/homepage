import React from "react"
import { Link, grapql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path
              title
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
      frontmatter: { path, title },
    } = node
    return <Link to={path}>{title}</Link>
  })
  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Posts</h1>
      {links}
    </Layout>
  )
}

export default SecondPage
