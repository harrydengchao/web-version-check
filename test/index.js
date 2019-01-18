import webVersionCheck from '../lib/index'
import { version } from './version.json'

webVersionCheck({
  clientVersion: version,
  safeVersionUrl: `./version.json?timestamp=${Date.now()}`,
  fail: function(res) {
    location.reload(true)
  },
  success: function() {
    console.log('success')
  }
})
