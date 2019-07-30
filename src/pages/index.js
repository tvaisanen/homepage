import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>t.vaisanen</h1>
    <p>Hi, there.</p>
    <Link to={"/blog/react-lazy-loading-images"}>
      Lazy loading images with React
    </Link>
  </Layout>
)

export default IndexPage
