import axios from "axios";

const publicApi = axios.create(
    {
        baseURL: 'https://dvs-backend-production.up.railway.app/api'
        // baseURL: 'http://localhost:8080/api'
    }
);

export default publicApi;