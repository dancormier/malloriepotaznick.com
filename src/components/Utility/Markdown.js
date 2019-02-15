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
        'h2': {
          color: theme.color('accent'),
          fontWeight: 500,
        },
        ...customCSS,
      }
    }}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(children)}}
  />
);

export default Markdown;