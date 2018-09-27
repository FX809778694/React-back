// @flow

export const host = () => {
  return process.env.NODE_ENV === 'production'
    ? 'codesandbox.io'
    : 'localhost:3000'
}

export const protocolAndHost = () => `${window.location.protocol}//${host()}`

export const frameUrl = (append: string = '') => {
  const path = append.indexOf('/') === 0 ? append.substr(1) : append

  if (process.env.LOCAL_SERVER) {
    return `http://localhost:3001/${path}`
  }

  return `${window.location.protocol}//sandbox.${host()}/${path}`
}

export const signInUrl = () => '/oauth/token'

export const profileUrl = (username: string) => `/u/${username}`

export const optionsToParameterizedUrl = (options: Object) => {
  const keyValues = Object.keys(options)
    .sort()
    .map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`,
    )
    .join('&')

  return keyValues ? `?${keyValues}` : ''
}

export const searchUrl = query => `/search${query ? `?query=${query}` : ''}`
