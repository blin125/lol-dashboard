import { fetchBase } from "./fetchDefault.js";

// Fetches full match details for an array of match IDs and a region
export async function fetchMatchDetails(matchIds, region) {
    if (["OC1", "SG2", "TW2", "VN2"].includes(region)) {
        region = "SEA";
    }
    const api = fetchBase(region);
    const details = [];
    for (const matchId of matchIds) {
        try {
            const res = await api.get(`/lol/match/v5/matches/${matchId}`);
            details.push(res.data);
        } catch (e) {
            console.log("Error fatching Match Details");
        }
    }
    return details;
}