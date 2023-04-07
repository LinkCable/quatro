import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Login = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="not-found">
      <Seo title="Login" />
      <form action="/.netlify/functions/login" method="POST">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Get access</button>
      </form>
    </Layout>
  )
}

export default Login

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
