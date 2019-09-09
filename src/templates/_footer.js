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
      <div css={{
        textAlign: 'center',
        [theme.mq('sm')]: {
          textAlign: align,
        }
      }}>
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
  isPreview,
}) => {
  const year = new Date().getFullYear();
  const legal = {
    body: `© ${year} ${copyright}`,
    align: 'right',
  };
  const itemsLeft = items && group(items, 'left');
  const copyItem = group([legal], 'right');
  const itemsRight = items && group(items, 'right');
  const itemsRightCombined = itemsRight ? [...itemsRight, ...copyItem] : copyItem;

  return (
    <ThemeProvider theme={theme}>
      <div>
        {(showFooterContact || isPreview) && (
          <FooterContact
            body={body}
            buttons={buttons}
          />
        )}
        <div
          css={{
            borderTop: `1px solid ${theme.color('gray-ll-alt')}`,
          }}
        >
          <Container
            customCSS={{
              fontFamily: theme.font('sans'),
              paddingBottom: theme.size(4),
              paddingTop: theme.size(4),
            }}
          >
            <div
              css={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'space-between',
                paddingBottom: theme.size(1),
                [theme.mq('sm')]: {
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                },
              }}
            >
              <div
                css={{
                  [theme.mq('sm')]: {
                    width: '33%',
                  }
                }}
              >
                {itemsLeft.map(item =>
                  <FooterItem item={item} key={item.body} />
                )}
              </div>
              {itemsRightCombined && (
                <div
                css={{
                  [theme.mq('sm')]: {
                    width: '33%',
                  }
                }}
              >
                  {itemsRightCombined.map(item =>
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
                  body
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