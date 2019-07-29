import axios from 'axios';

const hostURL = 'https://my-movie-app-smb.herokuapp.com';

export function getRequest(URL, headers = {}) {
  return axios.get(hostURL + URL, headers);
}

export function postRequest(URL, reqBody) {
  return axios.post(hostURL + URL, reqBody);
}

export function putRequest(URL, headers, reqBody) {
  return axios.put(hostURL + URL, headers, reqBody);
}

export function deleteRequest(URL, headers) {
  return axios.delete(hostURL + URL, headers);
}
