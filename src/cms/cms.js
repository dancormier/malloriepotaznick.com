import React from 'react';
import CMS from 'netlify-cms';
import * as ColorWidget from "netlify-cms-widget-color";

import CSSInjector from '../components/Utility/CSSInjector';

// Data
import FooterPreview from './preview-templates/FooterPreview';
import NavbarPreview from './preview-templates/NavbarPreview';
import SuperbarPreview from './preview-templates/SuperbarPreview';

// Pages
import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import HomePagePreview from './preview-templates/HomePagePreview';

CMS.registerWidget("color", ColorWidget.Control);

// Data
CMS.registerPreviewTemplate('footer', props => (
  <CSSInjector>
    <FooterPreview {...props} />
  </CSSInjector>
));
CMS.registerPreviewTemplate('navbar', props => (
  <CSSInjector>
    <NavbarPreview {...props} />
  </CSSInjector>
));
CMS.registerPreviewTemplate('superbar', props => (
  <CSSInjector>
    <SuperbarPreview {...props} />
  </CSSInjector>
));

// Pages
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('home', props => (
  <CSSInjector>
    <HomePagePreview {...props} />
  </CSSInjector>
));