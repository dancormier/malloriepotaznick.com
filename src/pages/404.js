/** @jsx jsx */
import { jsx } from '@emotion/react'
import { event } from 'react-ga'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Button from '../components/Button'
import Heading from '../components/Heading'
import theme from '../components/Utility/theme'

const NotFoundPage = () => (
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
      >
        Sorry! We couldn't find that page.
      </Heading>
      <div
        css={{
          marginTop: theme.size(4),
        }}
      >
        <Button
          href="/"
          onClick={() => {
            event({
              category: '404',
              action: '/',
              label: 'return-home',
            });
          }}
        >
          Return home
        </Button>
      </div>
    </Container>
  </Layout>
)

export default NotFoundPage
