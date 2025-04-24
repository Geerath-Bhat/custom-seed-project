import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Placeholder data structure
interface IndexDataPoint {
  time: string; // e.g., '10:00', 'Mon', 'Jan'
  [indexName: string]: number | string; // Dynamically add index values like 'S&P 500': 5000
}

interface MarketIndexChartProps {
  data: IndexDataPoint[];
  availableIndices: string[]; // e.g., ['S&P 500', 'NASDAQ', 'Dow Jones']
}

const timeFrames = ['1D', '1W', '1M', '6M', '1Y'];
const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', '#82ca9d', '#ffc658'];

const MarketIndexChart: React.FC<MarketIndexChartProps> = ({ data: initialData, availableIndices }) => {
  const [selectedIndices, setSelectedIndices] = useState<string[]>(availableIndices.slice(0, 2)); // Default to first two indices
  const [timeFrame, setTimeFrame] = useState<string>('1M');

  // In a real app, data would be fetched/filtered based on timeFrame
  const chartData = initialData; // Using placeholder data directly

  const handleIndexChange = (value: string) => {
    // In a real multi-select, this would toggle values
    // For simplicity with single Select, we replace the selection
    // This could be replaced by a multi-select component if available/needed
    if (value) {
        setSelectedIndices([value]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Market Indices</CardTitle>
        <div className="flex items-center space-x-2">
            <Select value={selectedIndices[0]} onValueChange={handleIndexChange}> {/* Simplified: Only showing first selected index */} 
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Index" />
                </SelectTrigger>
                <SelectContent>
                    {availableIndices.map(index => (
                        <SelectItem key={index} value={index}>{index}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
             <ToggleGroup type="single" defaultValue="1M" value={timeFrame} onValueChange={(value) => value && setTimeFrame(value)} size="sm">
                {timeFrames.map(tf => (
                    <ToggleGroupItem key={tf} value={tf} aria-label={`Toggle ${tf}`}>{tf}</ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            {selectedIndices.map((indexName, i) => (
              <Line
                key={indexName}
                type="monotone"
                dataKey={indexName}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MarketIndexChart;
