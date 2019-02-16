/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from 'emotion-theming'
import theme from './Utility/theme'
import Container from '../components/Container';
import Footer from '../templates/_footer'
import Navbar from '../templates/_navbar'
import Superbar from '../templates/_superbar'
import './Utility/all.sass'

const prelaunch = false;

const TemplateWrapper = ({ children, altBG, showFooterContact }) => (
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
        <Location>
          {({ location }) => (
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
                <div css={{
                  backgroundColor: altBG && theme.color('gray-ll'),
                  color: theme.color('primary'),
                  fontFamily: theme.font('serif'),
                  overflow: 'hidden',
                }}>
                  <Superbar />
                  <Navbar
                    prelaunch={prelaunch}
                    pathname={location.pathname}
                  />
                  <div css={{ minHeight: '100vh' }}>
                    {prelaunch ? (
                      <Container customCSS={{ textAlign: 'center' }}>
                        <h2
                          css={{
                            fontSize: theme.size(6),
                            marginBottom: theme.size(6),
                          }}
                        >
                          More coming soon
                        </h2>
                        <div>
                          <a href="https://www.psychologytoday.com/us/therapists/mallorie-potaznick-coral-springs-fl/429831">
                            View Mallorie Potaznick's Psychology Today profile
                          </a>
                        </div>
                      </Container>
                    ) : children}
                  </div>
                  <Footer showFooterContact={showFooterContact} />
                </div>
              </ThemeProvider>
            </div>
          )}
        </Location>
      );
    }}
  />
)

export default TemplateWrapper
