// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'gatsby'
import theme from './Utility/theme'
import Heading from './Heading'
import ImageHeading from './Image-heading'

const style = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.size(8),
  '&:last-child': {
    paddingBottom: 0,
  },
  [theme.mq('md')]: {
    width: '48%',
  },
};

const BlogItem = ({
  customCSS,
  date,
  excerpt,
  id,
  onClick,
  slug,
  thumb,
  title,
}) => (
  <div
    key={id}
    css={{ ...style, ...customCSS }}
  >
    {thumb && (
      <ImageHeading
        onClick={onClick}
        slug={slug}
        thumb={thumb}
      />
    )}
    <div>
      <Heading
        Tag="h4"
        customCSS={{
          marginBottom: theme.size(2),
        }}
      >
        <Link
          css={{
            color: theme.color('accent'),
            lineHeight: theme.size(7),
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
          color: theme.color('gray'),
          fontSize: theme.size(0),
          marginBottom: theme.size(0),
        }}
      >
        {date}
      </div>
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
  </div>
);

export default BlogItem;
