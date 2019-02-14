// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'gatsby'
import theme from './Utility/theme'
import Heading from './Heading'

const style = {
  paddingBottom: theme.size(8),
  '&:last-child': {
    paddingBottom: 0,
  },
};

const BlogItem = ({
  customCSS,
  date,
  excerpt,
  id,
  onClick,
  slug,
  title,
}) => (
  <div
    key={id}
    css={{ ...style, ...customCSS }}
  >
    <div
      css={{
        color: theme.color('gray'),
        fontSize: theme.size(0),
        marginBottom: theme.size(0),
      }}
    >
      {date}
    </div>
    <Heading
      Tag="h4"
      customCSS={{
        marginBottom: theme.size(2),
      }}
    >
      <Link
        css={{
          color: theme.color('accent'),
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          }
        }}
        onClick={onClick}
        to={slug}
      >
        {title}
      </Link>
    </Heading>
    <div
      css={{
        fontSize: theme.size(1),
        lineHeight: theme.size(3),
        marginBottom: theme.size(2),
        [theme.mq('sm')]: {
          fontSize: theme.size(2),
          lineHeight: theme.size(5),
        },
      }}
    >
      {excerpt}
    </div>
    <Link
      css={{
        color: theme.color('accent'),
      }}
      onClick={onClick}
      to={slug}
    >
      Read more →
    </Link>
  </div>
);

export default BlogItem;
