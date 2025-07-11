import { fetchBase } from "./fetchDefault.js";

export async function fetchMatchDetails(matchIds, region) {
    if (["OC1", "SG2", "TW2", "VN2"].includes(region)) {
        console.log("this is the summoner region", region)
        region = "SEA";
    }
    const api = fetchBase(region);
    const details = [];
    for (const matchId of matchIds) {
        try {
            const res = await api.get(`/lol/match/v5/matches/${matchId}`);
            details.push(res.data);
        } catch (e) {
            // Optionally handle errors
        }
    }
    return details;
}