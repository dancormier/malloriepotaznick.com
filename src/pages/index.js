/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import HomePage from '../templates/_home-page'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    const heroes = edges[0].node.frontmatter.heroes;

    return <HomePage heroes={heroes} />
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "_home-page" } }}
    ) {
      edges {
        node {
          frontmatter {
            heroes {
              background {
                align
                image {
                  childImageSharp {
                    fixed(width: 1000) {
                      src
                    }
                  }
                }
              }
              body
              button {
                text
                url
              }
              context
              heading
              image {
                align
                image {
                  childImageSharp {
                    fixed(width: 400) {
                      src
                    }
                  }
                }
              }
              subsections {
                heading
                body
              }
            }
          }
        }
      }
    }
  }
`