/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
// import PropTypes from 'prop-types'
// import { Link, graphql } from 'gatsby'
import theme from '../components/theme'
import Button from '../components/Button'
import Container from '../components/Container'
import Heading from '../components/Heading'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section>
          <Container
            customCSS={{
              position: 'relative',
            }}
          >
            <div
              css={{
                maxWidth: '66%',
                paddingTop: theme.size(8),
                position: 'relative',
              }}
            >
              <Heading>
                Treatment begins with you
              </Heading>
              <div
                css={{
                  fontSize: theme.size(3),
                  lineHeight: theme.size(5),
                  marginBottom: theme.size(8),
                }}
              >
                There is help. Therapy will provide you with the tools to make you the best you. Also, there’s other benefits.
              </div>
            </div>
            <div>
              <Button
                url="#"
              />
              <span
                css={{
                  marginLeft: theme.size(3),
                }}
              >
                or call (561) 536-3980‬
              </span>
            </div>
          </Container>
        </section>
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
