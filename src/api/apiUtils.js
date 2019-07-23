import 'url-search-params-polyfill';

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

export function handleError(error) {
  console.error('API call failed. ' + error);
  throw error;
}
const marvelApiKey = process.env.REACT_APP_MARVEL_API_KEY;
const baseUrl = 'https://gateway.marvel.com:443/v1/public/';

export async function fetchGetApi(url, params = {}) {
  var apiUrl = new URL(`${baseUrl}${url}`);
  params.apikey = marvelApiKey;
  Object.keys(params).forEach(key =>
    apiUrl.searchParams.append(key, params[key])
  );
  try {
    const response = await fetch(apiUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
