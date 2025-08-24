import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import useFetchSummonerByName from './hooks/useFetchSummonerByName.js';
import reportWebVitals from './reportWebVitals.js';
import useFetchSummonerByPUUID from './hooks/useFetchSummonerByPUUID.js';
import useFetchSummonerGameStat from './hooks/useFetchSummonerGameStat.js';
import useFetchMatchHistory from './hooks/useFetchMatchHistory.js';
import useFetchMatchDetails from './hooks/useFetchMatchDetails.js';
import RoleWinRatePieChart from './components/RoleWinRatePieChart.js';
import WinLossPieCharts from './components/WinLossPieCharts.js';
import { regionMap } from './util/fetchDefault.js';
const COLORS = ['#34D399', '#EF4444'];
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
   // Pagination Handling
  const matchesPerPage = 6;
  const [currentMatchPage, setCurrentMatchPage] = useState(1);

  // State for form and data
  const [summonerName, setSummonerName] = useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [summonerRegion, setSummonerRegion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [puuid, setPuuid] = useState(null);

  // Custom hooks for Riot API data
  const { accountData, error, loading } = useFetchSummonerByName(summonerName, summonerTag, summonerRegion, submitted);
  const { summonerData } = useFetchSummonerByPUUID(puuid, summonerRegion);
  const { summonerGameData } = useFetchSummonerGameStat(puuid, summonerRegion);
  const { matchHistory } = useFetchMatchHistory(puuid, summonerRegion, matchesPerPage, currentMatchPage);
  const { matchDetails } = useFetchMatchDetails(matchHistory, summonerRegion);

  // Pagination helpers
  const MAX_PAGES = 20;
  const hasNextPage = matchDetails && matchDetails.length === matchesPerPage && currentMatchPage < MAX_PAGES;
  const totalPages = MAX_PAGES;
  
  // Region codes for League of Graphs
  const logRegion = regionMap[summonerRegion]?.log || summonerRegion.toLowerCase();

  // Handle form submit
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
    setSubmitted(true);
  };

  // Set puuid when accountData is fetched
  React.useEffect(() => {
    if (accountData) {
      setPuuid(accountData.puuid);
    }
  }, [accountData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100 font-sans">
      {/* Futuristic neon border and glow */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 drop-shadow-lg">
            League of Legends Ranked Dashboard
          </h1>
          <p className="mt-2 text-lg text-blue-200/80 font-medium tracking-wide">
            Track your ranked climb, analyse your games, and get futuristic insights.
          </p>
        </header>

        {/* Search Bar */}
        <form
          id="summonerId"
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center mb-12 bg-gradient-to-r from-blue-900/60 to-blue-700/60 p-4 rounded-2xl shadow-lg border border-blue-800/40"
        >
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Summoner Name #TAG"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
          <select
            id="Region"
            name="Region"
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-blue-700"
            required
          >
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
          <button
            type="submit"
            className="px-8 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition text-white font-bold shadow-lg tracking-wide"
          >
            Search
          </button>
        </form>

        {/* Panels */}
        {submitted && (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Profile & Ranked */}
            <section className="lg:col-span-1 flex flex-col gap-8">
              {/* Loading */}
              {loading && <div className="text-blue-400 text-lg animate-pulse">Loading Matches...</div>}

              {/* Summoner Profile Card */}
              {accountData && summonerData && (
                <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-blue-800/40">
                  {summonerData.profileIconId ? (
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`}
                      alt="Summoner Icon"
                      className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-3xl mb-4">
                      ?
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-blue-300">{accountData.gameName}</h2>
                  <p className="text-blue-400 text-lg">Level {summonerData.summonerLevel}</p>
                  <p className="text-gray-400">{summonerRegion}</p>
                </div>
              )}

              {/* Ranked Stats */}
              {summonerGameData && summonerGameData.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 rounded-2xl shadow-xl p-6 border border-blue-800/40">
                  <h3 className="text-xl font-semibold text-blue-200 mb-4 tracking-wide">Ranked Statistics</h3>
                  <ul className="space-y-4">
                    {summonerGameData.slice() // create a copy to avoid mutating state
                      .sort((a, b) => { const order = {
                          RANKED_SOLO_5x5: 0,
                          RANKED_FLEX_SR: 1,
                        };return (order[a.queueType] ?? 99) - (order[b.queueType] ?? 99);
                      }).map((queue) => (
                        <li key={queue.queueType} className="bg-gray-800/80 rounded-lg p-4 shadow flex flex-col gap-1">
                          <span className="font-bold text-blue-400">
                            {queue.queueType === "RANKED_SOLO_5x5" ? "Ranked Solo/Duo" : queue.queueType === "RANKED_FLEX_SR" ? " Ranked Flex" : queue.queueType}
                          </span>
                          <span>
                            <span className="font-semibold text-blue-300">{queue.tier} {queue.rank}</span>
                            <span className="ml-2 text-gray-400">({queue.leaguePoints} LP)</span>
                          </span>
                          <span className="text-green-400">Wins: {queue.wins}</span>
                          <span className="text-red-400">Losses: {queue.losses}</span>
                          <span className="text-yellow-300">
                            Win Rate: {Math.round((queue.wins / (queue.wins + queue.losses)) * 100)}%
                          </span>
                        </li>
                    ))}
                  </ul>
                </div>
              )}
{summonerGameData && summonerGameData.length > 0 && (
  <>
    <WinLossPieCharts rankedData={summonerGameData} />
    <RoleWinRatePieChart matchDetails={matchDetails} puuid={puuid} />
  </>
)}
</section>

            {/* Right: AI Insights & Match History */}
            <section className="lg:col-span-2 flex flex-col gap-8">
              {/* AI Insights Card (placeholder for future AI features) */}
              <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 rounded-2xl shadow-xl p-6 border border-purple-800/40 mb-4">
                <h3 className="text-lg font-semibold text-purple-200 mb-2 tracking-wide">AI Insights</h3>
                <p className="text-gray-200 italic">Your personalised ranked tips and analysis will appear here soon!</p>
              </div>

              {/* Match History */}
              {matchDetails && matchDetails.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 rounded-2xl shadow-xl p-6 border border-blue-800/40">
                  <h3 className="text-xl font-semibold text-blue-200 mb-4 tracking-wide">Recent Ranked Matches</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchDetails && matchDetails.map(match => {
                      const player = match.info.participants.find(p => p.puuid === puuid);
                      if (!player) return null;
                      // Remove region prefix from matchId (e.g. OC1_674935542 -> 674935542)
                      const matchId = match.metadata.matchId.replace(/^[A-Z0-9]+_/, '');
                      // Find your participant index for anchor (1-based)
                      const participantIdx = match.info.participants.findIndex(p => p.puuid === puuid) + 1;
                      const logUrl = `https://www.leagueofgraphs.com/match/${logRegion}/${matchId}#participant${participantIdx}`;
                      return (
                        <li key={match.metadata.matchId} className="bg-gray-800/80 rounded-lg p-4 flex flex-col gap-1 shadow">
                          <span className="font-bold text-blue-400">{player.championName}</span>
                          <span>
                            <span className="text-green-400">{player.kills}</span>/
                            <span className="text-red-400">{player.deaths}</span>/
                            <span className="text-yellow-300">{player.assists}</span>
                            {" "} | {player.win ? (
                              <span className="text-green-400">Win</span>
                            ) : (
                              <span className="text-red-400">Loss</span>
                            )}
                          </span>
                          <span className="text-gray-400">
                            {
                              match.info.queueId === 420 ? "Ranked Solo/Duo" : match.info.queueId === 440 ? "Ranked Flex" : match.info.gameMode
                            }
                          </span>
                          <a
                            href={logUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-blue-400 underline hover:text-blue-200 text-sm"
                          >
                            View on League of Graphs
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  {/* {Pagination} */}
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 disabled:opacity-50"
                      onClick={() => setCurrentMatchPage(p => Math.max(p - 1, 1))}
                      disabled={currentMatchPage === 1}
                    >
                      Previous
                    </button>
                    <span className="text-blue-200">
                      Page {currentMatchPage} of {totalPages}
                    </span>
                    <button
                      className="px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 disabled:opacity-50"
                      onClick={() => setCurrentMatchPage(p => p + 1)}
                      disabled={!hasNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}            
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();