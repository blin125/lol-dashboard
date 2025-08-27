import { useState, useEffect } from "react";
import { fetchMatchHistory } from "../util/fetchMatchHistory.js";

function useFetchMatchHistory(puuid, region, matchesPerPage, currentPage) {
  const [allMatchIds, setAllMatchIds] = useState([]);
  const [paginatedMatches, setPaginatedMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!puuid || !region) return;

    let isCancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        // Fetch the full history once (say, 100 matches max)
        const totalToFetch = 100;
        const batchSize = 20;
        let all = [];

        for (let i = 0; i < totalToFetch; i += batchSize) {
          const batch = await fetchMatchHistory(puuid, region, batchSize, i / batchSize + 1);
          all = [...all, ...batch];
        }

        if (!isCancelled) {
          setAllMatchIds(all);
        }
      } catch (err) {
        if (!isCancelled) setError("failed to fetch match history");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => { isCancelled = true; };
  }, [puuid, region]);

  // Slice matches client-side for pagination
  useEffect(() => {
    if (allMatchIds.length === 0) return;
    const start = (currentPage - 1) * matchesPerPage;
    const end = start + matchesPerPage;
    setPaginatedMatches(allMatchIds.slice(start, end));
  }, [allMatchIds, currentPage, matchesPerPage]);

  return { paginatedMatches, allMatchIds, loading, error };
}

export default useFetchMatchHistory;
