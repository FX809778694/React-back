// @flow
import axios from '../../api/resources';

import { optionsToParameterizedUrl } from '../../utils/url-generator';

const API_ROOT = '';

export type BodyType = {
  method: ?string,
  body: ?Object,
  jwt: ?string,
};

function getUrl(endpoint: string) {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  return endpoint.split('')[0] === '/' ? endpoint : `${API_ROOT}${endpoint}`;
}

/**
 * Sends a request to the API and returns a promise with camelized response
 */
export default (async function callApi(
  endpoint: string,
  jwt: ?string,
  { method = 'GET', body = null}: ?BodyType = {},
) {
  if (!endpoint) throw new Error('No endpoint is given');

  // If it is an absolute url.
  const url = getUrl(endpoint);

  const options = { url, method };

  if (jwt) {
    options.headers = {
      Authorization: `Bearer ${jwt}`,
    };
  }

  if (body) {
    if (method === 'GET' && body != null) {
      // Convert body to ?x=y&b=a format
      options.url += optionsToParameterizedUrl(body);
    } else {
      options.data = body;
    }
  }

  const result = await axios(options);
  return result.data;
});
