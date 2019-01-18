'use strict';

function request(option) {
  if (String(option) !== '[object Object]') return undefined;
  var xhr = new XMLHttpRequest();
  xhr.responseType = option.responseType || 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (option.success && typeof option.success === 'function') {
          option.success(xhr.response);
        }
      } else {
        if (option.error && typeof option.error === 'function') {
          option.error();
        }
      }
    }
  };
  xhr.open(option.method || 'GET', option.url, true);
  xhr.send();
}

/**
 * @param { String } clientVersion (required)
 * @param { String } safeVersionUrl  (required)
 * @param { Function } fail  (required)
 * @param { Function } success 
 */
function webVersionCheck () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      clientVersion = _ref.clientVersion,
      safeVersionUrl = _ref.safeVersionUrl,
      fail = _ref.fail,
      success = _ref.success;

  try {
    if (!clientVersion) throw new Error('Field clientVersion is missing.');else if (!safeVersionUrl) throw new Error('Field safeVersionUrl is missing.');else if (!fail) throw new Error('Field fail is missing.');
  } catch (error) {
    console.error(error);
  }

  request({
    method: 'GET',
    url: safeVersionUrl,
    success: function success(res) {
      if (String(res.version) !== String(clientVersion)) {
        fail(res.version);
      }
    },
    error: function error() {
      success && success();
    }
  });
}

var version = "1.0.0";

webVersionCheck({
  clientVersion: version,
  safeVersionUrl: './version.json?timestamp=' + Date.now(),
  fail: function fail() {
    location.reload(true);
  },

  success: function success() {
    console.log('success');
  }
});
