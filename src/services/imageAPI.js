import axios from 'axios';

const fetchImage = query => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=1&key=19184321-ac300e61d51c0cc0f6b691bfb&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

const api = { fetchImage };
export default api;
