import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import useFetchSummonerByName from './hooks/useFetchSummonerByName.js';
import reportWebVitals from './reportWebVitals.js';
import useFetchSummonerByPUUID from './hooks/useFetchSummonerByPUUID.js';
import useFetchSummonerGameStat from './hooks/useFetchSummonerGameStat.js';
import useFetchMatchHistory from './hooks/useFetchMatchHistory.js';
import useFetchMatchDetails from './hooks/useFetchMatchDetails.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  const [summonerName, setSummonerName] = useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [summonerRegion, setSummonerRegion] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if the form was submitted
  const [puuid, setPuuid] = useState(null);
  const {accountData, error, loading } = useFetchSummonerByName(summonerName, summonerTag, summonerRegion, submitted);
  const {summonerData, error: puuidError } = useFetchSummonerByPUUID(puuid, summonerRegion);
  const {summonerGameData, error: gameStatError} = useFetchSummonerGameStat(puuid, summonerRegion);
  const { matchHistory, error: matchHistoryError } = useFetchMatchHistory(puuid, summonerRegion, 10);
  const { matchDetails, error: matchDetailsError } = useFetchMatchDetails(matchHistory, summonerRegion);

  const handleSubmit = (event) => {
    event.preventDefault();
    const [name, tag] = event.target.Name.value.trim().split('#');
    if (!name || !tag) {
      alert('Please fill in all fields.');
      return;
    }

    setSummonerName(name);
    setSummonerTag(tag);
    setSummonerRegion(event.target.Region.value);
    setSubmitted(true); // Set submitted to true when the form is submitted
    console.log(`Submitting: ${name} with tag ${tag} and region ${event.target.Region.value}`);
  };

  // Log summonerData when it updates
  React.useEffect(() => {
    if (accountData) {
      setPuuid(accountData.puuid);
      console.log('Account Data:', accountData);
    }
  }, [accountData]);

  React.useEffect(() => {
    if (summonerData) {
      console.log('Summoner Data:', summonerData);
    }
  }, [summonerData]);

  React.useEffect(() => {
    if (summonerGameData) {
      console.log('Summoner Game Data:', summonerGameData);
      console.log('Summoner Game Data size:', summonerGameData.length);
    }
  }, [summonerGameData]);
  return (
    <div>
      <h1>Summoner Data</h1>
      <form id="summonerId" onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" name="Name" placeholder={`Summoner Name + #${summonerTag}`} required />
        <label htmlFor="Region">Region</label>
        <select id="Region" name="Region" required>
          <option value="BR1">Brazil</option>
          <option value="EUNE">Europe Nordic & East</option>
          <option value="EUW">Europe West</option>
          <option value="JP1">Japan</option>
          <option value="KR1">Korea</option>
          <option value="LAN">Latin America North</option>
          <option value="LAS">Latin America South</option>
          <option value="ME1">Middle East</option>
          <option value="NA1">North America</option>
          <option value="OC1">Oceania</option>
          <option value="RU1">Russia</option>
          <option value="SG2">Southeast Asia</option>
          <option value="TW2">Taiwan</option>
          <option value="TR1">Turkey</option>
          <option value="VN2">Vietnam</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          {loading && <p>Loading...</p>}
          {accountData && summonerData && (
            <div>
              <h2>Summoner Information</h2>
              <img src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`} alt="Summoner Icon" 
              width={64}
              height={64}/>
              <p><strong>Name:</strong> {accountData.gameName}</p>
              <p><strong>Level:</strong> {summonerData.summonerLevel}</p>
              <p><strong>Region:</strong> {summonerRegion}</p>
            </div>
          )}
          {summonerGameData && summonerGameData.length > 0 && (
            <div>
              <h2>Ranked Statistics</h2>
              <ul>
                {summonerGameData.map((queue) => (
                  <li key={queue.queueType}>
                    <p><strong>Queue:</strong> {queue.queueType}</p>
                    <p><strong>Tier:</strong> {queue.tier} {queue.rank} ({queue.leaguePoints} LP)</p>
                    <p><strong>Wins:</strong> {queue.wins}</p>
                    <p><strong>Losses:</strong> {queue.losses}</p>
                    <p><strong>Win Rate:</strong> {Math.round((queue.wins / (queue.wins + queue.losses)) * 100)}%</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {matchDetails && matchDetails.length > 0 && (
            <div>
              <h2>Match History</h2>
              <ul>
                {matchDetails.map(match => {
                  const player = match.info.participants.find(p => p.puuid === puuid);
                  console.log(player)
                  if (!player) return null;
                  return (
                    <li key={match.metadata.matchId}>
                      <strong>{player.championName}</strong> | {player.kills}/{player.deaths}/{player.assists} | {player.win ? "Win" : "Loss"} | {match.info.gameMode}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
    )}
    </div>
  );
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();