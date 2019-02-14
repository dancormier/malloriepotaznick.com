import React from "react";
import Layout from '../../components/Layout'
import ContactPage from '../../templates/_contact-page'

export default class Index extends React.Component {
  render() {
    return (
      <Layout altBG={true}>
        <ContactPage />
      </Layout>
    );
  }
}