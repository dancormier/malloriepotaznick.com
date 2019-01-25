import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { ThemeProvider } from 'emotion-theming'
import theme from './theme'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
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
  }
]

const contactBarItems = [
  {
    label: 'address',
    text: '1234 Fake Street, Coral Springs, FL 33333',
    icon: <FaMapMarkerAlt />,
  }, {
    label: 'email',
    text: 'malloriepotaznick@gmail.com',
    icon: <FaEnvelope />,
  }, {
    label: 'phone',
    text: '561-111-1111',
    icon: <FaPhone />,
  }
]

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }
 }
 
 render() {
  const useDefault = true;

  return useDefault ? (
    <ThemeProvider theme={theme}>
      <div
        css={{
          backgroundColor: theme.color('accent'),
          color: theme.color('white'),
        }}
      >
        <div
          css={{
            display: 'flex',
            fontSize: theme.size(0),
            // alignItems: 'center',
            // justifyContent: 'space-between',
            maxWidth: theme.prop('max'),
            margin: 'auto',
            paddingTop: theme.size(1),
            paddingBottom: theme.size(1),
          }}
        >
          {contactBarItems.map(c =>
            <div
              css={{
                marginRight: c.label === 'address' ? 'auto' : theme.size(1),
              }}
            >
              {c.icon} {c.text}
            </div>
          )}
        </div>
      </div>
      <nav role="navigation" aria-label="main-navigation">
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: theme.prop('max'),
            margin: 'auto',
            paddingTop: theme.size(4),
            paddingBottom: theme.size(6),
          }}
        >
          <Link
            to="/"
            title="Logo"
            css={{
              color: theme.color('primary'),
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <h1
              css={{
                fontSize: theme.size(5),
                marginBottom: theme.size(-3),
              }}
            >
              Mallorie Potaznick, LMHC
            </h1>
            <span>Licensed Mental Health Counselor</span>
          </Link>
          <div
            css={{
              display: 'flex',
            }}
          >
            {navLinks.map(l =>
              <Link
                key={l.url}
                to={l.url}
                css={{
                  marginLeft: theme.size(1),
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </ThemeProvider>
  ) : (
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <h1 className="has-text-weight-bold is-size-2">Mallorie Potaznick, LMHC</h1>
          </Link>
        </div>
      </div>
    </nav>
  )}
}

export default Navbar
