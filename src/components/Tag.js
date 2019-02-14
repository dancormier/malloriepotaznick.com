// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { kebabCase } from 'lodash'
import theme from './Utility/theme'
import Button from './Button'

const style = {
  display: 'inline-block',
  fontSize: theme.size(0),
  marginRight: theme.size(0),
  padding: theme.size(0),
  paddingLeft: theme.size(0),
  paddingRight: theme.size(0),
};

const Tag = ({
  children,
  customCSS,
  onClick,
  tag,
}) => (
  <Button
    customCSS={{...style, ...customCSS}}
    onClick={onClick}
    url={`/tags/${kebabCase(tag)}/`}
  >
    {children || tag}
  </Button>
);

export default Tag;
