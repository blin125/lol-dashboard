# League Dashboard

League Dashboard is a lightweight dashboard for **League of Legends ranked players**. Its primary focus is on **fetching, processing, and visualizing Riot Games API data**, providing a clear view of a player’s profile, ranked stats, recent match history, and simple visualizations (win/loss and role win-rate).  

> ⚠️ The front end was **not the main goal** of this project. I used AI extensively to generate a usable UI, allowing the focus to remain on learning and handling API data efficiently.

---

## Key Features

- Player profile and ranked stats pulled dynamically from the **Riot Games API**  
- Recent match history with **pagination**  
- Win/loss and role win-rate visualizations  
- Placeholder section for future AI-generated insights  

---

## Lessons Learned

This project was a deep dive into **API integration and asynchronous data handling**, with several important takeaways:

- Building **reusable React hooks** for data fetching and separation of concerns  
- Managing **async API requests** including **loading and error states**  
- Transforming API responses into meaningful visualizations  
- Integrating **Chart.js** via `react-chartjs-2` and ensuring canvas/SVG rendering works as expected  
- Debugging React quirks (hooks rules, conditional rendering) and ESLint issues  
- Using **Tailwind CSS** with class-based dark mode and persisting theme in `localStorage`
- Basic pagination and UI state management in a single-page React application  

> This project reinforced that while front-end polish can improve usability, **the core challenge and learning came from API handling and structuring the data efficiently**.

---

## Tech Stack

- **React** (Create React App)  
- **Tailwind CSS** with PostCSS  
- **Chart.js + react-chartjs-2**  
- **ESLint** for linting and **Jest** for testing  
- **Riot Games API** (REST)  
- **Node.js / npm**  

---

## Future Work / Possible Improvements

- Integrate **AI-driven gameplay insights** and tips directly into the dashboard  
- Add **live match tracking** and real-time stat updates  
- Expand visualizations to include **champion-specific stats** and **team synergy analysis**  
- Improve front-end interactivity and responsive design beyond AI-generated components  
- Implement **user authentication** for personalized dashboards  
- Explore **progressive web app (PWA)** support for offline use

## Prerequisite :
1. Create an account with Riot to use a **Development Api Key**

1. Create a ```.env.local``` file and add your secret API key to a variable called ```REACT_APP_RIOT_API_KEY```

## Quick Start
1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm start
```

Open http://localhost:3000
 to view the app.

> Notes: see the CRA documentation for additional scripts, building, testing, and deployment.
