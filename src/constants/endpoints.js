'use-strict'

const API_V1_SCHEMA = 'http://'
export const API_V1_DOMAIN = 'staging.ecd.cnsnt.io'
const API_V1_PREFIX = '/api/v1'
export const API_V1_BASE = API_V1_SCHEMA + API_V1_DOMAIN + API_V1_PREFIX

export const REQUEST_OPTIONS = (req, uri, method, body) => {
  // proxy
  let options = {
    method,
    uri,
    headers: {
      'Accept': req.headers['accept'],
      'Content-Type': req.headers['content-type'],
      'Authorization': req.headers['authorization'],
    },
    json: true,
    simple: false,
    gzip: true,
    resolveWithFullResponse: true,
  }
  options.headers.host = API_V1_DOMAIN

  if (method !== 'GET' && body)
    options.body = body

  return options
}