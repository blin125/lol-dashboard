import axios from 'axios';

const API_KEY = 'RGAPI-ad710cd2-76c3-427e-9641-9d37b2f62324'; // ⚠️ Make sure not to expose this on frontend in production

function fetchBase(region = 'asia') {
    const instance = axios.create({
        baseURL: `https://${region}.api.riotgames.com/`, // fixed with backticks and correct service root
    });

    instance.interceptors.request.use((config) => {
        if (!config.params) {
            config.params = {};
        }
        config.params['api_key'] = API_KEY;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return instance;
}

export default fetchBase;
