# web-version-check
web project version checking

---

## Install

```bash
$ npm i -D web-version-check
```

## Options

| 参数    | 说明    | type  | 示例 | required |
| ---      | ---       | ---     | ---- | --- |
| `clientVersion` | 浏览器客户端保存的版本号 | `String` | `'0.1.0'` | `true` | 
| `safeVersionUrl` | 服务器端保存的版本文件路径 | `String` | `./version.json`、`http://aa.bb.cc/site/version.json` | `true` |
| `fail` | 校验失败时。即浏览器端与服务器端版本号不一致 | `Function` | `function(res){}` | `true` |
| `success` | 校验成功时。即版本号一致 | `Function` | `function() {}` | `false` |

---

## Usage

```javascript
import webVersionCheck from 'web-version-check'
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
```

> version.json
```json
{
  "version": "1.0.0"
}
```

