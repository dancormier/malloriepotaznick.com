/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
// import PropTypes from 'prop-types'
// import { Link, graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/theme'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <section>
            <div
              css={{
                textAlign: 'center',
                margin: 'auto',
                maxWidth: theme.prop('max'),
              }}
            >
              <div
                css={{
                  fontSize: theme.size(6),
                  marginBottom: theme.size(6),
                }}
              >
                More coming soon
              </div>
              <a href="https://www.psychologytoday.com/us/therapists/mallorie-potaznick-coral-springs-fl/429831">
                View Mallorie Potaznick's Psychology Today profile
              </a>
            </div>
          </section>
        </ThemeProvider>
      </Layout>
    )
  }
}

// IndexPage.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.array,
//     }),
//   }),
// }

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] },
//       filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
//     ) {
//       edges {
//         node {
//           excerpt(pruneLength: 400)
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//           }
//         }
//       }
//     }
//   }
// `
