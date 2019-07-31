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

import Header from "./header"
import "./layout.css"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1rem 2rem;

  p {
    padding-bottom: 1rem;
  }
`

const Nav = styled.nav`
  list-style: none;
  display: flex;
  width: 100vw;

  padding: 16px 0;

  li {
    margin: 0 1rem;
  }

  background: rgba(22, 22, 22, 1);

  a {
    color: white;
    font-weight: bold;
    letter-spacing: 0.05rem;
    text-decoration: none;
  }
`

const Container = styled.div`
  max-width: 100vw;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Container>
      <Nav>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/blog"}>Posts</Link>
        </li>
      </Nav>
      <Main>{children}</Main>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
