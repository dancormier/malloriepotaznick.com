/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import Container from '../components/Container';
import theme from '../components/Utility/theme';

const group = (items, grouping) => items.filter(item => item.align === grouping);
const FooterItem = ({ item }) => {
  const {
    align,
    text,
  } = item;

  return (
    <ThemeProvider theme={theme}>
      <div
        key={text}
        css={{
          alignItems: 'center',
          display: 'flex',
          marginRight: align === 'left' && theme.size(2),
          marginLeft: align === 'right' && theme.size(2),
        }}
      >
        {text}
      </div>
    </ThemeProvider>
  );
}

export const FooterTemplate = ({ items }) => (
  <ThemeProvider theme={theme}>
    <div
      css={{
        backgroundColor: theme.color('accent'),
        color: theme.color('white'),
      }}
    >
      <Container
        customCSS={{
          display: 'flex',
          fontFamily: theme.font('sans'),
          fontSize: theme.size(0),
          justifyContent: 'space-between',
          paddingTop: theme.size(1),
          paddingBottom: theme.size(1),
        }}
      >
        <div>
          {group(items, 'left').map(item =>
            <FooterItem item={item} key={item.text} />
          )}
        </div>
        <div css={{ display: 'flex' }}>
          {group(items, 'right').map(item =>
            <FooterItem item={item} key={item.text} />
          )}
        </div>
      </Container>
    </div>
  </ThemeProvider>
);

FooterTemplate.propTypes = {
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
                items {
                  align
                  text
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const frontmatter = edges[0].node.frontmatter;
      const {
        items,
      } = frontmatter;

      return (
        <FooterTemplate items={items} />
      )
    }}
  />
);

export default Footer;