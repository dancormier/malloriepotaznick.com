import React from 'react';
import PropTypes from 'prop-types';
import { FooterTemplate } from '../../templates/_footer';

const FooterPreview = ({ entry }) => (
  <FooterTemplate
    items={entry.getIn(['data', 'items']).toJS()}
    isPreview
  />
);

FooterPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default FooterPreview;
