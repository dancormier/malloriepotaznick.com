/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Page from '../components/Page';
import Layout from '../components/Layout';

export const FaqPageTemplate = ({
  title,
  body,
  isPreview = false,
}) => (
  <ThemeProvider theme={theme}>
    <Page
      body={body}
      heading={title}
    />
  </ThemeProvider>
);

FaqPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const FaqPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <FaqPageTemplate
        title={post.frontmatter.title}
        body={post.rawMarkdownBody}
      />
    </Layout>
  );
};

FaqPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FaqPage;

export const faqPageQuery = graphql`
  query FaqPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      rawMarkdownBody
    }
  }
`;
