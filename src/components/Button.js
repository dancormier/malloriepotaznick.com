// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import { Link } from 'gatsby'

const styleByType = (type) => {
  switch(type) {
    case 'secondary':
      return {
        backgroundColor: theme.color('white'),
        boxShadow: `0 3px 10px ${theme.color('black')}15, 0 8px 15px ${theme.color('black')}15`,
        color: theme.color('accent'),
        fontWeight: 700,
        transition: '.1s',
        '&:hover': {
          boxShadow: `0 3px 10px ${theme.color('black')}20`,
        },
        '&:active': {
          boxShadow: `0 2px 3px ${theme.color('black')}40`,
        },
      }
    case 'link':
      return {
        backgroundColor: 'none',
        color: theme.color('accent'),
        fontFamily: theme.font('serif'),
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        textDecoration: 'underline',
        textTransform: 'none',
      }
    default:
      return {
        backgroundColor: theme.color('accent'),
        boxShadow: `0 3px 10px ${theme.color('accent')}30, 0 8px 15px ${theme.color('accent')}30`,
        transition: '.2s',
        '&:hover': {
          boxShadow: `0 3px 10px ${theme.color('accent')}90`,
        },
        '&:active': {
          boxShadow: `0 2px 3px ${theme.color('accent')}90`,
        },
      }
  }
}

const style = {
  borderRadius: theme.size(8),
  color: theme.color('white'),
  cursor: 'pointer',
  display: 'block',
  fontFamily: theme.font('sans'),
  padding: theme.size(1),
  paddingLeft: theme.size(4),
  paddingRight: theme.size(4),
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  [theme.mq('xs')]: {
    display: 'inline-block',
    width: 'auto',
  },
};

const Button = ({
  customCSS,
  onClick,
  children,
  type,
  href,
}) => type === 'submit' ? (
  <button
    css={{
      ...style,
      ...styleByType(type),
      ...customCSS,
      width: '100%',
    }}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
) : href && href.indexOf('//') > -1 ? (
  <a
    css={{
      ...style,
      ...styleByType(type),
      ...customCSS
    }}
    onClick={onClick}
    alt={children || 'Book a session'}
    href={href}
  >
    {children || 'Book a session'}
  </a>
) : (
  <Link
    css={{
      ...style,
      ...styleByType(type),
      ...customCSS
    }}
    onClick={onClick}
    title={children || 'Book a session'}
    to={href}
  >
    {children || 'Book a session'}
  </Link>
);

export default Button;
