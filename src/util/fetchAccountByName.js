import { fetchBase } from './fetchDefault.js';

// Fetches account data by summoner name and tag
async function fetchAccountByName(summonerName, summonerTag, summonerRegion) {
    const api = fetchBase(summonerRegion);
    try {
        const response = await api.get(`/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "User not found" };
        }
        throw error;
    }
}

export default fetchAccountByName;