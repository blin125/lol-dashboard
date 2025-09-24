import { fetchBasebyPUUID } from './fetchDefault.js';

// Fetches summoner data by puuid and region
async function fetchSummonerByPUUID(puuid, summonerRegion) {
    const api = fetchBasebyPUUID(summonerRegion);
    try {
        const response = await api.get(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "User not found" };
        }
        throw error;
    }
}

export default fetchSummonerByPUUID;