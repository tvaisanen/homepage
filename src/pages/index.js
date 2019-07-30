import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IconEnter = styled.svg``

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>t.vaisanen</h1>
    <svg height="100" height="100">
      <circle cx="50" cy="50" r="40" />
    </svg>
  </Layout>
)

export default IndexPage
