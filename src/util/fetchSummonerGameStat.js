import { fetchBasebyPUUID } from './fetchDefault.js';

// Fetches ranked stats for a summoner by puuid and region
async function fetchSummonerGameStat(puuid, summonerRegion) {
    const api = fetchBasebyPUUID(summonerRegion);
    try {
        const response = await api.get(`/lol/league/v4/entries/by-puuid/${puuid}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "User not found" };
        }
        throw error;
    }
}

export default fetchSummonerGameStat;