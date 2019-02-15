import React from 'react';
import PropTypes from 'prop-types';
import { NavbarTemplate } from '../../templates/_navbar';

const NavbarPreview = ({ entry }) => (
  <NavbarTemplate
    heading={entry.getIn(['data', 'heading'])}
    subheading={entry.getIn(['data', 'subheading'])}
    links={entry.getIn(['data', 'links']).toJS()}
    isPreview
  />
);

NavbarPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default NavbarPreview;
