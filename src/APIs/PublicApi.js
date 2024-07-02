import axios from "axios";

const publicApi = axios.create(
    {
        baseURL: 'https://dvs-backend-production.up.railway.app/api'
    }
);

export default publicApi;