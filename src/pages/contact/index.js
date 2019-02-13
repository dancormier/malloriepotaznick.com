import React from "react";
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import ContactForm from '../../components/Contact-form'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Container>
          <ContactForm />
        </Container>
      </Layout>
    );
  }
}