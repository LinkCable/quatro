import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <h2 className="main-heading">
          <Link to="/blog">Blog</Link>
        </h2>
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
      <main>{children}</main>
      <footer>
        Built different
      </footer>
    </div>
  )
}

export default Layout
