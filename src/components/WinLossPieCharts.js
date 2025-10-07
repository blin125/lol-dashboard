import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#34D399', '#EF4444'];

export default function WinLossPieCharts({ rankedData }) {
  const queues = rankedData.filter(
    (queue) =>
      queue.queueType === 'RANKED_SOLO_5x5' ||
      queue.queueType === 'RANKED_FLEX_SR'
  );

  const getLabel = (entry) => `${entry.name}: ${entry.value}`;

  return (
    <div className="grid grid-cols-2 gap-4">
      {queues.map((queue, idx) => {
        const data = [
          { name: 'Wins', value: queue.wins },
          { name: 'Losses', value: queue.losses },
        ];
        const title =
          queue.queueType === 'RANKED_SOLO_5x5'
            ? 'Ranked Solo/Duo'
            : 'Ranked Flex';

        return (
          <div
            key={idx}
            className="p-4 rounded-xl shadow-md flex flex-col items-center bg-transparent border border-blue-800/30"
          >
            <h4 className="text-blue-200 font-semibold text-center mb-2">
              {title}
            </h4>
            <PieChart
              width={250}
              height={250}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label={getLabel}
                outerRadius={60}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
        );
      })}
    </div>
  );
}
