/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Page from '../components/Page';
import Layout from '../components/Layout';

export const CreatedPageTemplate = ({
  heading,
  image,
  body,
  isPreview = false,
}) => {
  const hasImage = image && image.childImageSharp;
  const headerImage = hasImage && hasImage.fixed.src;

  console.log(hasImage, headerImage, 'bop');
  return (
    <ThemeProvider theme={theme}>
      <Page
        body={body}
        heading={heading}
        headerImage={(isPreview && image) || (hasImage && headerImage)}
      />
    </ThemeProvider>
  );
};

CreatedPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const CreatedPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    heading,
    image,
  } = post.frontmatter;

  console.log(image, 'img123')
  return (
    <Layout>
      <CreatedPageTemplate
        heading={heading}
        body={post.rawMarkdownBody}
        image={image}
      />
    </Layout>
  );
};

CreatedPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CreatedPage;

export const createdPageQuery = graphql`
  query CreatedPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        heading
        image {
          childImageSharp {
            fixed(width: 1600) {
              src
            }
          }
        }
      }
      rawMarkdownBody
    }
  }
`;
