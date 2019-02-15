// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import { Link } from 'gatsby'

const style = {
  backgroundColor: theme.color('accent'),
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
}) => type ? (
  <button
    css={{
      ...style,
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
    css={{...style, ...customCSS}}
    onClick={onClick}
    title={children || 'Book a session'}
    to={url}
  >
    {children || 'Book a session'}
  </Link>
);

export default Button;
