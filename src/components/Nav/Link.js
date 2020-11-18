import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';
import { event } from 'react-ga';
import { FaAngleDown } from 'react-icons/fa';
import Button from '../Button';
import theme from '../Utility/theme';
import { formatInternalLink, linkIsActive, replaceSpaceWithString } from '../Utility/util';

const NavLink = ({
  button = false,
  links,
  pathname,
  text,
  url,
}) => {
  const [open, setOpen] = React.useState(false);
  const active = React.useMemo(() => {
    return linkIsActive(url, pathname);
  }, [pathname, url]);

  const linkStyle = {
    borderBottom: '1px solid #eeeeee',
    color: theme.color(active ? 'accent' : 'primary'),
    display: 'block',
    fontSize: theme.size(2),
    padding: `${theme.size(2)} 0`,
    pointerEvents: (active) && 'none',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    '&:hover, &:focus': {
      color: theme.color('accent'),
    },
    [theme.mq('lg')]: {
      borderBottom: 'none',
      margin: theme.size(2),
      marginLeft: theme.size(5),
      '&:after': active && {
        background: theme.color('accent'),
        content: '""',
        display: 'block',
        height: theme.size(-8),
        position: 'absolute',
        top: '100%',
        width: '100%',
      },
    },
    ...(links && {
      borderRadius: open && '3px 3px 0 0',
      padding: 0,
      width: '100%',
      [theme.mq('lg')]: {
        borderBottom: 'none',
        boxShadow: open && '0 0 20px rgba(0,0,0,.2)',
        padding: theme.size(2),
        margin: `-${theme.size(2)}`,
      },  
    }),
  };

  const handleMenu = React.useCallback((shouldOpen) => {
    setTimeout(() => setOpen(shouldOpen), 100);
    event({
      category: 'header.button',
      action: shouldOpen ? 'menu.close' : 'menu.open',
      label: `toggle-menu`,
    });
  }, []);
  return button ? (
    <Button
      href={formatInternalLink(url)}
      customCSS={{
        display: 'block',
        margin: `${theme.size(1)} ${theme.size(3)}`,
        textTransfrom: 'none',
        width: '100%',
        [theme.mq('lg')]: {
          margin: 0,
          marginLeft: theme.size(4),
          width: 'auto',
        },
      }}
      onClick={() => {
        event({
          category: 'header.button',
          action: formatInternalLink(url),
          label: replaceSpaceWithString(text),
        });
      }}
    >
      {text}
    </Button>
  ) : links ? (
    <button
      css={linkStyle}
      onClick={() => handleMenu(!open)}
      onFocus={() => handleMenu(true)}
      onMouseEnter={() => handleMenu(true)}
      onMouseLeave={() => handleMenu(false)}
    >
      <div
        css={{
          padding: theme.size(2),
          [theme.mq('lg')]: {
            padding: 0,
          },
        }}
      >
        <span
          css={{
            color: (active || open) && theme.color('accent'),
            padding: `${theme.size(2)} 0`,
          }}
        >
          {text}
        </span>
        <FaAngleDown
          css={{
            color: theme.color(open ? 'accent' : 'gray-l'),
            marginBottom: `-${theme.size(-6)}`,
            marginLeft: theme.size(-2),
            marginRight: `-${theme.size(-2)}`,
          }}
        />
      </div>
      <div
        css={{
          background: theme.color('gray-ll'),
          [theme.mq('lg')]: {
            background: theme.color('white'),
            boxShadow: '0 6px 6px rgba(0,0,0,.1)',
            height: open ? 'auto' : 0,
            left: 0,
            overflow: open ? 'visible' : 'hidden',
            position: 'absolute',
            textAlign: 'left',
            top: '100%',
            zIndex: 2,
          },
        }}
      >
        {open && links.map(l => (
          <Link
            key={l.text}
            to={formatInternalLink(l.url) || '#'}
            title={l.text}
            css={{
              borderTop: '1px solid #eeeeee',
              color: theme.color(linkIsActive(l.url, pathname) ? 'accent' : 'primary'),
              display: 'block',
              fontSize: theme.size(2),
              padding: theme.size(1),
              paddingRight: theme.size(5),
              pointerEvents: linkIsActive(l.url, pathname) && 'none',
              position: 'relative',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover, &:focus': {
                color: theme.color('accent'),
              },
              [theme.mq('lg')]: {
                borderBottom: '1px solid #eeeeee',
                borderTop: 'none',
              },
            }}
          >
            {l.text}
          </Link>
        ))}
      </div>
    </button>
  ) : (
    <Link
      to={formatInternalLink(url) || '#'}
      title={text}
      css={linkStyle}
      onClick={() => {
       event({
          category: 'header.link',
          action: formatInternalLink(url),
          label: replaceSpaceWithString(text),
        });
      }}
    >
      {text}
    </Link>
  );
};

export default NavLink;