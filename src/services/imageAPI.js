import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19184321-ac300e61d51c0cc0f6b691bfb';

const fetchImage = (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios
    .get(url)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log('error.config', error.config);
    })
    .then(response => {
      return response.data.hits;
    });
};

const api = { fetchImage };
export default api;

//  console.log(response);
//  if (response.status >= 200 && response.status < 300) {
//    return response.data.hits;
//  }
//  return Promise.reject(new Error(`Not found image ${query}`));
