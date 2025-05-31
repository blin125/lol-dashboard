import axios from 'axios';

const API_KEY = 'RGAPI-da169b50-3c48-4835-b04a-e5b865172c69'; // ⚠️ Make sure not to expose this on frontend in production
// Need to make sure to hide the API key in production, this is just for testing purposes
// You can use environment variables or a config file to store the API key securely
const regionMap = {
    BR1: { name: "Brazil", cluster: "americas" },
    EUNE: { name: "Europe Nordic & East", cluster: "europe" },
    EUW: { name: "Europe West", cluster: "europe" },
    JP1: { name: "Japan", cluster: "asia" },
    KR1: { name: "Korea", cluster: "asia" },
    LAN: { name: "Latin America North", cluster: "americas" },
    LAS: { name: "Latin America South", cluster: "americas" },
    ME1: { name: "Middle East", cluster: "europe" },
    NA1: { name: "North America", cluster: "americas" },
    OC1: { name: "Oceania", cluster: "asia" },
    RU1: { name: "Russia", cluster: "europe" },
    SG2: { name: "Southeast Asia", cluster: "asia" },
    TW2: { name: "Taiwan", cluster: "asia" },
    TR1: { name: "Turkey", cluster: "europe" },
    VN2: { name: "Vietnam", cluster: "asia" },
  };
function fetchBase(tag = 'BR1') {
    let region;
    if (tag === 'SEA') {
        region = 'sea'; // Use 'sea' directly if tag is 'SEA'
    } else {
        region = regionMap[tag].cluster;
    }
    console.log(`Using region: ${region}`); // Debugging line
    const instance = axios.create({
        baseURL: `https://${region}.api.riotgames.com/`,
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
function fetchBasebyPUUID(tag = 'BR1') {
    console.log(`Using region: ${tag.cluster}`); // Debugging line
    const instance = axios.create({
        baseURL: `https://${tag}.api.riotgames.com/`,
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

export { fetchBase, fetchBasebyPUUID };
