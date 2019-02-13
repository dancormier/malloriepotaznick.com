import React from "react";
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import ContactForm from '../../components/Contact-form'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

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