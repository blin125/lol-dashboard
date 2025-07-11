import { useState, useEffect } from "react";
import fetchAccountByName from "../util/fetchAccountByName.js";

// Fetches account data by summoner name, tag, and region
function useFetchSummonerByName(summonerName, summonerTag, summonerRegion, submitted) {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!submitted || !summonerName || !summonerTag || !summonerRegion) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAccountByName(summonerName, summonerTag, summonerRegion);
        setAccountData(data);
      } catch (error) {
        setError(error.response?.data || "An error occurred");
        setAccountData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [submitted, summonerName, summonerTag, summonerRegion]);

  return { accountData, error, loading };
}

export default useFetchSummonerByName;