import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="hero is-large is-dark is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">t.vaisanen</h1>
          <h2 className="subtitle">personal web page</h2>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
