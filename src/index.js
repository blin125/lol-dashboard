import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import useFetchSummonerByName from './hooks/useFetchSummonerByName.js';
import reportWebVitals from './reportWebVitals.js';
import fetchBase from './util/fetchBase.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [summonerName, setSummonerName] = useState('');
  const [summonerTag, setSummonerTag] = useState('');
  const [summonerRegion, setSummonerRegion] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if the form was submitted
  const { summonerData, error, loading } = useFetchSummonerByName(summonerName, summonerTag, summonerRegion, submitted);

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
          <option value="VN2">Vietnan</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: User not found.</p>}
          {summonerData && (
            <pre>{JSON.stringify(summonerData, null, 2)}</pre>
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