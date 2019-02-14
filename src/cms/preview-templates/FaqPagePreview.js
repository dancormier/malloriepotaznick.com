import React from 'react';
import PropTypes from 'prop-types';
import { FaqPageTemplate } from '../../templates/faq-page';

const FaqPagePreview = ({ entry }) => (
  <FaqPageTemplate
    title={entry.getIn(['data', 'title'])}
    body={entry.getIn(['data', 'body'])}
    isPreview
  />
);

FaqPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default FaqPagePreview;
