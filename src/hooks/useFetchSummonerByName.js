import { useState, useEffect } from "react";
import fetchSummonerByName from "../util/fetchSummonerByName.js";

function useFetchSummonerByName(summonerName, summonerTag, summonerRegion, submitted) {
  const [summonerData, setSummonerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!submitted || !summonerName || !summonerTag || !summonerRegion) return; // Skip if not submitted or inputs are empty

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSummonerByName(summonerName, summonerTag, summonerRegion);
        setSummonerData(data);
      } catch (error) {
        setError(error.response?.data || "An error occurred");
        setSummonerData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [submitted, summonerName, summonerTag, summonerRegion]);

  return { summonerData, error, loading };
}

export default useFetchSummonerByName;