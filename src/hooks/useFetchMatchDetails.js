import { useState, useEffect } from "react";
import { fetchMatchDetails } from "../util/fetchMatchDetails.js";

function useFetchMatchDetails(matchIds, region) {
    const [matchDetails, setMatchDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!matchIds || matchIds.length === 0 || !region) return;
        setError(null);
        fetchMatchDetails(matchIds, region)
            .then(setMatchDetails)
            .catch(err => {
                setError("failed to fetch match details");
                console.error("Error fetching match details:", err);
            });
    }, [matchIds, region]);

    return { matchDetails, error };
}
export default useFetchMatchDetails;