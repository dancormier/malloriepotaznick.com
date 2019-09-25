import React from 'react';
import PropTypes from 'prop-types';
import { ActionbarTemplate } from '../../templates/_actionbar';

const ActionbarPreview = ({ entry }) => (
  <ActionbarTemplate
    body={entry.getIn(['data', 'body'])}
    buttons={entry.getIn(['data', 'buttons']).toJS()}
    isPreview
  />
);

ActionbarPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default ActionbarPreview;
