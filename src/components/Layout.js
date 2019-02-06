/** @jsx jsx */
import { jsx } from '@emotion/core'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from 'emotion-theming'
import theme from './Utility/theme'

import Superbar from '../templates/_superbar'
import Navbar from '../templates/_navbar'
import './Utility/all.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => {
      const {
        description,
        title,
      } = data.site.siteMetadata;

      return (
        <div>
          <Helmet>
            <html lang="en" />
            <title>{title}</title>
            <meta name="description" content={description} />
            
            <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
            <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
    
            <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
            <meta name="theme-color" content="#fff" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content="/" />
            <meta property="og:image" content="/img/og-image.jpg" />
            <meta
              name="google-site-verification"
              content="qvbZgNAq97PJ5oLAOwHLVDZA1PXG8tPjybFIhZ_37WU"
            />
          </Helmet>
          <ThemeProvider theme={theme}>
            <div css={{ fontFamily: theme.font('serif') }}>
              <Superbar />
              <Navbar />
              <div>{children}</div>
            </div>
          </ThemeProvider>
        </div>
      );
    }}
  />
)

export default TemplateWrapper
