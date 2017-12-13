const getUrls = require('get-urls')
const cleanMark = require('clean-mark')
const nodeMercuryParser = require('node-mercury-parser')
nodeMercuryParser.init('Skeosh2Uy3TeMxKeURfJKLxqN68suE3Wy9CVm3wf')

const extraTags = (text) => {
  if (!text) return text
  const extractedTags = text.match(/\[(.*?)\]/g) // ['[Design]', '[Code]', ...]
  const tags = extractedTags && extractedTags.map(t => t.replace(/[\[ | \]]/g, '').toLowerCase()) // ['design', 'code', ...]
  return tags.length > 0 ? tags : ['untagged']
}

const extraUrl = (text) => {
  const urlSet = getUrls(text)
  const urlArr = Array.from(urlSet)

  return !!urlArr[0] ? urlArr[0] : ''
}

const preparePreviewMercury = (url) => {
  return nodeMercuryParser.get(url)
}

const preparePreviewMark = async (url) => {
  return cleanMark(url, {})
}

exports.extraTags = extraTags
exports.extraUrl = extraUrl
exports.preparePreviewMercury = preparePreviewMercury
exports.preparePreviewMark = preparePreviewMark
