// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/react'
import theme from './Utility/theme'
import Markdown from './Utility/Markdown'
import Heading from './Heading'
import ImageHeading from './Image-heading'

const Subsection = ({
  customCSS,
  children,
  image,
  slug,
  title,
}) => (
  <div
    css={{
      borderTop: `1px solid ${theme.color('gray-ll-alt')}`,
      marginBottom: theme.size(4),
      paddingTop: theme.size(2),
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
      [theme.mq('lg')]: {
        borderTop: 'none',
        paddingTop: 0,
      },
      ...customCSS,
    }}
  >
    {image && (
      <ImageHeading
        thumb={image}
        slug={slug}
      />
    )}
    {title && (
      <Heading
        Tag="h6"
        customCSS={{
          marginBottom: theme.size(2),
          [theme.mq('lg')]: {
            color: theme.color('accent'),
            marginBottom: theme.size(3),
          }
        }}
      >
        {title}
      </Heading>
    )}
    <Markdown>
      {children}
    </Markdown>
  </div>
);

export default Subsection;