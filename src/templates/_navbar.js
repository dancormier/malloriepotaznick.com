import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../components/Button';
import Container from '../components/Container'
import theme from '../components/Utility/theme';

const Logo = ({ heading, subheading }) => {
  return (
    <Link
      to="/"
      title={`${heading} | Home`}
      css={{
        color: theme.color('primary'),
        paddingRight: theme.size(2),
        textDecoration: 'none',
        [theme.mq('sm')]: {
          whiteSpace: 'nowrap',
        },
      }}
    >
      <h1
        css={{
          fontSize: theme.size(2),
          fontWeight: 700,
          [theme.mq('sm')]: {
            fontSize: theme.size(6),
            marginBottom: theme.size(-5),
            fontWeight: 500,
          },
        }}
      >
        {heading}
      </h1>
      <span
        css={{
          fontSize: theme.size(0),
          [theme.mq('sm')]: {
            fontSize: theme.size(2),
          },
        }}
      >
        {subheading}
      </span>
    </Link>
  );
};

const NavLinks = ({ links }) => {
  return (
    <div
      css={{
        alignItems: 'center',
        background: 'transparent',
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
              display: 'block',
              fontSize: theme.size(2),
              marginLeft: theme.size(6),
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: theme.color('accent'),
              },
            }}
          >
            {l.text}
          </Link>
        )
      ))}
    </div>
  )
};

const NavMenu = ({ links }) => {
  return (
    <div
      css={{
        borderBottom: '1px solid #eeeeee',
      }}
    >
      {links.map(l => l.enabled && (
        <Container
          customCSS={{
            borderTop: '1px solid #eeeeee',
          }}
          key={l.url}
        >
          <Link
            to={l.url}
            title={l.text}
            css={{
              color: l.button ? theme.color('accent') : theme.color('primary'),
              display: 'block',
              fontSize: theme.size(2),
              paddingBottom: theme.size(3),
              paddingTop: theme.size(3),
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            {l.text}
          </Link>
        </Container>
      ))}
    </div>
  )
};

export const NavbarTemplate = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    };
  }

  toggleMenu = (isVisible) => {
    this.setState({ menuVisible: !isVisible });
  }

  render() {
    const { toggleMenu } = this;
    const {
      heading,
      links,
      subheading,
    } = this.props;
    const { menuVisible } = this.state;

    return (
      <nav
        role="navigation"
        aria-label="main-navigation"
        css={{
          background: theme.color(menuVisible ? 'white' : 'whiteToTransparent'),
          position: 'relative',
        }}
      >
        <Container
          customCSS={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: theme.size(4),
            paddingBottom: theme.size(5),
            position: 'relative',
            [theme.mq('lg')]: {
              paddingTop: theme.size(8),
              paddingBottom: theme.size(9),
            },
          }}
        >
          <Logo
            heading={heading}
            subheading={subheading}
          />
          <div
            onClick={() => toggleMenu(menuVisible)}
            css={{
              color: theme.color('black'),
              display: 'flex',
              fontSize: theme.size(4),
              [theme.mq('sm')]: {
                fontSize: theme.size(5),
              },
              [theme.mq('lg')]: {
                display: 'none',
              },
            }}
          >
            {menuVisible ? <FaTimes /> : <FaBars />}
            
          </div>
          <div
            css={{
              display: 'none',
              [theme.mq('lg')]: {
                display: 'block',
              },
            }}
          >
            <NavLinks links={links} />
          </div>
        </Container>
        {menuVisible && (
          <div
            css={{
              background: theme.color('white'),
              left: 0,
              position: 'absolute',
              right: 0,
              top: '100%',
              zIndex: 10,
              [theme.mq('lg')]: {
                display: 'none',
              },
            }}
          >
            <NavMenu links={links} />
          </div>
        )}
      </nav>
    );
  };
};

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