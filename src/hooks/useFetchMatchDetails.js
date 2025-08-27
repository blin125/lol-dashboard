import { useState, useEffect, useRef } from "react";
import { fetchMatchDetails } from "../util/fetchMatchDetails.js";

function useFetchMatchDetails(matchIds, region) {
    const [matchDetails, setMatchDetails] = useState([]);
    const [error, setError] = useState(null);

    const cacheRef = useRef({});

    useEffect(() => {
        if (!matchIds || matchIds.length === 0 || !region) return;

        let isCancelled = false;
        setError(null);

        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    matchIds.map(async (id) => {
                        if (cacheRef.current[id]) {
                            return cacheRef.current[id];
                        }
                        const detail = await fetchMatchDetails([id], region);
                        cacheRef.current[id] = detail[0];
                        return detail[0];
                    })
                );
                if (!isCancelled) setMatchDetails(results);
            } catch (err) {
                if (!isCancelled) setError("failed to fetch match details");
            }
        };

        fetchAll();

        return () => { isCancelled = true; };
    }, [matchIds, region]);

    return { matchDetails, error };
}
export default useFetchMatchDetails;
