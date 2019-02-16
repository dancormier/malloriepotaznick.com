import React from 'react';
import PropTypes from 'prop-types';
import { CreatedPageTemplate } from '../../templates/created-page';

const CreatedPagePreview = ({ entry }) => (
  <CreatedPageTemplate
    heading={entry.getIn(['data', 'heading'])}
    body={entry.getIn(['data', 'body'])}
    image={entry.getIn(['data', 'image'])}
    isPreview
  />
);

CreatedPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default CreatedPagePreview;
