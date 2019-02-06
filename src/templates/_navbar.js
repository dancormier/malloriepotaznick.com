/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import Button from '../components/Button';
import Container from '../components/Container'
import theme from '../components/Utility/theme';

export const NavbarTemplate = ({
  heading,
  links,
  subheading,
}) => (
  <ThemeProvider theme={theme}>
    <nav
      role="navigation"
      aria-label="main-navigation"
      css={{
        background: 'linear-gradient(#ffffff, transparent)',
      }}
    >
      <Container
        customCSS={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.size(8),
          paddingBottom: theme.size(10),
    }}
      >
        <Link
          to="/"
          title="Mallorie Potaznick, LMHC | Home"
          css={{
            color: theme.color('primary'),
            fontSize: theme.size(2),
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <h1
            css={{
              fontSize: theme.size(6),
              marginBottom: theme.size(-5),
            }}
          >
            {heading}
          </h1>
          <span>{subheading}</span>
        </Link>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {links.map(l => l.enabled && (
            l.button ? (
              <Button
                key={l.text}
                url={l.url}
                customCSS={{
                  marginLeft: theme.size(6),
                }}
              >
                {l.text}
              </Button>
            ) : (
              <Link
                key={l.url}
                to={l.url}
                title={l.text}
                css={{
                  color: theme.color('primary'),
                  fontSize: theme.size(2),
                  marginLeft: theme.size(6),
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    color: theme.color('accent'),
                  }
                }}
              >
                {l.text}
              </Link>
            )
          ))}
        </div>
      </Container>
    </nav>
  </ThemeProvider>
);

NavbarTemplate.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.any,
  subheading: PropTypes.string,
};

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query Navbar {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "_navbar" } }}
        ) {
          edges {
            node {
              frontmatter {
                heading
                links {
                  button
                  enabled
                  text
                  url
                }
                subheading
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
        heading,
        links,
        subheading,
      } = frontmatter;

      return (
        <NavbarTemplate
          heading={heading}
          links={links}
          subheading={subheading}
        />
      );
    }}
  />
);

export default Navbar;