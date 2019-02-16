// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Markdown from './Utility/Markdown'

const Subsection = ({
  customCSS,
  children,
}) => (
  <div
    css={{
      marginBottom: theme.size(4),
      'p': {
        fontSize: theme.size(1),
        lineHeight: theme.size(3),
      },
      [theme.mq('sm')]: {
        'p': {
          fontSize: theme.size(2),
          lineHeight: theme.size(5),
        }
      },
      ...customCSS,
    }}
  >
    <Markdown>
      {children}
    </Markdown>
  </div>
);

export default Subsection;