export default function request(option) {
  if (String(option) !== '[object Object]') return undefined
  var xhr = new XMLHttpRequest()
  xhr.responseType = option.responseType || 'json'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (option.success && typeof option.success === 'function') {
          option.success(xhr.response)
        }
      } else {
        if (option.error && typeof option.error === 'function') {
          option.error()
        }
      }
    }
  }
  xhr.open(option.method || 'GET', option.url, true)
  xhr.send()
}
