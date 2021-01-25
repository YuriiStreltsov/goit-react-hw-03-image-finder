import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19184321-ac300e61d51c0cc0f6b691bfb';

const fetchImage = (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url).then(response => {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response.data.hits;
    }
    return Promise.reject(new Error(`Нет покемона с именем ${query}`));
  });
};

const api = { fetchImage };
export default api;
