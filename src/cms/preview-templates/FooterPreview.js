import React from 'react';
import PropTypes from 'prop-types';
import { FooterTemplate } from '../../templates/_footer';

const FooterPreview = ({ entry }) => (
  <FooterTemplate
    body={entry.getIn(['data', 'body'])}
    copyright={entry.getIn(['data', 'copyright'])}
    buttons={entry.getIn(['data', 'buttons']).toJS()}
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
