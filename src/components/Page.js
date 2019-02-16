// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Markdown from './Utility/Markdown';
import theme from './Utility/theme';
import Container from './Container';
import Heading from './Heading';

const style = {
  paddingBottom: theme.size(4),
  [theme.mq('md')]: {
    paddingBottom: theme.size(9),
    paddingTop: theme.size(2),
  },
};

const Page = ({
  body,
  customCSS,
  children,
  headerImage,
  heading,
}) => (
  <div css={{...style, ...customCSS}}>
    {headerImage && (
      <div
        css={{
          backgroundImage: `url(${headerImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: theme.size(14),
          marginTop: theme.size(2),
        }}
      />
    )}
    <Container>
      <Heading
        Tag='h2'
        customCSS={{
          marginBottom: theme.size(6),
        }}
      >
        {heading}
      </Heading>
      {children}
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
    </Container>
  </div>
);

export default Page;
