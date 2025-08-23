import axios from 'axios';

// Riot API key (do not expose in production)
const API_KEY = 'RGAPI-005c89d6-99e5-47ba-bb35-90d629292956';

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

// Returns an axios instance for the correct Riot API cluster
function fetchBase(tag = 'BR1') {
    let region;
    if (tag === 'SEA') {
        region = 'sea';
    } else {
        region = regionMap[tag].cluster;
    }
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

// Returns an axios instance for endpoints that require region by PUUID
function fetchBasebyPUUID(tag = 'BR1') {
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