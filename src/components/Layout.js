/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from 'emotion-theming'
import Div100vh from 'react-div-100vh'
import theme from './Utility/theme'
import Footer from '../templates/_footer'
import Navbar from '../templates/_navbar'
import Superbar from '../templates/_superbar'
import Actionbar from '../templates/_actionbar'
import './Utility/all.sass'

const TemplateWrapper = ({ children, altBG, showFooterContact }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              shortDescription,
            }
          }
        }
    `}
    render={data => {
      const {
        description,
        shortDescription,
        title,
      } = data.site.siteMetadata;

      return (
        <Location>
          {({ location }) => (
            <div>
              <Helmet>
                <html lang="en" />
                <title>{title}: {shortDescription}</title>
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
                <Div100vh
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                  }}
                >
                  <div css={{
                    backgroundColor: altBG && theme.color('gray-ll'),
                    color: theme.color('primary'),
                    fontFamily: theme.font('serif'),
                    height: '100%',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                  }}>
                    <Superbar />
                    <Navbar pathname={location.pathname} />
                    <div>
                      {children}
                    </div>
                    <Footer />
                  </div>
                  {showFooterContact && (
                    <Actionbar />
                  )}
                </Div100vh>
              </ThemeProvider>
            </div>
          )}
        </Location>
      );
    }}
  />
)

export default TemplateWrapper
