/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Layout from '../components/Layout'
import Page from '../components/Page';
import Heading from '../components/Heading';
import Tag from '../components/Tag';

export const BlogPostTemplate = ({
  body,
  description,
  image,
  tags,
  title,
  helmet,
}) => (
  <ThemeProvider theme={theme}>
    {helmet || ''}
    <Page
      author={true}
      body={body}
      heading={title}
      headerImage={image}
      prebody={description && (
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
      )}
    >
      {tags && tags.length ? (
        <div>
          <Heading Tag="h6">Tags</Heading>
          <div
            css={{
              marginTop: theme.size(2),
            }}
          >
            {tags.map(tag => (
              <Tag
                key={tag + `tag`}
                tag={tag}
              />
            ))}
          </div>
        </div>
      ) : null}
    </Page>
  </ThemeProvider>
);

BlogPostTemplate.propTypes = {
  body: PropTypes.node.isRequired,
  description: PropTypes.string,
  headerImage: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    shortDescription: siteDescription,
    title: siteTitle,
  } = data.site.siteMetadata;
  const {
    description,
    image,
    tags,
    title,
  } = post.frontmatter;
  const headerImage = image && image.childImageSharp.fixed.src;

  return (
    <Layout showFooterContact={true}>
      <BlogPostTemplate
        body={post.rawMarkdownBody}
        description={description}
        image={headerImage}
        helmet={
          <Helmet titleTemplate={`%s | ${siteTitle}: ${siteDescription}`}>
            <title>{`${title}`}</title>
            <meta name="description" content={`${description}`} />
          </Helmet>
        }
        tags={tags}
        title={title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
        shortDescription
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      rawMarkdownBody
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            fixed(width: 1600) {
              src
            }
          }
        }
      }
    }
  }
`
