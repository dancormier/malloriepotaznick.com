// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Button from './Button'
import ContactForm from './Contact-form'
import Container from './Container'
import Heading from './Heading'
import Subsection from './Subsection'
import Markdown from './Utility/Markdown'

const Hero = ({
  customCSS,
  children,
  altBG,
  bgAlign,
  bgImage,
  bgInvert,
  buttons,
  context,
  heading,
  image,
  imageAlign,
  subsections,
}) => {
  const isAbout = context === 'about';
  const isContact = context === 'contact';
  const isFeatured = context === 'featured';

  const flexArrange = (align) => {
    switch(align) {
      case 'above':
        return 'column-reverse';
      case 'after':
        return 'row';
      case 'before':
        return 'row-reverse';
      case 'below':
        return 'column';
      default:
        return 'row';
    }
  };

  const invertedBG = bgImage && (theme.color(bgInvert ? 'blackBGOverlay' : 'whiteBGOverlay'));

  return (
    <div
      id={context}
      css={{
        backgroundColor: !invertedBG && altBG && theme.color('gray-ll'),
        backgroundImage: invertedBG,
        position: 'relative',
        '&:after': {
          backgroundImage: bgImage && `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: bgAlign,
          content: '""',
          opacity: '1',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          zIndex: '-1',
        },
        ...customCSS,
      }}
    >
      <Container>
        <div
          css={{
            paddingBottom: theme.size(isFeatured ? 5 : 4),
            paddingTop: theme.size(isFeatured ? 6 : 8),
            position: 'relative',
            textAlign: isFeatured && 'center',
            [theme.mq('lg')]: {
              paddingTop: theme.size(isFeatured ? 11 : 11),
              paddingBottom: theme.size(isFeatured ? 12 : 9),
            },
          }}
        >
          {Heading && (
            <Heading
              Tag='h2'
              accent={!isFeatured}
              customCSS={{
                color: bgInvert && theme.color('white'),
                marginBottom: theme.size(isFeatured ? 2 : 6),
              }}
            >
              {heading}
            </Heading>
          )}
          <div
            css={{
              display: 'flex',
              flexDirection: imageAlign === 'after' ? 'column-reverse' : 'column',
              [theme.mq('lg')]: {
                flexDirection: flexArrange(imageAlign),
              }
            }}
          >
            <div
              css={{
                display: isContact && 'flex',
                flexDirection: isContact && 'column-reverse',
                zIndex: 1,
                [theme.mq('md')]: {
                  flexDirection: isContact && 'row',
                },
                [theme.mq('lg')]: {
                  width: '100%',
                },
              }}
            >
              {isContact && (
                <div
                  css={{
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    maxWidth: theme.size(21),
                    width: '100%',
                    [theme.mq('md')]: {
                      paddingRight: '6%',
                      width: '40%',
                    },
                    [theme.mq('lg')]: {
                      width: '60%',
                    },
                  }}
                >
                  <ContactForm
                    onClick={() => {
                      console.log('Contact form submitted');
                    }}
                  />
                </div>
              )}
              {children && (
                <div
                  css={isFeatured ? {
                    marginBottom: theme.size(6),
                    'h3': {
                      fontSize: theme.size(2),
                      fontWeight: 500,
                      lineHeight: theme.size(4),
                    },
                    [theme.mq('sm')]: {
                      'h3': {
                        fontSize: theme.size(4),
                        fontWeight: 500,
                        lineHeight: theme.size(6),
                      },
                    },
                  } : {
                    marginBottom: theme.size(4),
                    'p': {
                      fontSize: theme.size(1),
                      lineHeight: theme.size(3),
                    },
                    [theme.mq('sm')]: {
                      'p': {
                        fontSize: theme.size(2),
                        lineHeight: theme.size(5),
                      }
                    },
                  }}
                >
                  <Markdown invert={bgInvert}>
                    {children}
                  </Markdown>
                </div>
              )}
              {subsections && (
                <div
                  css={{
                    [theme.mq('sm')]: {
                      display: 'flex',
                      'div + div': {
                        marginLeft: theme.size(6),
                      }
                    }
                  }}
                >
                  {subsections.map((sub) => (
                    <Subsection
                      key={sub.heading}
                      heading={sub.heading}
                      customCSS={{
                        width: '100%',
                      }}
                    >
                      {sub.body}
                    </Subsection>
                  ))}
                </div>
              )}
              {buttons && buttons.length && (
                <div>
                  {buttons.map((button) => (
                    <Button
                      key={button.text}
                      type={button.type}
                      url={button.url}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            {image && (
              <img
                src={image}
                alt={context}
                css={{
                  alignSelf: 'center',
                  flexShrink: 0,
                  height: 'auto',
                  marginBottom: theme.size(4),
                  maxWidth: theme.size(18),
                  width: imageAlign === 'above' || imageAlign === 'below' || isAbout ? '100%' : '33%',
                  [theme.mq('lg')]: {
                    alignSelf: 'flex-start',
                    borderRadius: isAbout && '100%',
                    boxShadow: isAbout && '0 0 30px rgba(0,0,0,.1)',
                    marginBottom: 0,
                    marginLeft: imageAlign === 'after' && theme.size(12),
                    marginRight: imageAlign === 'before' && theme.size(12),
                    height: isAbout && theme.size(18),
                    width: isAbout && theme.size(18),
                  },
                }}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;