import React from 'react'
/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
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
              <div
                css={{
                  [theme.mq('md')]: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingTop: theme.size(4),
                  },
                }}
              >
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
                      thumb={thumb}
                      slug={fields.slug}
                      title={title}
                    />
                  )
                })}
              </div>
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
          excerpt(pruneLength: 180)
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
