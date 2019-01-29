// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './theme'
import { Link } from 'gatsby'

const style = {
  backgroundColor: theme.color('accent'),
  borderRadius: theme.size(8),
  color: theme.color('white'),
  display: 'inline-block',
  fontFamily: theme.font('sans'),
  padding: theme.size(2),
  paddingLeft: theme.size(5),
  paddingRight: theme.size(5),
  textDecoration: 'none',
  textTransform: 'uppercase',
};

const Button = ({
  customCSS,
  onClick,
  children,
  url,
}) => (
  <Link
    to={url}
    title={children || 'Book a session'}
    onClick={onClick}
    css={{...style, ...customCSS}}
  >
    {children || 'Book a session'}
  </Link>
);

export default Button;
