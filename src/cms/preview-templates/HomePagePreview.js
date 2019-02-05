import React from 'react';
import PropTypes from 'prop-types';
import { HomePageTemplate } from '../../templates/_home-page';

const HomePagePreview = ({ entry }) => (
  <HomePageTemplate
    heroes={entry.getIn(['data', 'heroes']).toJS()}
  />
);

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default HomePagePreview;
