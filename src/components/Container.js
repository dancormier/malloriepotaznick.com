// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './theme'

const style = {
  maxWidth: theme.prop('max'),
  margin: 'auto',
};

const Container = ({
  customCSS,
  children,
}) => (
  <div css={{...style, ...customCSS}}>
    {children}
  </div>
);

export default Container;
