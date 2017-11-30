import baseHandler from './base-obj-to-css';

export default cacheToStylesheets;

/*
 * Converts cache object to a CSS string
 * @param  {object} cacheObj Cache object
 * @return {string}          String of CSS
 */
function cacheToStylesheets(cacheObj) {
  let mediaSheets;
  let mainCss = '';
  for (const key in cacheObj) {
    if (key === 'media') {
      mediaSheets = getMediaSheets(cacheObj[key]);
      continue;
    }
    mainCss += baseHandler(key, cacheObj[key]);
  }
  const mainSheet = {
    css: mainCss,
  };
  return mediaSheets ? [mainSheet].concat(mediaSheets) : [mainSheet];
}

function getMediaSheets(mediaObj) {
  const stylesheets = [];
  for (const query in mediaObj) {
    const obj = mediaObj[query];
    let mediaCss = '';
    for (const key in obj) {
      mediaCss += baseHandler(key, obj[key]);
    }
    stylesheets.push({
      media: query,
      css: mediaCss,
    });
  }
  return stylesheets;
}
