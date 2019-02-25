/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import Container from '../components/Container';
import FooterContact from '../components/FooterContact';
import Markdown from '../components/Utility/Markdown';
import theme from '../components/Utility/theme';

const group = (items, grouping) => items.filter(item => item.align === grouping);
const FooterItem = ({ item }) => {
  const {
    align,
    body,
  } = item;

  return (
    <ThemeProvider theme={theme}>
      <div css={{ textAlign: align }}>
        <Markdown
          customCSS={{
            fontFamily: theme.font('sans'),
          }}
        >
          {body || ''}
        </Markdown>
      </div>
    </ThemeProvider>
  );
}

export const FooterTemplate = ({
  body,
  buttons,
  copyright,
  items,
  showFooterContact,
}) => {
  const year = new Date().getFullYear();
  const legal = {
    body: `© ${year} ${copyright}`,
    align: 'left',
  };
  const itemsLeft = items && group(items, 'left');
  const copyItem = group([legal], 'left');
  const itemsRight = items && group(items, 'right');
  const itemsLeftCombined = itemsLeft ? [...itemsLeft, ...copyItem] : copyItem;

  return (
    <ThemeProvider theme={theme}>
      <div>
        {showFooterContact && (
          <FooterContact
            body={body}
            buttons={buttons}
          />
        )}
        <div>
          <Container
            customCSS={{
              fontFamily: theme.font('sans'),
              marginTop: theme.size(2),
              paddingBottom: theme.size(4),
              paddingTop: theme.size(2),
            }}
          >
            <div
              css={{
                alignItems: 'flex-end',
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: theme.size(1),
              }}
            >
              <div
                css={{
                  width: '33%',
                }}
              >
                {itemsLeftCombined.map(item =>
                  <FooterItem item={item} key={item.body} />
                )}
              </div>
              {itemsRight && (
                <div
                css={{
                  textAlign: 'center',
                  width: '33%',
                }}
              >
                  {group(items, 'right').map(item =>
                    <FooterItem item={item} key={item.body} />
                  )}
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

FooterTemplate.propTypes = {
  body: PropTypes.string,
  buttons: PropTypes.any,
  copyright: PropTypes.string,
  items: PropTypes.any,
  showContactFooter: PropTypes.bool,
}

const Footer = ({ showFooterContact }) => (
  <StaticQuery
    query={graphql`
      query Footer {
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
                copyright
                items {
                  align
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
      const {
        buttons,
        copyright,
        items,
      } = frontmatter;

      return (
        <FooterTemplate
          body={body}
          buttons={buttons}
          copyright={copyright}
          items={items}
          showFooterContact={showFooterContact}
        />
      )
    }}
  />
);

export default Footer;