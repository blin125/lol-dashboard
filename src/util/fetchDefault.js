import axios from 'axios';

// Riot API key (do not expose in production)
const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

const regionMap = {
    BR1: { name: "Brazil", cluster: "americas", log: "br"},
    EUNE:{ name: "Europe Nordic & East", cluster: "europe", log: "eune"},
    EUW: { name: "Europe West", cluster: "europe", log: "euw"},
    JP1: { name: "Japan", cluster: "asia", log: "jp"},
    KR1: { name: "Korea", cluster: "asia", log: "kr"},
    LAN: { name: "Latin America North", cluster: "americas", log: "lan"},
    LAS: { name: "Latin America South", cluster: "americas", log: "las"},
    ME1: { name: "Middle East", cluster: "europe", log: "me"}, 
    NA1: { name: "North America", cluster: "americas", log: "na"},
    OC1: { name: "Oceania", cluster: "asia", log: "oce"},
    RU1: { name: "Russia", cluster: "europe", log: "ru"},
    SG2: { name: "Southeast Asia", cluster: "asia", log: "sg"},
    TW2: { name: "Taiwan", cluster: "asia", log: "tw"},
    TR1: { name: "Turkey", cluster: "europe", log: "tr"},
    VN2: { name: "Vietnam", cluster: "asia", log: "vn"},
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

export { fetchBase, fetchBasebyPUUID, regionMap};