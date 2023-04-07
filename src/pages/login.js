import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Login = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="login">
      <Seo title="Login" />
      <form action="/.netlify/functions/login" method="POST">
        <div className="password-entry">
            <label for="password">Got a password?</label>
            <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Let me in</button>
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
