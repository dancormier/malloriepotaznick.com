import React from 'react';
import PropTypes from 'prop-types';
import { ContactPageTemplate } from '../../templates/_contact-page';

const ContactPagePreview = ({ entry }) => (
  <ContactPageTemplate
    body={entry.getIn(['data', 'body'])}
    heading={entry.getIn(['data', 'heading'])}
    subsections={entry.getIn(['data', 'subsections']).toJS()}
    isPreview
  />
);

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default ContactPagePreview;
