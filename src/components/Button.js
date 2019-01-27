// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import theme from './theme'
import { Link } from 'gatsby'

const style = {
  backgroundColor: theme.color('accent'),
  borderRadius: theme.size(8),
  color: theme.color('white'),
  fontFamily: theme.font('sans'),
  marginLeft: theme.size(4),
  padding: theme.size(2),
  paddingLeft: theme.size(5),
  paddingRight: theme.size(5),
  textDecoration: 'none',
  textTransform: 'uppercase',
};

const Button = ({
  css,
  onClick,
  children,
  url,
}) => (
  <ThemeProvider theme={theme}>
    <Link
      to={url}
      title={children || 'Book a session'}
      onClick={onClick}
      css={{...style, ...css}}
    >
      {children || 'Book a session'}
    </Link>
  </ThemeProvider>
);

export default Button;
