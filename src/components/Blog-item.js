// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'gatsby'
import theme from './Utility/theme'
import Heading from './Heading'

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
      <Link
        css={{
          backgroundImage: `url(${thumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: `1px solid ${theme.color('white')}`,
          borderRadius: '3px',
          flexShrink: 0,
          height: theme.size(15),
          marginBottom: theme.size(4),
          position: 'relative',
          transition: '.2s',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0,0,0,.2)',
            transform: 'scale(1.02)',
          }
        }}
        onClick={onClick}
        to={slug}
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
