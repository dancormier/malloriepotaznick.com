export const formatInternalLink = (url) => {
  return url && url.indexOf('//') < 0 && url.indexOf('/') !== 0 ? `/${url}` : url
}

export const replaceSpaceWithString = (text) => {
  return text.replace(/\s+/g, '-');
}