import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Prism from "prismjs"
import { DiscussionEmbed } from "disqus-react"

const Section = styled.section`
  max-width: 100%;
`

export const Template = ({ data, ...props }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: frontmatter.slug, title: frontmatter.title },
  }

  React.useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })
  return (
    <Layout>
      <Section className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>

      <small>{frontmatter.date}</small>
      <DiscussionEmbed {...disqusConfig} />
    </Layout>
  )
}

export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
