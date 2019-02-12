// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Heading from './Heading'
import Markdown from './Utility/Markdown'

const Subsection = ({
  customCSS,
  children,
  heading,
}) => (
  <div
    css={{
      ...customCSS,
    }}
  >
    <Heading
      Tag='h4'
    >
      {heading}
    </Heading>
    <div
      css={{
        fontSize: theme.size(1),
        lineHeight: theme.size(3),
        marginBottom: theme.size(6),
        [theme.mq('sm')]: {
          fontSize: theme.size(2),
          lineHeight: theme.size(4),
          marginBottom: theme.size(8),
        },
      }}
    >
      <Markdown>
        {children}
      </Markdown>
    </div>
  </div>
);

export default Subsection;