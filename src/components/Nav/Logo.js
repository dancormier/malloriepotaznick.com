/** @jsx jsx */
import { jsx } from '@emotion/core';
import { event } from 'react-ga'
import { Link } from 'gatsby';
import theme from '../Utility/theme';

const Logo = ({ heading, subheading }) => {
  return (
    <Link
      to="/"
      title={`${heading} | Home`}
      onClick={() => {
        event({
          category: 'header',
          action: '/',
          label: 'logo',
        });
      }}
      css={{
        color: theme.color('primary'),
        paddingRight: theme.size(2),
        textDecoration: 'none',
        '&:hover': {
          color: theme.color('accent'),
        },
        [theme.mq('sm')]: {
          whiteSpace: 'nowrap',
        },
      }}
    >
      <h1
        css={{
          fontSize: theme.size(2),
          fontWeight: 700,
          [theme.mq('sm')]: {
            fontSize: theme.size(4),
            marginBottom: theme.size(-5),
            fontWeight: 400,
          },
          [theme.mq('lg')]: {
            fontSize: theme.size(5),
          },
        }}
      >
        {heading}
      </h1>
      <span
        css={{
          fontFamily: theme.font('sans'),
          fontSize: theme.size(0),
          [theme.mq('sm')]: {
            fontSize: theme.size(1),
          },
        }}
      >
        {subheading}
      </span>
    </Link>
  );
};

export default Logo;