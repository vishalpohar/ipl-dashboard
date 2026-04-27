import {Pie, PieChart, Tooltip, Cell, Legend} from 'recharts'

import './index.css'

const COLORS = ['#22c55e', '#ef4444', '#eab308'] // Won, Lost, Drawn

const PieChartStats = ({
  won = 0,
  lost = 0,
  drawn = 0,
  isAnimationActive = true,
}) => {
  const data = [
    {name: 'Won', value: won},
    {name: 'Lost', value: lost},
    {name: 'Drawn', value: drawn},
  ]

  return (
    <div className="stats-container">
      <h2 className="stats-heading">Match Statistics</h2>

      <div className="chart-container">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="60%"
            label={({percent}) => `${(percent * 100).toFixed(0)}%`}
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

export default PieChartStats
