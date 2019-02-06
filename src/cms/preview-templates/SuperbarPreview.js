import React from 'react';
import PropTypes from 'prop-types';
import { SuperbarTemplate } from '../../templates/_superbar';

const SuperbarPreview = ({ entry }) => (
  <SuperbarTemplate
    items={entry.getIn(['data', 'items']).toJS()}
    isPreview
  />
);

SuperbarPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default SuperbarPreview;
