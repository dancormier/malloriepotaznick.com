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
  body,
  isPreview = false,
}) => (
  <ThemeProvider theme={theme}>
    <Page
      body={body}
      heading={heading}
    />
  </ThemeProvider>
);

CreatedPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const CreatedPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <CreatedPageTemplate
        heading={post.frontmatter.heading}
        body={post.rawMarkdownBody}
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
      }
      rawMarkdownBody
    }
  }
`;
