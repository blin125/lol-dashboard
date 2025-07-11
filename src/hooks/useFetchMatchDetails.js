import { useState, useEffect } from "react";
import { fetchMatchDetails } from "../util/fetchMatchDetails.js";

// Fetches full match details for an array of match IDs and a region
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
                // Optionally log error for debugging
            });
    }, [matchIds, region]);

    return { matchDetails, error };
}
export default useFetchMatchDetails;