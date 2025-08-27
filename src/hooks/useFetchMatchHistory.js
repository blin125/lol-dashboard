import { useState, useEffect } from "react";
import { fetchMatchHistory } from "../util/fetchMatchHistory.js";

// Fetches an array of match IDs for a given puuid and region
function useFetchMatchHistory(puuid, summonerRegion, count = 10, page = 1) {
    const [matchHistory, setMatchHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!puuid || !summonerRegion) return;
        setError(null);
        setLoading(true);
        const start = (page - 1) * count;
        fetchMatchHistory(puuid, summonerRegion, count, start)
            .then(setMatchHistory)
            .catch(() => setError("failed to fetch match history"))
            .finally(() => setLoading(false));
    }, [puuid, summonerRegion, count, page]);

    return { matchHistory, error, loading };
}
export default useFetchMatchHistory;
