import { useState, useEffect } from "react";
import fetchSummonerByName from "../util/fetchSummonerByName.js";

function useFetchSummonerByName(summonerName, summonerTag, summonerRegion) {
  const [summonerData, setSummonerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!summonerName || !summonerTag) return; // Skip if inputs are empty

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSummonerByName(summonerName, summonerTag, summonerRegion);
        setSummonerData(data);
      } catch (error) {
        setError(error);
        setSummonerData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [summonerName, summonerTag]);

  return { summonerData, error, loading };
}

export default useFetchSummonerByName;