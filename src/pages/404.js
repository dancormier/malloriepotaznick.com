import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import theme from '../components/theme';

const NotFoundPage = () => (
  <Layout>
    <Container
      customCSS={{
        fontSize: theme.size(4),
        paddingTop: theme.size(8),
        textAlign: 'center',
      }}
    >
      <h2>Sorry! We couldn't find that page.</h2>
    </Container>
  </Layout>
)

export default NotFoundPage
