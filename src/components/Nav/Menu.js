/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';
import { event } from 'react-ga';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Container from '../Container';
import theme from '../Utility/theme';
import { formatInternalLink, linkIsActive, replaceSpaceWithString } from '../Utility/util';

const Menu = ({ links, pathname, sublinksVisible, toggleSublinks }) => {
  return (
    <div
      css={{
        borderBottom: '1px solid #eeeeee',
      }}
    >
      {links.map((l, idx) => {
        const showSublinks = sublinksVisible === idx;
        const Angle = showSublinks ? FaAngleUp : FaAngleDown;
        const linkStyle = {
          color: theme.color(l.button ? 'white' : theme.color(linkIsActive(l.url, pathname) ? 'accent' : 'primary')),
          display: 'block',
          fontSize: theme.size(2),
          paddingBottom: theme.size(3),
          paddingTop: theme.size(3),
          position: 'relative',
          textAlign: 'center',
          textDecoration: 'none',
        }
        return l.enabled && (
          <Container
            customCSS={{
              background: l.button && theme.color('accent'),
              borderTop: `1px solid ${theme.color(l.button ? 'accent' : 'gray-l' )}`,
              fontFamily: theme.font('sans'),
            }}
            key={`${l.text}-${l.url}`}
          >
            {l.sublinks ? (
              <div>
                <div
                  onClick={() => {
                    toggleSublinks(showSublinks ? null : idx);
                    event({
                      category: 'header.button',
                      action: showSublinks ? 'sublinks.open' : 'sublinks.close',
                      label: `toggle-sublinks`,
                    });
                  }}
                  css={linkStyle}
                >
                  <span>{l.text}</span>
                  {l.sublinks && (
                    <div
                      css={{
                        color: theme.color('gray'),
                        display: 'inline-block',
                        marginLeft: theme.size(-4),
                        marginRight: `-${theme.size(2)}`,
                      }}
                    >
                      <Angle
                        css={{
                          marginBottom: `-${theme.size(-6)}`,
                        }}
                      />
                    </div>
                  )}
                </div>
                {showSublinks && (
                  <div>
                    {l.sublinks && l.sublinks.map(sl => (
                      <Link
                        key={sl.text}
                        to={formatInternalLink(sl.url)}
                        title={sl.text}
                        css={{
                          ...linkStyle,
                          background: theme.color('gray-ll'),
                          borderTop: `1px solid ${theme.color('gray-l')}`,
                          color: theme.color('accent'),
                          margin: `0 -${theme.size(5)}`,
                        }}
                        onClick={() => {
                          event({
                            category: 'header.link',
                            action: formatInternalLink(sl.url),
                            label: replaceSpaceWithString(sl.text),
                          });
                        }}
                      >
                        {sl.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  to={formatInternalLink(l.url)}
                  title={l.text}
                  onClick={() => {
                    toggleSublinks(showSublinks ? null : idx);
                    event({
                      category: 'header.link',
                      action: formatInternalLink(l.url),
                      label: replaceSpaceWithString(l.text),
                    });
                  }}
                  css={linkStyle}
                >
                  <span>{l.text}</span>
                </Link>
              </div>

            )}
          </Container>
        )
      })}
    </div>
  )
};

export default Menu;