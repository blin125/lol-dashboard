import { useState, useEffect } from "react";
import fetchSummonerByPUUID from "../util/fetchSummonerByPUUID.js";

// Fetches summoner data by puuid and region
function useFetchSummonerByPUUID(puuid, summonerRegion) {
  const [summonerData, setSummonerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!puuid || !summonerRegion) return;

    async function fetchData() {
      try {
        setError(null);
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