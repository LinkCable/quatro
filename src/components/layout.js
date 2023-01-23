import * as React from "react"
import { Link } from "gatsby"
import axios from "axios";

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

  

  let [footerText, setFooter] = React.useState("your message is loading");
  
  switch (Math.floor(Math.random() * (4))) {
    case 0:
      footerText = 'built 2023';
      break;
    case 1:
      footerText = "you're consuming artisanal craft code";
      break;
    case 2:  
      const query = `
        query {
          Page(page: 1, perPage: 1) {
            mediaList(userId: 154089, type: MANGA, sort: UPDATED_TIME_DESC) {
              id
              media {
                title {
                  english
                  userPreferred
                }
              }
            }
          }
        }
      `;
      axios.post('https://graphql.anilist.co', {
          query
      }).then(function(response) {
        setFooter("Last manga read: " + response.data.data.Page.mediaList[0].media.title.userPreferred)
      }).catch(err => setFooter("this API is broken :("));
      break;
    case 3:
      footerText = "mai tais don't have pineapple juice";
      break;
    default:
  }

  return (
    <div className={isRootPath ? "global-wrapper home" : "global-wrapper " + location.pathname.replace('/','')} data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main className={className}>{children}</main>
      {isRootPath ?
      <footer className="global-footer">
        {footerText}
      </footer> : null }
    </div>
  )
}

export default Layout
