// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import showdown from 'showdown'
import theme from './theme'

const converter = new showdown.Converter({tables: true});
converter.setOption('noHeaderId', true);

const Markdown = ({
  children,
  customCSS,
  invert,
}) => (
  <div
    className="markdown-body"
    css={{
      '&.markdown-body': {
        color: invert && theme.color('white'),
        fontFamily: theme.font('serif'),
        'a': {
          color: theme.color('accent'),
        },
        'h1': {
          color: theme.color('accent'),
          fontSize: '1.75em',
          fontWeight: 500,
        },
        'h2': {
          borderBottom: 'none',
          color: theme.color('accent'),
          fontSize: '1.75em',
          fontWeight: 500,
        },
        'p + h1, p + h2, p + h3, p + h4': {
          marginTop: theme.size(8),
        },
        ...customCSS,
      }
    }}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(children)}}
  />
);

export default Markdown;