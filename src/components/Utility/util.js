export const formatInternalLink = (url) => {
  return url && url.indexOf('//') < 0 && url.indexOf('/') !== 0 ? `/${url}` : url
}

export const linkIsActive = (slug, pathname) => {
  let path = pathname;
  if (path && path.charAt(0) === "/") {
    path = path.substr(1);
  };
  return slug === path;
};

export const replaceSpaceWithString = (text) => {
  return text.replace(/\s+/g, '-');
}