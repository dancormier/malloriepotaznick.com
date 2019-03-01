import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import theme from '../../components/Utility/theme'
import Layout from '../../components/Layout'
import BlogItem from '../../components/Blog-item';
import Page from '../../components/Page'

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const {
      title: siteTitle,
      shortDescription: siteDescription,
    } = data.site.siteMetadata;
    const { edges: posts } = data.allMarkdownRemark

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Helmet title={`Blog | ${siteTitle}: ${siteDescription}`} />
          <Page heading="Latest Blog Posts">
            <div css={{ marginTop: theme.size(4) }}>
              {posts.map(({ node: post }) => (
                <BlogItem
                  key={post.id}
                  date={post.frontmatter.date}
                  excerpt={post.excerpt}
                  id={post.id}
                  slug={post.fields.slug}
                  title={post.frontmatter.title}
                />
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
    site {
      siteMetadata {
        title
        shortDescription
      }
    }
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
