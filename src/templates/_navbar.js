import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { event } from 'react-ga';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { FaBars, FaTimes } from 'react-icons/fa';
import Container from '../components/Container';
import Logo from '../components/Nav/Logo';
import NavLink from '../components/Nav/Link';
import theme from '../components/Utility/theme';

export const NavbarTemplate = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    };
  }

  toggleMenu = (isVisible) => {
    this.setState({ menuVisible: !isVisible });
    event({
      category: 'header.button',
      action: isVisible ? 'menu.close' : 'menu.open',
      label: `toggle-menu`,
    });
  }

  render() {
    const { toggleMenu } = this;
    const {
      heading,
      links,
      pathname,
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
            justifyContent: 'space-between',
            paddingTop: theme.size(4),
            paddingBottom: theme.size(4),
            position: 'relative',
            [theme.mq('md')]: {
              paddingTop: theme.size(2),
              paddingBottom: theme.size(2),
            },
            [theme.mq('lg')]: {
              display: 'flex',
            },
          }}
        >
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
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
          </div>
          <div
            css={{
              alignItems: 'stretch',
              background: theme.color('white'),
              borderBottom: '1px solid #eeeeee',
              borderTop: '1px solid #eeeeee',
              display: menuVisible ? 'flex' : 'none',
              flexDirection: 'column',
              fontFamily: theme.font('sans'),
              left: 0,
              position: 'absolute',
              top: '100%',
              width: '100%',
              zIndex: 100,
              [theme.mq('lg')]: {
                alignItems: 'center',
                background: 'transparent',
                borderBottom: 'none',
                borderTop: 'none',
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                width: 'auto',
              },
            }}
          >
            {links.map(l => l.enabled && (
              <NavLink
                key={l.text}
                button={l.button}
                links={l.sublinks}
                pathname={pathname}
                text={l.text}
                url={l.url}
              />
            ))}
          </div>
        </Container>
      </nav>
    );
  };
};

NavbarTemplate.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.any,
  pathname: PropTypes.string,
  subheading: PropTypes.string,
};

const Navbar = ({ pathname }) => (
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
                  sublinks {
                    enabled
                    text
                    url
                  }
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
          pathname={pathname}
          subheading={subheading}
        />
      );
    }}
  />
);

export default Navbar;