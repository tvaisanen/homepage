/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import "typeface-ibm-plex-sans"

import "./layout.css"
import styled from "styled-components"
import "./bulma.css"

const Container = styled.div`
  max-width: 100vw;
  padding: 0 20px;
`

const Layout = ({ children }) => {
  const containerRef = React.useRef(null)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  React.useEffect(() => {
    if (containerRef.current) {
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      )

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target
            const $target = document.getElementById(target)

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active")
            $target.classList.toggle("is-active")
          })
        })
      }
    }
  }, [containerRef])

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div ref={containerRef} id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to={"/"}>
              Home
            </Link>
            <Link className="navbar-item" to={"/blog"}>
              Posts
            </Link>
          </div>

          <div className="navbar-end"></div>
        </div>
      </nav>
      <Container ref={containerRef}>
        <section className="container">{children}</section>
        <script src={"/nav-toggle.js"} />
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
