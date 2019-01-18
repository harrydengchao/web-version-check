import request from './request'

/**
 * @param { String } clientVersion (required)
 * @param { String } safeVersionUrl  (required)
 * @param { Function } fail  (required)
 * @param { Function } success 
 */
export default function ({clientVersion, safeVersionUrl, fail, success} = {}) {
  try {
    if (!clientVersion) throw new Error('Field clientVersion is missing.')
    else if (!safeVersionUrl) throw new Error('Field safeVersionUrl is missing.')
    else if (!fail) throw new Error('Field fail is missing.')
  } catch (error) {
    console.error(error)
  }

  request({
    method: 'GET',
    url: safeVersionUrl,
    success: function (res) {
      if (String(res.version) !== String(clientVersion)) {
        fail(res)
      }
    },
    error: function () {
      success && success()
    }
  })
}
