import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Layout from '../components/Layout'
import Page from '../components/Page';
import BlogItem from '../components/Blog-item';

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Helmet title={`${tag} | ${title}`} />
          <Page
            heading={tagHeader}
          >
            <div>
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
              <Link
                to="/tags/"
                css={{
                  color: theme.color('accent'),
                }}
              >
                Browse all tags
              </Link>
            </div>
          </Page>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
