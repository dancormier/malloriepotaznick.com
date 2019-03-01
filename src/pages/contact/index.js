import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import ContactPage from '../../templates/_contact-page';

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <StaticQuery
          query={graphql`
            query ContactPage {
                site {
                  siteMetadata {
                    shortDescription,
                    title,
                  }
                }
              }
          `}
          render={data => {
            const {
              shortDescription,
              title,
            } = data.site.siteMetadata;

            return (
              <div>
                <Helmet title={`Contact ${title}: ${shortDescription}`} />
                <ContactPage />
              </div>
            )
          }}
        />
      </Layout>
    );
  }
};