/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Container from '../components/Container';
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
  copyright,
  items,
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
  copyright: PropTypes.string,
  items: PropTypes.any,
}

const Footer = () => (
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
                copyright
                items {
                  align
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
        copyright,
        items,
      } = frontmatter;

      return (
        <FooterTemplate
          copyright={copyright}
          items={items}
        />
      )
    }}
  />
);

export default Footer;