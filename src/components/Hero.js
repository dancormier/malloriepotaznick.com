// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Button from './Button'
import Container from './Container'
import Heading from './Heading'
import Markdown from './Utility/Markdown'
import Subsection from './Subsection'

const imageStyle = (type) => {
  switch(type) {
    case "featured":
      return {
        backgroundPosition: 'top right',
        backgroundSize: 'cover',
        bottom: 0,
        left: 'auto',
        marginLeft: 0,
        position: 'absolute',
        right: `-${theme.size(18)}`,
        top: `-${theme.size(18)}`,
        width: '100%',
      }
    case "about":
      return {
        borderRadius: '100%',
        boxShadow: '0 0 30px rgba(0,0,0,.1)',
        height: theme.size(18),
        width: theme.size(18),
      }
    default:
      return {
        height: 'auto',
      }
  }
}

const FeaturedImage = ({ image, context }) => (
  <div
    css={{
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      display: 'none',
      position: 'relative',
      width: '100%',
      zIndex: -1,
      [theme.mq('lg')]: {
        display: 'block',
      },
      ...imageStyle(context),
    }}
  />
);

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
  const isFeatured = context === 'featured';
  const bgPos = isFeatured ? '-30%' : 0;

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
      css={{
        backgroundColor: altBG && '#f9f9f9',
        color: theme.color('primary'),
        position: 'relative',
        '&:after': {
          backgroundImage: bgImage && `url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: isFeatured ? 'cover' : bgAlign,
          content: '""',
          opacity: isFeatured && '0.3',
          top: bgPos,
          left: bgPos,
          bottom: bgPos,
          right: bgPos,
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
          paddingTop: theme.size(6),
          paddingBottom: theme.size(6),
          position: 'relative',
          [theme.mq('lg')]: {
            paddingTop: theme.size(12),
            paddingBottom: theme.size(12),
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
            [theme.mq('lg')]: {
              flexDirection: flexArrange(imageAlign),
            }
          }}
        >
          <div
            css={{
              width: isFeatured ? '70%' : '100%',
              zIndex: 1,
            }}
          >
            {children && (
              <div
                css={{
                  fontSize: theme.size(isFeatured ? 4 : 2),
                  lineHeight: theme.size(isFeatured ? 6 : 4),
                  marginBottom: theme.size(isFeatured ? 6 : 8),
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
            <FeaturedImage
              image={bgImage}
              context={context}
            />
          )}
          {image && (
            <img
              src={image}
              alt={context}
              css={{
                flexShrink: 0,
                marginLeft: imageAlign === 'after' && theme.size(12),
                marginRight: imageAlign === 'before' && theme.size(12),
                width: imageAlign === 'above' || imageAlign === 'below' ? '100%' : '33%',
                ...imageStyle(context),
              }}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Hero;