import { fetchBase } from "./fetchDefault.js";

export async function fetchMatchHistory(puuid, summonerRegion, count = 10) {
    let regionForMatch = summonerRegion;
    console.log("so close", summonerRegion)
    if (["OC1", "SG2", "TW2", "VN2"].includes(summonerRegion)) {
        console.log("this is the summoner region", summonerRegion)
        regionForMatch = "SEA";
    }
    const api = fetchBase(regionForMatch);
    const response = await api.get(
        `/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        { params: { start: 0, count } }
    );
    return response.data;
}