import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const ROLE_COLORS = {
  TOP: '#60A5FA',
  JUNGLE: '#34D399',
  MIDDLE: '#FBBF24',
  BOTTOM: '#F472B6',
  UTILITY: '#A78BFA'
};

export default function RoleWinRatePieChart({ matchDetails, puuid }) {
  if (!matchDetails || matchDetails.length === 0) return null;

  const roleStats = {};

  matchDetails.forEach((match) => {
    const player = match.info.participants.find(p => p.puuid === puuid);
    if (!player) return;

    const role = player.teamPosition;
    if (!role || role === '') return;

    if (!roleStats[role]) {
      roleStats[role] = { wins: 0, total: 0 };
    }

    roleStats[role].total += 1;
    if (player.win) {
      roleStats[role].wins += 1;
    }
  });

  const chartData = Object.entries(roleStats).map(([role, stat]) => ({
    name: role,
    value: parseFloat((stat.wins / stat.total * 100).toFixed(1))
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-blue-800 shadow-md mt-6 max-w-md mx-auto">
      <h4 className="text-blue-200 font-semibold text-center mb-2">Win Rate by Role</h4>
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={ROLE_COLORS[entry.name] || '#DDD'} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}
