import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import useFetchSummonerByName from './hooks/useFetchSummonerByName.js';
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  // Use the hook and destructure its returned values
  const { summonerData, error, loading } = useFetchSummonerByName('TheWindToTheSoul', 'OC');

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Render fetched summoner data
  return (
    <div>
      <h1>Summoner Data</h1>
      {summonerData ? (
        <pre>{JSON.stringify(summonerData, null, 2)}</pre> // Pretty-print JSON data
      ) : (
        <p>No data available.</p>
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