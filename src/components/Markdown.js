// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import showdown from 'showdown'

const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

const Markdown = ({
  customCSS,
  children,
}) => (
  <div
    css={customCSS}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(children)}}
  />
);

export default Markdown;