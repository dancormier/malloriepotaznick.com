/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Container from '../components/Container';
import theme from '../components/Utility/theme';

const icons = (name) => {
  switch (name) {
    case "envelope":
      return <FaEnvelope />;
    case "map":
      return <FaMapMarkerAlt />
    case "phone":
      return <FaPhone />
    default:
      return null;
  }
};

const group = (items, grouping) => items.filter(item => item.align === grouping);
const SuperbarItem = ({ item }) => {
  const {
    align,
    icon,
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
        {icons(icon)}
        <span css={{ marginLeft: theme.size(-1) }}>
          {text}
        </span>
      </div>
    </ThemeProvider>
  );
}

export const SuperbarTemplate = ({ items }) => (
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
            <SuperbarItem item={item} key={item.text} />
          )}
        </div>
        <div
          css={{
            display: 'flex',
          }}
        >
          {group(items, 'right').map(item =>
            <SuperbarItem item={item} key={item.text} />
          )}
        </div>
      </Container>
    </div>
  </ThemeProvider>
);

SuperbarTemplate.propTypes = {
  items: PropTypes.any,
}

const Superbar = () => (
  <StaticQuery
    query={graphql`
      query Superbar {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "_superbar" } }}
        ) {
          edges {
            node {
              frontmatter {
                items {
                  align
                  icon
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
        <SuperbarTemplate items={items} />
      )
    }}
  />
);

export default Superbar;