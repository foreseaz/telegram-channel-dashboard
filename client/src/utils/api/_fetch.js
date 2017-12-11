import qs from 'querystring'
import _merge from 'lodash/merge'
import _isObject from 'lodash/isObject'
import _isArray from 'lodash/isArray'
import _isEmtpy from 'lodash/isEmpty'

import { API_HOST } from '~/utils/constants'


const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) return res
  throw res
}

const parseResponse = (res) => {
  return res.text()
    .then(text => {
      const headers = res.headers
      let data = null
      try {
        data = JSON.parse(text)
      } catch (e) {
        data = text || null
      }
      return { headers, data }
    })
}

export default ({
  api, method, path, query, body
}) => {
  const queries = _isEmtpy(query) ? '' : `?${qs.encode(query)}`
  const _url = `${API_HOST}/${api.service}/${api.version}${path}${queries}`

  const API_HEADERS = {} // placeholder

  const _opts = {
    method,
    headers: Object.assign({}, API_HEADERS)
  }

  if (body) {
    const isJSON = _isObject(body) || _isArray(body)

    _merge(_opts, {
      headers: isJSON
        ? {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
        : {},
      body: isJSON
        ? JSON.stringify(body)
        : body
    })
  }

  console.log(_opts)

  return fetch(_url, _opts)
    .then(checkStatus)
    .then(parseResponse)
    .catch((err) => {
      return err.json().then(errJson => {
        throw errJson
      })
    })
}
