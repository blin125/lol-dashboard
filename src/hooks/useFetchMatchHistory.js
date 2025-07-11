import { useState, useEffect } from "react";
import { fetchMatchHistory } from "../util/fetchMatchHistory.js";

function useFetchMatchHistory(puuid, summonerRegion, count = 10) {
    const [matchHistory, setMatchHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!puuid || !summonerRegion) return;
        setError(null);
        fetchMatchHistory(puuid, summonerRegion, count)
            .then(setMatchHistory)
            .catch(err => {
                setError("failed to fetch match history");
                console.error("Error fetching match history:", err);
            });
    }, [puuid, summonerRegion, count]);

    return { matchHistory, error };
}
export default useFetchMatchHistory;