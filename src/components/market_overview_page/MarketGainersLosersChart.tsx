import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Assuming cn utility is setup

// Placeholder data structure
interface MoverData {
  name: string;
  change: number; // Percentage change
}

interface MarketGainersLosersChartProps {
  gainers: MoverData[];
  losers: MoverData[];
  maxItems?: number;
}

const RenderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  const radius = 10;
  const formattedValue = `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <g>
      <text
        x={value > 0 ? x + width + 5 : x - 5}
        y={y + 15} // Adjust vertical position
        fill="hsl(var(--foreground))"
        textAnchor={value > 0 ? 'start' : 'end'}
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {formattedValue}
      </text>
    </g>
  );
};

const MarketGainersLosersChart: React.FC<MarketGainersLosersChartProps> = ({ gainers, losers, maxItems = 5 }) => {
  const topGainers = gainers.slice(0, maxItems).sort((a, b) => a.change - b.change); // sort asc for bottom-up chart
  const topLosers = losers.slice(0, maxItems).sort((a, b) => b.change - a.change); // sort desc for bottom-up chart

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-success">Top Gainers</CardTitle>
        </CardHeader>
        <CardContent>
          {topGainers.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topGainers} layout="vertical" margin={{ left: 10, right: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Change']}
                />
                <Bar dataKey="change" fill="hsl(var(--success))" barSize={20} radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="change" position="right" content={<RenderCustomizedLabel />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
              <p className="text-muted-foreground text-center py-10">No gainers data available.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-destructive">Top Losers</CardTitle>
        </CardHeader>
        <CardContent>
         {topLosers.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topLosers} layout="vertical" margin={{ left: 10, right: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" domain={[dataMin => Math.min(dataMin, 0), 0]} hide/>
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                        formatter={(value: number) => [`${value.toFixed(2)}%`, 'Change']}
                    />
                    <Bar dataKey="change" fill="hsl(var(--destructive))" barSize={20} radius={[0, 4, 4, 0]}>
                        <LabelList dataKey="change" position="right" content={<RenderCustomizedLabel />} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          ) : (
              <p className="text-muted-foreground text-center py-10">No losers data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Add default props for demonstration
MarketGainersLosersChart.defaultProps = {
    gainers: [
        { name: 'Stock A', change: 5.2 },
        { name: 'Stock B', change: 4.8 },
        { name: 'Stock C', change: 4.1 },
        { name: 'Stock D', change: 3.9 },
        { name: 'Stock E', change: 3.5 },
    ],
    losers: [
        { name: 'Stock Z', change: -4.5 },
        { name: 'Stock Y', change: -3.8 },
        { name: 'Stock X', change: -3.2 },
        { name: 'Stock W', change: -2.9 },
        { name: 'Stock V', change: -2.5 },
    ]
}

export default MarketGainersLosersChart;
