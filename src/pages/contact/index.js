import React from "react";
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import ContactPage from '../../templates/_contact-page'

export default class Index extends React.Component {
  render() {
    return (
      <Layout altBG={true}>
        <Container>
          <ContactPage />
        </Container>
      </Layout>
    );
  }
}