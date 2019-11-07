import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { event } from 'react-ga'
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FaBars, FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import ReactHoverObserver from 'react-hover-observer';
import Button from '../components/Button';
import Container from '../components/Container'
import theme from '../components/Utility/theme';
import { formatInternalLink, replaceSpaceWithString } from '../components/Utility/util';

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
      onClick={() => {
        event({
          category: 'header',
          action: '/',
          label: 'logo',
        });
      }}
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
            href={formatInternalLink(l.url)}
            customCSS={{
              marginLeft: theme.size(4),
            }}
            onClick={() => {
              event({
                category: 'header.button',
                action: formatInternalLink(l.url),
                label: replaceSpaceWithString(l.text),
              });
            }}
          >
            {l.text}
          </Button>
        ) : (
          <ReactHoverObserver
            key={l.text}
            css={{
              position: 'relative',
            }}
          >
            {({ isHovering }) => {
              const showSublinks = isHovering && l.sublinks;

              const linkStyle = {
                color: theme.color(linkIsActive(l.url, pathname) ? 'accent' : 'primary'),
                display: 'block',
                fontSize: theme.size(2),
                margin: theme.size(2),
                marginLeft: theme.size(5),
                padding: `${theme.size(2)} 0`,
                pointerEvents: (linkIsActive(l.url, pathname) || !l.url) && 'none',
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
                  position: 'absolute',
                  top: '100%',
                  width: '100%',
                },
              };

              const sublinkStyle = {
                borderRadius: showSublinks && '3px 3px 0 0',
                boxShadow: showSublinks && '0 0 20px rgba(0,0,0,.2)',
                margin: `-${theme.size(2)}`,
                padding: theme.size(2),
              };

              return l.sublinks ? (
                <div>
                  <div
                    css={{...linkStyle, ...sublinkStyle}}
                  >
                    <span
                      css={{
                        color: isHovering && theme.color('accent'),
                      }}
                    >
                      {l.text}
                    </span>
                    {l.sublinks && (
                      <FaAngleDown
                        css={{
                          color: theme.color(isHovering ? 'accent' : 'gray-l'),
                          marginBottom: `-${theme.size(-6)}`,
                          marginLeft: theme.size(-2),
                          marginRight: `-${theme.size(-2)}`,
                        }}
                      />
                    )}
                  </div>
                  {isHovering && l.sublinks && (
                    <div
                      css={{
                        background: theme.color('white'),
                        boxShadow: '0 6px 6px rgba(0,0,0,.1)',
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
                          to={formatInternalLink(sl.url)}
                          title={sl.text}
                          css={{
                            borderBottom: '1px solid #eeeeee',
                            color: theme.color(linkIsActive(sl.url, pathname) ? 'accent' : 'primary'),
                            display: 'block',
                            fontSize: theme.size(2),
                            padding: theme.size(1),
                            paddingRight: theme.size(5),
                            pointerEvents: linkIsActive(sl.url, pathname) && 'none',
                            position: 'relative',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                              color: theme.color('accent'),
                            },
                          }}
                          onClick={() => {
                            event({
                              category: 'header.link',
                              action: formatInternalLink(sl.url),
                              label: replaceSpaceWithString(sl.text),
                            });
                          }}
                        >
                          {sl.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link
                    key={`${l.text}-${l.url}`}
                    to={formatInternalLink(l.url) || '#'}
                    title={l.text}
                    css={linkStyle}
                    onClick={() => {
                      event({
                        category: 'header.link',
                        action: formatInternalLink(l.url),
                        label: replaceSpaceWithString(l.text),
                      });
                    }}
                  >
                    <span
                      css={{
                        color: isHovering && theme.color('accent'),
                      }}
                    >
                      {l.text}
                    </span>
                  </Link>
                </div>
              )
            }}
          </ReactHoverObserver>
        )
      ))}
    </div>
  )
};

const NavMenu = ({ links, pathname, sublinksVisible, toggleSublinks }) => {
  return (
    <div
      css={{
        borderBottom: '1px solid #eeeeee',
      }}
    >
      {links.map((l, idx) => {
        const showSublinks = sublinksVisible === idx;
        const Angle = showSublinks ? FaAngleUp : FaAngleDown;
        const linkStyle = {
          color: theme.color(l.button ? 'white' : theme.color(linkIsActive(l.url, pathname) ? 'accent' : 'primary')),
          display: 'block',
          fontSize: theme.size(2),
          paddingBottom: theme.size(3),
          paddingTop: theme.size(3),
          position: 'relative',
          textAlign: 'center',
          textDecoration: 'none',
        }
        return l.enabled && (
          <Container
            customCSS={{
              background: l.button && theme.color('accent'),
              borderTop: `1px solid ${theme.color(l.button ? 'accent' : 'gray-l' )}`,
              fontFamily: theme.font('sans'),
            }}
            key={`${l.text}-${l.url}`}
          >
            {l.sublinks ? (
              <div>
                <div
                  onClick={() => {
                    toggleSublinks(showSublinks ? null : idx);
                    event({
                      category: 'header.button',
                      action: showSublinks ? 'sublinks.open' : 'sublinks.close',
                      label: `toggle-sublinks`,
                    });
                  }}
                  css={linkStyle}
                >
                  <span>{l.text}</span>
                  {l.sublinks && (
                    <div
                      css={{
                        color: theme.color('gray'),
                        display: 'inline-block',
                        marginLeft: theme.size(-4),
                        marginRight: `-${theme.size(2)}`,
                      }}
                    >
                      <Angle
                        css={{
                          marginBottom: `-${theme.size(-6)}`,
                        }}
                      />
                    </div>
                  )}
                </div>
                {showSublinks && (
                  <div>
                    {l.sublinks && l.sublinks.map(sl => (
                      <Link
                        key={sl.text}
                        to={formatInternalLink(sl.url)}
                        title={sl.text}
                        css={{
                          ...linkStyle,
                          background: theme.color('gray-ll'),
                          borderTop: `1px solid ${theme.color('gray-l')}`,
                          color: theme.color('accent'),
                          margin: `0 -${theme.size(5)}`,
                        }}
                        onClick={() => {
                          event({
                            category: 'header.link',
                            action: formatInternalLink(sl.url),
                            label: replaceSpaceWithString(sl.text),
                          });
                        }}
                      >
                        {sl.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  to={formatInternalLink(l.url)}
                  title={l.text}
                  onClick={() => {
                    toggleSublinks(showSublinks ? null : idx);
                    event({
                      category: 'header.link',
                      action: formatInternalLink(l.url),
                      label: replaceSpaceWithString(l.text),
                    });
                  }}
                  css={linkStyle}
                >
                  <span>{l.text}</span>
                </Link>
              </div>

            )}
          </Container>
        )
      })}
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
    event({
      category: 'header.button',
      action: isVisible ? 'menu.close' : 'menu.open',
      label: `toggle-menu`,
    });
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
            [theme.mq('md')]: {
              paddingTop: theme.size(2),
              paddingBottom: theme.size(2),
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
              pathname={pathname}
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