export const formatInternalLink = (url) => {
  return url && url.indexOf('//') < 0 && url.indexOf('/') !== 0 ? `/${url}` : url
}