import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { event } from 'react-ga'
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Button from '../components/Button'
import BlogItem from '../components/Blog-item';
import Layout from '../components/Layout'
import Page from '../components/Page';

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    const {
      title,
      shortDescription,
    } = this.props.data.site.siteMetadata;
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Helmet title={`${tag} | ${title}: ${shortDescription}`} />
          <Page
            heading={tagHeader}
          >
            <div>
              {posts.map(({ node: post }) => {
                const {
                  excerpt,
                  fields,
                  frontmatter,
                  id,
                } = post;


                const {
                  date,
                  image,
                  title,
                } = frontmatter;
                const thumb = image && image.childImageSharp.fixed.src;

                return (
                  <BlogItem
                    key={id}
                    date={date}
                    excerpt={excerpt}
                    id={id}
                    slug={fields.slug}
                    title={title}
                    thumb={thumb}
                    type="tags"
                  />
                )
              })}
              <Button
                href="/tags"
                onClick={() => {
                  event({
                    category: 'tags',
                    action: '/tags',
                    label: 'browse-all-tags',
                  });
                }}
              >
                Browse all tags
              </Button>
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
        shortDescription
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
            image {
              childImageSharp {
                fixed(width: 1200) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
