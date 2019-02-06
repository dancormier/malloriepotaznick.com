/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import Button from '../components/Button';
import Container from '../components/Container'
import theme from '../components/Utility/theme';

const navLinks = [
  {
    label: 'About',
    url: '/about',
  }, {
    label: 'Blog',
    url: '/blog',
  }, {
    label: 'FAQ',
    url: '/questions',
  }, {
    label: 'Contact',
    url: '/contact',
  }, {
    label: 'Book a session',
    url: '#',
    button: true,
  },
];

export const NavbarTemplate = () => (
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
            Mallorie Potaznick, LMHC
          </h1>
          <span>Licensed Mental Health Counselor</span>
        </Link>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {navLinks.map(l => l.button ? (
            <Button
              key={l.label}
              url={l.url}
              customCSS={{
                marginLeft: theme.size(6),
              }}
            />
          ) : (
            <Link
              key={l.url}
              to={l.url}
              title={l.label}
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
              {l.label}
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  </ThemeProvider>
);

NavbarTemplate.propTypes = {
  nothing: PropTypes.any,
};

const Navbar = () => (
  <NavbarTemplate />
);

Navbar.propTypes = {
  nothing: PropTypes.any,
};

export default Navbar;