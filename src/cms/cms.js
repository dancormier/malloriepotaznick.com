import React from 'react'
import CMS from 'netlify-cms'
import * as ColorWidget from "netlify-cms-widget-color";

import CSSInjector from '../components/Utility/CSSInjector';

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import HomePagePreview from './preview-templates/HomePagePreview'

CMS.registerWidget("color", ColorWidget.Control);

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

CMS.registerPreviewTemplate('home', props => (
  <CSSInjector>
    <HomePagePreview {...props} />
  </CSSInjector>
))