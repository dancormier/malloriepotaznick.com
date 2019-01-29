// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './theme'

const style = {
  fontSize: theme.size(8),
  maxWidth: theme.prop('max'),
  margin: 'auto',
  marginBottom: theme.size(6),
};

const Heading = ({
  customCSS,
  children,
}) => (
  <h3 css={{...style, ...customCSS}}>
    {children}
  </h3>
);

export default Heading;
