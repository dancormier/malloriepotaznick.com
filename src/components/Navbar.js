import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Button from './Button'
import Container from './Container'
import theme from './theme'
import { Link } from 'gatsby'

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
  }
]

const contactBarItems = [
  {
    label: 'address',
    text: '9732 W Sample Rd, Coral Springs, FL 33065',
    icon: <FaMapMarkerAlt />,
  }, {
    label: 'email',
    text: 'malloriepotaznick@gmail.com',
    icon: <FaEnvelope />,
  }, {
    label: 'phone',
    text: '(561) 536-3980‬',
    icon: <FaPhone />,
  }
]

const Navbar = class extends React.Component {
  render() {
    return (
      <div
        css={{
          position: 'relative',
          zIndex: 10,
        }}
      >
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
              paddingTop: theme.size(1),
              paddingBottom: theme.size(1),
            }}
          >
            {contactBarItems.map(c =>
              <div
                key={c.label}
                css={{
                  alignItems: 'center',
                  display: 'flex',
                  marginRight: c.label === 'address' && 'auto',
                  marginLeft: c.label !== 'address' && theme.size(2),
                }}
              >
                {c.icon}
                <span css={{ marginLeft: theme.size(-1) }}>
                  {c.text}
                </span>
              </div>
            )}
          </Container>
        </div>
        <nav
          role="navigation"
          aria-label="main-navigation"
          css={{
            background: 'linear-gradient(#ffffff, transparent)',
          }}
        >
          <div
            css={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: theme.prop('max'),
              margin: 'auto',
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
          </div>
        </nav>
      </div>
    )
  }
}
export default Navbar;