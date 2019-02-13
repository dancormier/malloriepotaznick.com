// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Button from './Button'
import ContactForm from './Contact-form'
import Container from './Container'
import Heading from './Heading'
import Markdown from './Utility/Markdown'
import Subsection from './Subsection'

const Hero = ({
  customCSS,
  children,
  altBG,
  bgAlign,
  bgImage,
  buttonText,
  buttonURL,
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

  return (
    <div
      id={context}
      css={{
        backgroundColor: altBG && theme.color('gray-ll'),
        color: theme.color('primary'),
        position: 'relative',
        '&:after': {
          backgroundImage: bgImage && `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: isFeatured ? 'cover' : bgAlign,
          content: '""',
          opacity: isFeatured && '0.3',
          top: isFeatured ? '-60%' : 0,
          left: isFeatured ? '-30%' : 0,
          bottom: isFeatured ? '-100%' : 0,
          right: isFeatured ? '-30%' : 0,
          position: 'absolute',
          zIndex: '-1',
        },
        [theme.mq('lg')]: {
          '&:after': {
              backgroundImage: bgImage && `url(${isFeatured ? '' : bgImage})`,
          },
        },
        ...customCSS,
      }}
    >
      <Container
        customCSS={{
          paddingTop: theme.size(isFeatured ? 2 : 8),
          paddingBottom: theme.size(6),
          position: 'relative',
          [theme.mq('lg')]: {
            paddingTop: theme.size(isFeatured ? 8 : 11),
            paddingBottom: theme.size(11),
          },
        }}
      >
        {Heading && (
          <Heading
            Tag={isFeatured ? 'h2' : 'h3'}
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
                width: isFeatured ? '70%' : '100%',
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
                  action={`#${context}`}
                  onClick={() => {
                    console.log('Contact form submitted');
                  }}
                />
              </div>
            )}
            {children && (
              <div
                css={isFeatured ? {
                  fontSize: theme.size(2),
                  lineHeight: theme.size(4),
                  marginBottom: theme.size(6),
                  [theme.mq('sm')]: {
                    fontSize: theme.size(4),
                    lineHeight: theme.size(6),
                  },
                } : {
                  fontSize: theme.size(1),
                  lineHeight: theme.size(3),
                  marginBottom: theme.size(4),
                  [theme.mq('sm')]: {
                    fontSize: theme.size(2),
                    lineHeight: theme.size(4),
                    marginBottom: theme.size(8),
                  },
                }}
              >
                <Markdown>
                  {children}
                </Markdown>
              </div>
            )}
            {subsections && subsections.map(sub => {
              return (
                <Subsection
                  key={sub.heading}
                  heading={sub.heading}
                >
                  {sub.body}
                </Subsection>
              )}
            )}
            {buttonText && buttonURL && (
              <Button
                url={buttonURL}
              >
                {buttonText}
              </Button>
            )}
          </div>
          {isFeatured && (
            <div
              css={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: 'top right',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                bottom: 0,
                display: 'none',
                left: 'auto',
                marginLeft: 0,
                position: 'absolute',
                right: `-${theme.size(18)}`,
                top: `-${theme.size(19)}`,
                width: '100%',
                zIndex: -1,
                [theme.mq('lg')]: {
                  display: 'block',
                },
              }}
            />
          )}
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
      </Container>
    </div>
  );
};

export default Hero;