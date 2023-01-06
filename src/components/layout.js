import * as React from "react"
import { Link } from "gatsby"
import resume from "../pdfs/philkt-resume.pdf"

const Layout = ({ location, title, children, className }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div>
        <h1 className="main-heading home-link">
          <Link to="/">{title}</Link>
        </h1>

        <div>
          <h2 className="main-heading resume-link">
            <a href={resume}>resume</a>
          </h2>
          <h2 className="main-heading blog-link">
            <Link to="/blog">blog</Link>
          </h2>
        </div>
      </div>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className={isRootPath ? "global-wrapper home" : "global-wrapper " + location.pathname.replace('/','')} data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main className={className}>{children}</main>
      {isRootPath ?
      <footer className="global-footer">
        b. 1994 - d. ????
      </footer> : null }
    </div>
  )
}

export default Layout
