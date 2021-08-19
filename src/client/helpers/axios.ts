import Axios from 'axios';

const baseUrl = 'https://nitetop.local/api';

const Request = Axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default Request;
