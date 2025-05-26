import { useState, useEffect } from "react";
import fetchSummonerGameStat from "../util/fetchSummonerGameStat.js";

function useFetchSummonerGameStat(puuid, summonerRegion) {
  const [summonerGameData, setSummonerGameData] = useState([]); // Default to empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!puuid || !summonerRegion) return; // Skip if puuid or region is missing

    async function fetchData() {
      try {
        setError(null); // Reset error before fetching
        const data = await fetchSummonerGameStat(puuid, summonerRegion);
        // If the API returns an error object, treat as empty array
        if (data && data.error) {
          setSummonerGameData([]);
          setError(data.error);
        } else if (Array.isArray(data)) {
          setSummonerGameData(data);
        } else {
          setSummonerGameData([]);
        }
      } catch (error) {
        setError(error.response?.data || "An error occurred");
        setSummonerGameData([]);
      }
    }

    fetchData();
  }, [puuid, summonerRegion]);

  return { summonerGameData, error };
}

export default useFetchSummonerGameStat;