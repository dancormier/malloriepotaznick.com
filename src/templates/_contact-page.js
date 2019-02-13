/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import Markdown from '../components/Utility/Markdown'
import theme from '../components/Utility/theme'
import Container from '../components/Container'
import ContactForm from '../components/Contact-form'
import Heading from '../components/Heading'
import Subsection from '../components/Subsection'

export const ContactPageTemplate = ({
  body,
  heading,
  subsections,
  isPreview = false,
}) => (
  <ThemeProvider theme={theme}>
    <Container>
      <div
        css={{
          marginBottom: theme.size(4),
        }}
      >
        <Heading Tag='h2'>
          {heading}
        </Heading>
        <Markdown>
          {body}
        </Markdown>
      </div>
      <section
        css={{
          display: 'flex',
          flexDirection: 'column-reverse',
          [theme.mq('md')]: {
            flexDirection: 'row',
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
        {subsections.map(sub =>
          <Subsection
            key={sub.heading}
            heading={sub.heading}
          >
            {sub.body}
          </Subsection>
        )}
      </section>
    </Container>
  </ThemeProvider>
);

ContactPageTemplate.propTypes = {
  heading: PropTypes.string.isRequired,
  subsections: PropTypes.array.isRequired,
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
                subsections {
                  heading
                  body
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const { frontmatter } = edges[0].node;
      const {
        heading,
        subsections,
        body,
      } = frontmatter;

      console.log(edges, 'edges');
      return (
        <ContactPageTemplate
          body={body}
          heading={heading}
          subsections={subsections}
        />
      );
    }}
  />
);

export default ContactPage;