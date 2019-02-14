/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Layout from '../components/Layout'
import Page from '../components/Page';
import Button from '../components/Button';

export const BlogPostTemplate = ({
  content,
  description,
  tags,
  title,
  helmet,
}) => (
  <ThemeProvider theme={theme}>
    {helmet || ''}
    <Page
      body={content}
      heading={title}
    >
      <div
        css={{
          marginBottom: theme.size(4),
        }}
      >
        <div
          css={{
            background: theme.color('gray-ll'),
            color: theme.color('gray-d'),
            fontSize: theme.size(2),
            fontStyle: 'italic',
            lineHeight: theme.size(4),
            marginBottom: theme.size(2),
            padding: theme.size(2),
          }}
        >
          {description}
        </div>
        {tags && tags.length ? (
          <ul
            css={{
              listStyle: 'none',
            }}
          >
            {tags.map(tag => (
              <li key={tag + `tag`} css={{ display: 'inline-block' }}>
                <Button
                  customCSS={{
                    display: 'inline-block',
                    fontSize: theme.size(0),
                    marginRight: theme.size(0),
                    padding: theme.size(0),
                    paddingLeft: theme.size(0),
                    paddingRight: theme.size(0),
                  }}
                  url={`/tags/${kebabCase(tag)}/`}
                >
                  {tag}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Page>
  </ThemeProvider>
);

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
