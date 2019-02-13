/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import theme from '../components/Utility/theme';
import Markdown from '../components/Utility/Markdown';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Heading from '../components/Heading';

export const AboutPageTemplate = ({
  title,
  body,
  isPreview = false,
}) => (
  <ThemeProvider theme={theme}>
    <div>
      <Heading Tag='h2'>
        {title}
      </Heading>
    </div>
    {body && (
      <Markdown
        customCSS={{
          'p': {
            fontSize: theme.size(1),
            lineHeight: theme.size(3),
          },
          [theme.mq('sm')]: {
            marginBottom: theme.size(8),
            'p': {
              fontSize: theme.size(2),
              lineHeight: theme.size(5),
            }
          },
        }}
      >
        {body}
      </Markdown>
    )}
  </ThemeProvider>
);

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout altBG={true}>
      <Container>
        <AboutPageTemplate
          title={post.frontmatter.title}
          body={post.rawMarkdownBody}
        />
      </Container>
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
