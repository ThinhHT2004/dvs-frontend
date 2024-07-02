import axios from "axios";

const protectedApi = axios.create(
    {
        baseURL: 'http://localhost:8080/api'
    }
);

protectedApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
  
    return config;
  });


  export default protectedApi;