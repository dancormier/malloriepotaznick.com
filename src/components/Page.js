// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';
import Markdown from './Utility/Markdown';
import theme from './Utility/theme';
import Container from './Container';
import Heading from './Heading';

const style = {
  paddingBottom: theme.size(4),
};

const Page = ({
  author,
  body,
  customCSS,
  children,
  headerImage,
  heading,
  prebody,
}) => (
  <div css={{...style, ...customCSS}}>
    {headerImage && (
      <div
        css={{
          backgroundColor: theme.color('gray-ll'),
          backgroundImage: `url(${headerImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: theme.size(14),
          marginBottom: theme.size(1),
          [theme.mq('sm')]: {
            height: theme.size(19),
            marginBottom: theme.size(8),
          },
          }}
      />
    )}
    <Container
      customCSS={{
        paddingTop: !headerImage && theme.size(0),
        [theme.mq('sm')]: {
          paddingTop: !headerImage && theme.size(6),
        }
      }}
    >
      <Heading
        Tag='h2'
        customCSS={{
          marginBottom: theme.size(1),
          [theme.mq('sm')]: {
            marginBottom: theme.size(4),
          },
        }}
      >
        {heading}
      </Heading>
      {author && (
        <div
          css={{
            marginBottom: theme.size(2),
            [theme.mq('sm')]: {
              fontSize: theme.size(2),
              marginBottom: theme.size(4),
            },
          }}
        >
          <span>by </span>
          <Link
            to="/"
            title="Mallorie Potaznick, LMHC"
            css={{
              color: theme.color('accent'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Mallorie Potaznick
          </Link>
        </div>
      )}
      {prebody}
      {body && (
        <Markdown
          customCSS={{
            'p': {
              fontSize: theme.size(1),
              lineHeight: theme.size(3),
            },
            [theme.mq('sm')]: {
              marginBottom: theme.size(8),
              'p': {
                fontSize: theme.size(2),
                lineHeight: theme.size(5),
              }
            },
          }}
        >
          {body}
        </Markdown>
      )}
      {children}
    </Container>
  </div>
);

export default Page;
