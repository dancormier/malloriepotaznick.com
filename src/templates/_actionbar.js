/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import Button from '../components/Button';
import Container from '../components/Container';
import Markdown from '../components/Utility/Markdown';
import theme from '../components/Utility/theme';

export const ActionbarTemplate = ({
  body,
  buttons,
  // isPreview,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        css={{
          borderTop: `1px solid ${theme.color('gray-ll-alt')}`,
          boxShadow: '0 0 40px rgba(0,0,0,.1)',
          paddingBottom: theme.size(1),
          paddingTop: theme.size(1),
          position: 'relative',
          zIndex: 1,
          [theme.mq('sm')]: {
            paddingBottom: theme.size(2),
            paddingTop: theme.size(2),
          },
        }}
      >
        <Container>
          <div
            css={{
              [theme.mq('sm')]: {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
              }
            }}
          >
            <Markdown
              customCSS={{
                'p': {
                  color: theme.color('gray-d'),
                  display: 'none',
                  fontSize: theme.size(1),
                  lineHeight: theme.size(2),
                  [theme.mq('sm')]: {
                    display: 'block',
                    fontSize: theme.size(2),
                    lineHeight: theme.size(4),
                  },
                }
              }}
            >
              {body}
            </Markdown>
            {buttons && buttons.length && (
              <div css={{ whiteSpace: 'nowrap' }}>
                {buttons.map((button, idx) => (
                  <Button
                    key={button.text}
                    type={button.type}
                    url={button.url}
                    customCSS={{
                      display: 'block !important',
                      marginTop: idx > 0 && theme.size(-2),
                      width: '100%',
                      [theme.mq('md')]: {
                        display: 'inline-block',
                        marginLeft: idx > 0 && theme.size(-2),
                        marginTop: 0,
                        width: 'auto',
                      },
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

ActionbarTemplate.propTypes = {
  body: PropTypes.string,
  buttons: PropTypes.any,
}

const Actionbar = () => (
  <StaticQuery
    query={graphql`
      query Actionbar {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "_footer" } }}
        ) {
          edges {
            node {
              frontmatter {
                buttons {
                  text
                  type
                  url
                }
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
      const { buttons } = frontmatter;

      return (
        <ActionbarTemplate
          body={body}
          buttons={buttons}
        />
      )
    }}
  />
);

export default Actionbar;