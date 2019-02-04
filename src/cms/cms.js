import CMS from 'netlify-cms'
import * as ColorWidget from "netlify-cms-widget-color";

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import HomeHeroesPreview from './preview-templates/HomeHeroesPreview'

CMS.registerWidget("color", ColorWidget.Control);

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('home', HomeHeroesPreview)