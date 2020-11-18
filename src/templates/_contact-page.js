/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react'
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types'
import theme from '../components/Utility/theme'
import Markdown from '../components/Utility/Markdown'
import ContactForm from '../components/Contact-form'
import Page from '../components/Page'

export const ContactPageTemplate = ({
  body,
  heading,
  isPreview = false,
}) => (
  <ThemeProvider theme={theme}>
    <Page heading={heading}>
      <section
        css={{
          display: 'flex',
          flexDirection: 'column-reverse',
          paddingBottom: theme.size(4),
          [theme.mq('md')]: {
            flexDirection: 'row',
            paddingBottom: theme.size(9),
          },
        }}
      >
        <div
          css={{
            boxSizing: 'border-box',
            flexShrink: 0,
            maxWidth: theme.size(21),
            width: '100%',
            [theme.mq('md')]: {
              paddingRight: '6%',
              width: '40%',
            },
            [theme.mq('lg')]: {
              width: '60%',
            },
          }}
        >
          <ContactForm />
        </div>
        {body && (
          <Markdown
            customCSS={{
              marginBottom: theme.size(4),
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
      </section>
    </Page>
  </ThemeProvider>
);

ContactPageTemplate.propTypes = {
  body: PropTypes.string,
  heading: PropTypes.string.isRequired,
  isPreview: PropTypes.bool,
}

const ContactPage = () => (
  <StaticQuery
    query={graphql`
      query ContactPageQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "_contact-page" } }}
        ) {
          edges {
            node {
              frontmatter {
                heading
              }
              rawMarkdownBody
            }
          }
        }
      }
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const { rawMarkdownBody: body, frontmatter } = edges[0].node;

      return (
        <ContactPageTemplate
          body={body}
          heading={frontmatter.heading}
        />
      );
    }}
  />
);

export default ContactPage;