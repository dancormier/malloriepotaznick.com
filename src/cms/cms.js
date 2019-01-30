import CMS from 'netlify-cms'
import * as ColorWidget from "netlify-cms-widget-color";

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerWidget("color", ColorWidget.Control);

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
