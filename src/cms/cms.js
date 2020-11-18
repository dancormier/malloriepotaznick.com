import React from 'react';
import CMS from 'netlify-cms-app';
import * as ColorWidget from "netlify-cms-widget-color";

import CSSInjector from '../components/Utility/CSSInjector';

// Data
import ActionbarPreview from './preview-templates/ActionbarPreview';
import FooterPreview from './preview-templates/FooterPreview';
import NavbarPreview from './preview-templates/NavbarPreview';
import SuperbarPreview from './preview-templates/SuperbarPreview';

// Pages
import BlogPostPreview from './preview-templates/BlogPostPreview';
import ContactPagePreview from './preview-templates/ContactPagePreview';
import CreatedPagePreview from './preview-templates/CreatedPagePreview';
import HomePagePreview from './preview-templates/HomePagePreview';

CMS.init();

CMS.registerWidget("color", ColorWidget.Control);

// Data
CMS.registerPreviewTemplate('actionbar', props => (
  <CSSInjector>
    <ActionbarPreview {...props} />
  </CSSInjector>
));
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
CMS.registerPreviewTemplate('blog', props => (
  <CSSInjector>
    <BlogPostPreview {...props} />
  </CSSInjector>
));
CMS.registerPreviewTemplate('contact', props => (
  <CSSInjector>
    <ContactPagePreview {...props} />
  </CSSInjector>
));
CMS.registerPreviewTemplate('pages', props => (
  <CSSInjector>
    <CreatedPagePreview {...props} />
  </CSSInjector>
));
CMS.registerPreviewTemplate('home', props => (
  <CSSInjector>
    <HomePagePreview {...props} />
  </CSSInjector>
));