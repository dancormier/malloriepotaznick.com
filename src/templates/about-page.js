/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Page from '../components/Page';
import Layout from '../components/Layout';

export const AboutPageTemplate = ({
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

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        body={post.rawMarkdownBody}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      rawMarkdownBody
    }
  }
`;
