/** @jsx jsx */
import { jsx } from '@emotion/react'
import { event } from 'react-ga'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import theme from "../../components/Utility/theme"

export default () => (
  <Layout>
    <Container
      customCSS={{
        paddingBottom: theme.size(12),
        paddingTop: theme.size(8),
        textAlign: 'center',
      }}
    >
      <Heading
        Tag="h3"
        customCSS={{
          marginBottom: theme.size(4),
        }}
      >
        Thank you!
      </Heading>
      <Heading
        Tag="h5"
        customCSS={{
          marginBottom: theme.size(4),
        }}
      >
        Your message has been sent.
      </Heading>
      <Button
        href="/"
        onClick={() => {
          event({
            category: 'contact-thanks',
            action: '/',
            label: 'return-home',
          });
        }}
      >
        Return home
      </Button>
    </Container>
  </Layout>
);