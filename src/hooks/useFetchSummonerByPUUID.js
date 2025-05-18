import { useState, useEffect } from "react";
import fetchSummonerByPUUID from "../util/fetchSummonerByPUUID.js";

function useFetchSummonerByPUUID(puuid, summonerRegion) {
  const [summonerData, setSummonerData] = useState(null); // Renamed for consistency
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!puuid || !summonerRegion) return; // Skip if puuid or region is missing

    async function fetchData() {
      try {
        setError(null); // Reset error before fetching
        const data = await fetchSummonerByPUUID(puuid, summonerRegion);
        setSummonerData(data);
      } catch (error) {
        setError(error.response?.data || "An error occurred");
        setSummonerData(null);
      }
    }

    fetchData();
  }, [puuid, summonerRegion]);

  return { summonerData, error };
}

export default useFetchSummonerByPUUID;