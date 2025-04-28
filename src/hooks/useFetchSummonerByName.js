import { useState, useEffect, useRef } from "react";
import fetchSummonerByName from "../util/fetchSummonerByName.js";

function useFetchSummonerByName(summonerName, tagLine) {
    const [summonerData, setSummonerData] = useState(null); // State to store fetched data
    const [error, setError] = useState(null); // State to store any errors
    const [loading, setLoading] = useState(true); // State to track loading status
    const hasFetched = useRef(false); // Track if fetch has already been initiated

    useEffect(() => {
        if (hasFetched.current) return; // Prevent double fetching
        hasFetched.current = true;

        async function fetchData() {
            try {
                setLoading(true); // Start loading
                const data = await fetchSummonerByName(summonerName, tagLine);
                console.log("Fetched summoner data:", data);
                setSummonerData(data); // Update state with fetched data
            } catch (error) {
                console.error("Failed to fetch summoner:", error);
                setError(error); // Update state with error
            } finally {
                setLoading(false); // Stop loading
            }
        }

        fetchData();
    }, [summonerName, tagLine]); // Re-run effect if summonerName or tagLine changes

    return { summonerData, error, loading }; // Return data, error, and loading state
}

export default useFetchSummonerByName;