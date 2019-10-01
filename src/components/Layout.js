/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from 'emotion-theming'
import theme from './Utility/theme'
import Footer from '../templates/_footer'
import Navbar from '../templates/_navbar'
import Superbar from '../templates/_superbar'
import Actionbar from '../templates/_actionbar'
import './Utility/all.sass'

const TemplateWrapper = ({ children, altBG, showFooterContact }) => {
  let actionbarRef = useRef(null);
  let size = useComponentSize(actionbarRef);
  let { height: actionbarHeight } = size;

  return (
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
                  <div>
                    <div css={{
                      backgroundColor: altBG && theme.color('gray-ll'),
                      color: theme.color('primary'),
                      fontFamily: theme.font('serif'),
                    }}>
                      <Superbar />
                      <Navbar pathname={location.pathname} />
                      <div>
                        {children}
                      </div>
                      <Footer />
                      {showFooterContact && actionbarHeight && (
                        <div
                          css={{
                            height: `${actionbarHeight}px`,
                            width: '100%',
                          }}
                        />
                      )}
                    </div>
                    {showFooterContact && (
                      <div
                        ref={actionbarRef}
                        css={{
                          background: theme.color('white'),
                          bottom: 0,
                          position: 'fixed',
                          width: '100%',
                          zIndex: 3,
                        }}
                      >
                        <Actionbar />
                      </div>
                    )}
                  </div>
                </ThemeProvider>
              </div>
            )}
          </Location>
        );
      }}
    />
  );
}

export default TemplateWrapper
