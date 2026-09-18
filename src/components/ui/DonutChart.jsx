import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// data: [{ name, value, color }]
// centerLabel/centerValue render inside the donut hole
export default function DonutChart({ data, centerLabel, centerValue }) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif">{centerValue}</span>
          <span className="text-xs text-ink/50">{centerLabel}</span>
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {data.map((entry) => (
          <li key={entry.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-ink/70">{entry.name}</span>
            <span className="ml-auto pl-4 text-ink/50">
              {entry.value} ({entry.pct}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
