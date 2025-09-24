import { useState, useEffect, useRef } from "react";
import { fetchMatchDetails } from "../util/fetchMatchDetails.js";

function useFetchMatchDetails(matchIds, region) {
  const [matchDetails, setMatchDetails] = useState([]);
  const cacheRef = useRef({});

  useEffect(() => {
    if (!matchIds || matchIds.length === 0 || !region) return;
    let isCancelled = false;

    const fetchDetails = async () => {
      const results = await Promise.all(
        matchIds.map(async (id) => {
          if (cacheRef.current[id]) return cacheRef.current[id];
          const detail = await fetchMatchDetails([id], region);
          cacheRef.current[id] = detail[0];
          return detail[0];
        })
      );
      if (!isCancelled) setMatchDetails(results);
    };

    fetchDetails();
    return () => { isCancelled = true; };
  }, [matchIds, region]);

  return { matchDetails };
}

export default useFetchMatchDetails;
