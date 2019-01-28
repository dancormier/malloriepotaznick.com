import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Button from './Button'
import Container from './Container'
import theme from './theme'
import { Link } from 'gatsby'
// import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'

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
      <div>
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
        <nav role="navigation" aria-label="main-navigation">
          <div
            css={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: theme.prop('max'),
              margin: 'auto',
              paddingTop: theme.size(8),
              paddingBottom: theme.size(10),
              // textAlign: 'center', // temporary
              // width: '100%', // temporary
            }}
          >
            <Link
              to="/"
              title="Mallorie Potaznick, LMHC | Home"
              css={{
                color: theme.color('primary'),
                // margin: 'auto', // temporary
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <h1
                css={{
                  fontSize: theme.size(5),
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
                  url={l.url}
                  customCSS={{
                    marginLeft: theme.size(4),
                  }}
                />
              ) : (
                <Link
                  key={l.url}
                  to={l.url}
                  title={l.label}
                  css={{
                    color: theme.color('primary'),
                    marginLeft: theme.size(4),
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
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
export default Navbar
