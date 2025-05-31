import {fetchBase} from "../util/fetchDefault.js";
import { useState, useEffect } from "react";

function useFetchMatchHistory(puuid, summonerRegion, count = 5) {
    const [matchHistory, setMatchHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            if (!puuid || !summonerRegion) return;
            async function fetchMatches(){
                try{
                    setError(null);
                    let regionForMatch = summonerRegion;
                    // Override for SEA routing values
                    if (summonerRegion === "OC1" || summonerRegion === "SG2" || summonerRegion === "TW2" || summonerRegion === "VN2") {
                        regionForMatch = "SEA";
                    }
                    console.log("puuid:", puuid, "summonerRegion:", summonerRegion, "regionForMatch:", regionForMatch);
                    const api = fetchBase(regionForMatch);
                    const response = await api.get(
                        `/lol/match/v5/matches/by-puuid/${puuid}/ids`,
                        {
                          params: {
                              start: 0,
                              count: count
                          }
                        }
                    );
                    setMatchHistory(response.data)
                    console.log("Match history response:", response.data[0]); // Debugging line
                }
                catch (err) {
                    setError("failed to fetch match history");
                    console.error("Error fetching match history:", err);
                    return;
                }
            }
            fetchMatches();
        }, [puuid, summonerRegion, count]
    );
    return { matchHistory, error };
}
export default useFetchMatchHistory;