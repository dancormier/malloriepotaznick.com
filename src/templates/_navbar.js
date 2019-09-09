import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FaBars, FaTimes } from 'react-icons/fa';
import ReactHoverObserver from 'react-hover-observer';
import Button from '../components/Button';
import Container from '../components/Container'
import theme from '../components/Utility/theme';

const linkIsActive = (slug, pathname) => {
  let path = pathname;
  if (path && path.charAt(0) === "/") {
    path = path.substr(1);
  };
  return slug === path;
};

const Logo = ({ heading, subheading }) => {
  return (
    <Link
      to="/"
      title={`${heading} | Home`}
      css={{
        color: theme.color('primary'),
        paddingRight: theme.size(2),
        textDecoration: 'none',
        '&:hover': {
          color: theme.color('accent'),
        },
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
            fontSize: theme.size(4),
            marginBottom: theme.size(-5),
            fontWeight: 400,
          },
          [theme.mq('lg')]: {
            fontSize: theme.size(5),
          },
          [theme.mq('xl')]: {
            fontSize: theme.size(6),
          },
        }}
      >
        {heading}
      </h1>
      <span
        css={{
          fontFamily: theme.font('sans'),
          fontSize: theme.size(0),
          [theme.mq('sm')]: {
            fontSize: theme.size(1),
          },
          [theme.mq('xl')]: {
            fontSize: theme.size(2),
          },
        }}
      >
        {subheading}
      </span>
    </Link>
  );
};

const NavLinks = ({ links, pathname }) => {
  return (
    <div
      css={{
        alignItems: 'center',
        background: 'transparent',
        display: 'flex',
        fontFamily: theme.font('sans'),
      }}
    >
      {links.map(l => l.enabled && (
        l.button ? (
          <Button
            key={l.text}
            url={l.url}
            customCSS={{
              marginLeft: theme.size(4),
            }}
          >
            {l.text}
          </Button>
        ) : (
          <ReactHoverObserver
            css={{
              position: 'relative',
            }}
          >
            {({ isHovering }) => (
              <div>
                <Link
                  key={l.url}
                  to={l.url || '#'}
                  title={l.text}
                  css={{
                    boxShadow: isHovering && l.sublinks && '0 0 20px rgba(0,0,0,.2)',
                    color: theme.color(linkIsActive(l.url, pathname) ? 'accent' : 'primary'),
                    display: 'block',
                    fontSize: theme.size(2),
                    margin: `-${theme.size(2)}`,
                    marginLeft: theme.size(5),
                    padding: theme.size(2),
                    pointerEvents: linkIsActive(l.url, pathname) && 'none',
                    position: 'relative',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: theme.color('accent'),
                    },
                    '&:after': linkIsActive(l.url, pathname) && {
                      background: theme.color('accent'),
                      content: '""',
                      display: 'block',
                      height: theme.size(-8),
                      marginTop: theme.size(-1),
                      position: 'absolute',
                      top: '100%',
                      width: '100%',
                    },
                  }}
                >
                  {l.text}
                </Link>
                {isHovering && l.sublinks && l.sublinks.length > 0 && (
                  <div
                    css={{
                      background: theme.color('white'),
                      boxShadow: '0 10px 10px rgba(0,0,0,.2)',
                      left: theme.size(5),
                      marginTop: theme.size(1),
                      position: 'absolute',
                      top: '100%',
                      zIndex: 2,
                    }}
                  >
                    {l.sublinks.map(sl => (
                      <Link
                        key={sl.url}
                        to={sl.url || '#'}
                        title={sl.text}
                        css={{
                          borderBottom: '1px solid #eeeeee',
                          color: theme.color(linkIsActive(sl.url, pathname) ? 'accent' : 'primary'),
                          display: 'block',
                          fontSize: theme.size(2),
                          padding: `${theme.size(1)} ${theme.size(1)}`,
                          pointerEvents: linkIsActive(sl.url, pathname) && 'none',
                          position: 'relative',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            color: theme.color('accent'),
                          },
                        }}
                      >
                        {sl.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </ReactHoverObserver>
        )
      ))}
    </div>
  )
};

const NavMenu = ({ links, sublinksVisible, toggleSublinks }) => {
  return (
    <div
      css={{
        borderBottom: '1px solid #eeeeee',
      }}
    >
      {links.map((l, idx) => l.enabled && (
        <Container
          customCSS={{
            background: l.button && theme.color('accent'),
            borderTop: `1px solid ${theme.color(l.button ? 'accent' : 'gray-l' )}`,
            fontFamily: theme.font('sans'),
          }}
          key={l.url}
        >
          <div>
            <Link
              to={l.url}
              title={l.text}
              onClick={() => toggleSublinks(sublinksVisible === idx ? null : idx)}
              css={{
                color: theme.color(l.button ? 'white' : 'primary'),
                display: 'block',
                fontSize: theme.size(2),
                paddingBottom: theme.size(3),
                paddingTop: theme.size(3),
                position: 'relative',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              <span>{l.text}</span>
              {l.sublinks && (
                <div
                  css={{
                    position: 'absolute',
                    right: 0,
                    transform: 'translateY(-50%)',
                    top: '50%',
                  }}
                >
                  {/* below, add some cool icon to show open/closed */}
                  {false && sublinksVisible === idx ? 'x' : '+'}
                </div>
              )}
            </Link>
            {sublinksVisible === idx && (
              <div>
                {l.sublinks && l.sublinks.map(sl => (
                  <Link
                    to={sl.url}
                    title={sl.text}
                    css={{
                      background: theme.color('gray-ll'),
                      borderTop: `1px solid ${theme.color('gray-l')}`,
                      color: theme.color('primary'),
                      display: 'block',
                      fontSize: theme.size(2),
                      margin: `0 -${theme.size(3)}`,
                      paddingBottom: theme.size(3),
                      paddingTop: theme.size(3),
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    {sl.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
      sublinksVisible: null,
    };
  }

  toggleMenu = (isVisible) => {
    this.setState({ menuVisible: !isVisible });
  }

  toggleSublinks = (sublinkID) => {
    this.setState({ sublinksVisible: sublinkID });
  }

  render() {
    const { toggleMenu, toggleSublinks } = this;
    const {
      heading,
      links,
      pathname,
      subheading,
    } = this.props;
    const { menuVisible, sublinksVisible } = this.state;

    console.log(sublinksVisible, 'slv')
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
            paddingBottom: theme.size(4),
            position: 'relative',
            [theme.mq('xl')]: {
              paddingTop: theme.size(5),
              paddingBottom: theme.size(5),
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
            <NavLinks
              links={links}
              pathname={pathname}
            />
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
            <NavMenu
              links={links}
              sublinksVisible={sublinksVisible}
              toggleSublinks={toggleSublinks}
            />
          </div>
        )}
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