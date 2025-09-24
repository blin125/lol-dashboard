import { useState, useEffect } from "react";
import fetchSummonerGameStat from "../util/fetchSummonerGameStat.js";

// Fetches ranked stats for a summoner by puuid and region
function useFetchSummonerGameStat(puuid, summonerRegion) {
  const [summonerGameData, setSummonerGameData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!puuid || !summonerRegion) return;

    async function fetchData() {
      try {
        setError(null);
        const data = await fetchSummonerGameStat(puuid, summonerRegion);
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