// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'

const accentStyle = {
  background: theme.color('accent'),
  content: '""',
  display: 'block',
  height: theme.size(-5),
  left: 0,
  position: 'absolute',
  top: `-${theme.size(4)}`,
  width: theme.size(12),
};

const style = (tag) => {
  switch(tag) {
    case 'h1':
      return {
        fontSize: theme.size(8),
        lineHeight: theme.size(8),
        [theme.mq('sm')]: {
          fontSize: theme.size(9),
          lineHeight: theme.size(9),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(10),
          lineHeight: theme.size(10),
        },
      }
    case 'h2':
      return {
        fontSize: theme.size(6),
        lineHeight: theme.size(7),
        [theme.mq('sm')]: {
          fontSize: theme.size(7),
          lineHeight: theme.size(7),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(9),
          lineHeight: theme.size(9),
        },
      }
    case 'h3':
      return {
        fontSize: theme.size(5),
        [theme.mq('sm')]: {
          fontSize: theme.size(6),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(7),
        },
      }
    case 'h4':
      return {
        fontSize: theme.size(4),
        [theme.mq('sm')]: {
          fontSize: theme.size(5),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(6),
        },
      }
    case 'h5':
      return {
        fontSize: theme.size(3),
        [theme.mq('sm')]: {
          fontSize: theme.size(4),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(5),
        },
      }
    case 'h6':
      return {
        fontSize: theme.size(2),
        [theme.mq('sm')]: {
          fontSize: theme.size(3),
        },
        [theme.mq('lg')]: {
          fontSize: theme.size(4),
        },
      }
    default:
      return {}
  }
}

const Heading = ({
  accent,
  customCSS,
  children,
  Tag = 'h3',
}) => (
  <Tag css={{
    fontWeight: 500,
    margin: 'auto',
    position: 'relative',
    ...style(Tag),
    '&:after': accent && { ...accentStyle },
    ...customCSS,
  }}>
    {children}
  </Tag>
);

export default Heading;