import React from "react";
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import theme from "../../components/Utility/theme";

export default () => (
  <Layout>
    <Container
      customCSS={{
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
      <Heading Tag="h5">
        Your message has been sent.
      </Heading>
    </Container>
  </Layout>
);