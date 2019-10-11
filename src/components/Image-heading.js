/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'

const style = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: `1px solid ${theme.color('white')}`,
  borderRadius: '3px',
  display: 'block',
  flexShrink: 0,
  marginBottom: theme.size(4),
  position: 'relative',
  transition: '.4s',
  '&:hover': {
    boxShadow: '0 0 20px rgba(0,0,0,.2)',
    transform: 'scale(1.02)',
  }
};

const ImageHeading = ({
  children,
  customCSS,
  height = 15,
  onClick,
  slug,
  thumb,
}) => (
  <a
    css={{
      ...style,
      ...{
        backgroundImage: `url(${thumb})`,
        height: theme.size(height),
      },
      ...customCSS,
    }}
    onClick={onClick}
    href={slug}
  >
    {children}
  </a>
);

export default ImageHeading;
