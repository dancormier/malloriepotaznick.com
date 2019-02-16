// import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import theme from './Utility/theme'
import Button from './Button'
import Container from './Container'
import Markdown from '../components/Utility/Markdown'

const style = {
  backgroundColor: theme.color('gray-ll'),
  paddingBottom: theme.size(8),
  paddingTop: theme.size(8),
};

const FooterContact = ({
  body,
  buttons,
  customCSS,
}) => (
  <div css={{...style, customCSS}}>
    <Container>
      <Markdown
        customCSS={{
          'p': {
            color: theme.color('gray'),
            fontSize: theme.size(2),
          }
        }}
      >
        {body}
      </Markdown>
      {buttons && buttons.length && (
        <div css={{ marginTop: theme.size(4) }}>
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
    </Container>
  </div>
);

export default FooterContact;
