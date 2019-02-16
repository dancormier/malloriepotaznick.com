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
        border: `2px solid ${theme.color('accent')}`,
        color: theme.color('accent'),
        fontWeight: 700,
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
      }
  }
}

const style = {
  borderRadius: theme.size(8),
  color: theme.color('white'),
  display: 'block',
  fontFamily: theme.font('sans'),
  padding: theme.size(2),
  paddingLeft: theme.size(5),
  paddingRight: theme.size(5),
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
  url,
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
) : (
  <Link
    css={{
      ...style,
      ...styleByType(type),
      ...customCSS
    }}
    onClick={onClick}
    title={children || 'Book a session'}
    to={url}
  >
    {children || 'Book a session'}
  </Link>
);

export default Button;
