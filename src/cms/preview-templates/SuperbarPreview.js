import React from 'react';
import PropTypes from 'prop-types';
import { SuperbarTemplate } from '../../templates/_superbar';

const SuperbarPreview = ({ entry }) => (
  <SuperbarTemplate
    links={entry.getIn(['data', 'items']).toJS()}
    isPreview
  />
);

SuperbarPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default SuperbarPreview;
