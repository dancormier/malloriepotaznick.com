import React from 'react';
import PropTypes from 'prop-types';
import { HomeHeroesTemplate } from '../../templates/_heroes';

const HomeHeroesPreview = ({ entry }) => (
  <HomeHeroesTemplate
    heroes={entry.getIn(['data', 'homeHeroes']).toJS()}
  />
);

HomeHeroesPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default HomeHeroesPreview;
