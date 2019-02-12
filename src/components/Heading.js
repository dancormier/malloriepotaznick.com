// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'

const style = (tag) => {
  switch(tag) {
    case 'h2':
      return {
        fontSize: theme.size(5),
        fontWeight: 700,
        marginBottom: theme.size(2),
        [theme.mq('sm')]: {
          fontSize: theme.size(7),
          fontWeight: 400,
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(8),
        },
      }
    case 'h3':
      return {
        fontSize: theme.size(5),
        fontWeight: 700,
        marginBottom: theme.size(5),
        [theme.mq('sm')]: {
          fontWeight: 400,
          fontSize: theme.size(7),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(8),
          marginBottom: theme.size(10),
          '&:after': {
            background: theme.color('accent'),
            content: '""',
            display: 'block',
            height: theme.size(-4),
            left: 0,
            position: 'absolute',
            top: `-${theme.size(5)}`,
            width: theme.size(13),
          },
        },
      }
    default:
      return {
        color: theme.color('accent'),
        fontSize: theme.size(4),
        marginBottom: theme.size(4),
      }
  }
}

const Heading = ({
  customCSS,
  children,
  Tag = 'h4',
}) => (
  <Tag css={{
    margin: 'auto',
    position: 'relative',
    ...style(Tag),
    ...customCSS,
  }}>
    {children}
  </Tag>
);

export default Heading;