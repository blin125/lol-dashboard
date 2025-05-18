import { fetchBase, fetchBasebyPUUID } from './fetchDefault.js';
async function fetchAccountByName(summonerName, summonerTag, summonerRegion) {
    const api = fetchBase(summonerRegion); 
    console.log(`Fetching data for ${summonerName} with tag ${summonerTag}`); // Debugging line
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