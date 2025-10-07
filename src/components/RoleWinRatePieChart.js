import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

const ROLE_COLORS = {
  TOP: '#60A5FA',
  JUNGLE: '#34D399',
  MIDDLE: '#FBBF24',
  BOTTOM: '#F472B6',
  UTILITY: '#A78BFA',
  UNKNOWN: '#9CA3AF',
};

// preferred display order
const ROLE_ORDER = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY', 'UNKNOWN'];

export default function RoleWinRatePieChart({ matchDetails = [], puuid }) {
  if (!matchDetails || matchDetails.length === 0 || !puuid) return null;

  // aggregate wins/games per role
  const stats = {};
  matchDetails.forEach((m) => {
    const player = m.info?.participants?.find((p) => p.puuid === puuid);
    if (!player) return;
    const raw = (player.teamPosition || 'UNKNOWN').toString().toUpperCase();
    const role = ROLE_ORDER.includes(raw) ? raw : 'UNKNOWN';
    if (!stats[role]) stats[role] = { wins: 0, games: 0 };
    stats[role].games += 1;
    if (player.win) stats[role].wins += 1;
  });

  // build data only for roles that were played
  const chartData = ROLE_ORDER
    .map((role) => {
      const r = stats[role];
      if (!r) return null;
      const winrate =
        r.games > 0 ? parseFloat(((r.wins / r.games) * 100).toFixed(1)) : 0;
      return { role, winrate, games: r.games };
    })
    .filter(Boolean);

  if (chartData.length === 0) return null;

  return (
    <div className="p-4 rounded-xl shadow-md w-full bg-transparent border border-blue-800/30">
      <h4 className="text-blue-200 font-semibold text-center mb-3">
        Win Rate by Role
      </h4>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 12, left: 8, bottom: 6 }}
            barCategoryGap="20%"
            style={{ backgroundColor: 'transparent' }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
            <XAxis
              dataKey="role"
              tick={{ fill: '#c7d2fe', fontSize: 12 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: '#c7d2fe' }}
            />
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.5rem',
              color: '#E0E7FF',
            }}
            itemStyle={{
              color: '#E0E7FF',
            }}
            labelStyle={{
              color: '#93C5FD',
            }}
             cursor={{fill: 'transparent'}}
          />
            <Bar dataKey="winrate" name="Winrate" radius={[6, 6, 0, 0]} isAnimationActive={false}>
              {chartData.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={ROLE_COLORS[entry.role] || ROLE_COLORS.UNKNOWN}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-sm text-blue-200/80 flex flex-wrap justify-center gap-4">
        {chartData.map((d) => (
          <div key={d.role} className="flex items-center gap-2">
            <span
              style={{
                width: 12,
                height: 12,
                background: ROLE_COLORS[d.role] || ROLE_COLORS.UNKNOWN,
                display: 'inline-block',
                borderRadius: 3,
              }}
            />
            <span>
              {d.role}: {d.winrate}% ({d.games})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
