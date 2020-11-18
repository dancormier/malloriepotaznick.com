import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { ThemeProvider } from '@emotion/react'
import theme from '../../components/Utility/theme'
import Layout from '../../components/Layout'
import Page from '../../components/Page'
import Tag from '../../components/Tag';

const TagsPage = ({
  data: {
    allMarkdownRemark: {
      group
    },
    site: {
      siteMetadata: {
        title,
        shortDescription,
      },
    },
  },
}) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Helmet title={`Tags | ${title}: ${shortDescription}`} />
      <Page heading="Tags">
        <div>
          {group.map(tag => (
            <Tag
              key={tag.fieldValue}
              tag={tag.fieldValue}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Tag>
          ))}
        </div>
      </Page>
    </Layout>
  </ThemeProvider>
);

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        shortDescription
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
