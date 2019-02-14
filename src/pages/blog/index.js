import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import theme from '../../components/Utility/theme'
import Layout from '../../components/Layout'
import Heading from '../../components/Heading'
import Page from '../../components/Page'

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Page heading="Latest Blog Posts">
            <div>
              {posts.map(({ node: post }) => (
                <div
                  key={post.id}
                  css={{
                    paddingBottom: theme.size(11),
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <Heading Tag="h4">
                    <Link
                      css={{
                        color: theme.color('accent'),
                      }}
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                  </Heading>
                  <div
                    css={{
                      color: theme.color('gray'),
                      fontSize: theme.size(0),
                      marginBottom: theme.size(1),
                      [theme.mq('sm')]: {
                        marginTop: `-${theme.size(0)}`,
                      },
                    }}
                  >
                    {post.frontmatter.date}
                  </div>
                  <div
                    css={{
                      fontSize: theme.size(1),
                      lineHeight: theme.size(3),
                      marginBottom: theme.size(2),
                      [theme.mq('sm')]: {
                        fontSize: theme.size(2),
                        lineHeight: theme.size(5),
                      },
                    }}
                  >
                    {post.excerpt}
                  </div>
                  <Link
                    css={{
                      color: theme.color('accent'),
                    }}
                    to={post.fields.slug}
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          </Page>
        </Layout>
      </ThemeProvider>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
