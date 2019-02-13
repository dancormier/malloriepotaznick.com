// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import showdown from 'showdown'
import theme from './theme'

const converter = new showdown.Converter({tables: true});
converter.setOption('noHeaderId', true);

const Markdown = ({
  customCSS,
  children,
}) => (
  <div
    className="markdown-body"
    css={{
      '&.markdown-body': {
        fontFamily: theme.font('serif'),
        'a': {
          color: theme.color('accent'),
        },
        ...customCSS,
      }
    }}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(children)}}
  />
);

export default Markdown;