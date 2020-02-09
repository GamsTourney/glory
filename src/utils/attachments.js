import { API_URL } from 'modules/api/index'
import url from 'url'

function getAttachmentUrl(imgPath) {
  return url.resolve(API_URL, imgPath)
}

export { getAttachmentUrl }
