import fetchBase from "./fetchBase.js";

const api = fetchBase('asia');

async function fetchSummonerByName(summonerName, tagLine) {
    try {
        const response = await api.get(`/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching summoner:", error);
        throw error;
    }
}

export default fetchSummonerByName;
