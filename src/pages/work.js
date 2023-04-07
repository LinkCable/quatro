import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Work = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} className="work">
      <Seo title="Portfolio" />
      <p><a href="https://www.figma.com/proto/9z9A3MUwkSXehCxLHSYP1N/Portfolio-Presentation?page-id=504%3A34004&node-id=505-45312&viewport=516%2C1081%2C0.07&scaling=contain&starting-point-node-id=505%3A45312">Keep it secret, keep it safe↗</a></p>
    </Layout>
  )
}

export default Work

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
