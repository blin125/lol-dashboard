import { fetchBase } from "./fetchDefault.js";

// Fetches an array of match IDs for a given puuid and region
export async function fetchMatchHistory(puuid, summonerRegion, count = 10, start = 0) {
    let regionForMatch = summonerRegion;
    if (["OC1", "SG2", "TW2", "VN2"].includes(summonerRegion)) {
        regionForMatch = "SEA";
    }
    const api = fetchBase(regionForMatch);
    const response = await api.get(
        `/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        { params: { start, count } }
    );
    return response.data;
}