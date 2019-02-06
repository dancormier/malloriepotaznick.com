/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Layout from '../components/Layout'
import HomePage from '../templates/_home-page'

export default class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <HomePage />
      </Layout>
    );
  }
};