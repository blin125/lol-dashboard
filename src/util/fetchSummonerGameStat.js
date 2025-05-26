import { fetchBasebyPUUID } from './fetchDefault.js';
async function fetchSummonerGameStat(puuid, summonerRegion) {
    const api = fetchBasebyPUUID(summonerRegion); 
    console.log(`Fetching data for PUUID ${puuid} with tag ${summonerRegion}`); // Debugging line
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