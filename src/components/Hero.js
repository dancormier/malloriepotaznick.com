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

  return (
    <div
      css={{
        backgroundColor: altBG && '#f9f9f9',
        backgroundImage: !isFeatured && bgImage && `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: bgAlign,
        color: theme.color('primary'),
        ...customCSS,
      }}
    >
      <Container
        customCSS={{
          alignItems: 'center',
          display: imageAlign === 'after' || imageAlign === 'before' ? 'flex' : 'block',
          flexDirection: imageAlign === 'left' && 'row-reverse',
          position: 'relative',
        }}
      >
        <div
          css={{
            paddingTop: theme.size(12),
            paddingBottom: theme.size(isFeatured ? 14 : 12),
            width: isFeatured ? '70%' : '100%',
            zIndex: 1,
          }}
        >
          {Heading && (
            <Heading
              Tag={isFeatured ? 'h2' : 'h3'}
            >
              {heading}
            </Heading>
          )}
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
          <div
            css={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              position: 'relative',
              width: '100%',
              zIndex: -1,
              ...imageStyle(context),
            }}
          />
        )}
        {image && (
          <img
            src={image}
            alt={context}
            css={{
              flexShrink: 0,
              marginLeft: theme.size(12),
              width: '33%',
              ...imageStyle(context),
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default Hero;