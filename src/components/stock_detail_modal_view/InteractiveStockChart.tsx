import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils'; // Assuming Shadcn utility function

// Define a basic structure for stock data points
interface StockDataPoint {
  date: string | number; // Could be timestamp or formatted date string
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

interface InteractiveStockChartProps {
  data: StockDataPoint[];
  timeframe: string; // e.g., '1D', '5D', '1M', '6M', '1Y'
  className?: string;
}

// Custom Tooltip for OHLC data (example)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Access the full data point
    return (
      <div className="bg-popover text-popover-foreground p-3 border border-border rounded-md shadow-lg text-sm">
        <p className="font-semibold">{typeof label === 'number' ? new Date(label).toLocaleDateString() : label}</p>
        {data.open !== undefined && <p>Open: <span className="font-medium">${data.open.toFixed(2)}</span></p>}
        {data.high !== undefined && <p>High: <span className="font-medium">${data.high.toFixed(2)}</span></p>}
        {data.low !== undefined && <p>Low: <span className="font-medium">${data.low.toFixed(2)}</span></p>}
        {data.close !== undefined && <p>Close: <span className="font-medium text-primary">${data.close.toFixed(2)}</span></p>}
        {data.volume !== undefined && <p>Volume: <span className="font-medium">{data.volume.toLocaleString()}</span></p>}
      </div>
    );
  }
  return null;
};

const InteractiveStockChart: React.FC<InteractiveStockChartProps> = ({ 
  data = [], 
  timeframe, // Use timeframe to potentially adjust data formatting or chart type
  className = ''
}) => {
  // Note: Recharts doesn't have a native Candlestick chart.
  // This example uses a ComposedChart with Line for price and Bar for volume.
  // Implementing a true Candlestick often requires more complex SVG rendering or a different library.

  return (
    <div className={cn('h-[400px] w-full bg-card p-4 rounded-lg border border-border', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            // Add formatting based on timeframe if needed
          />
          <YAxis 
            yAxisId="price" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value.toFixed(2)}`} 
            orientation="right"
            domain={['auto', 'auto']}
          />
          <YAxis 
            yAxisId="volume" 
            orientation="left" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
            domain={[0, 'auto']}
            width={40} // Adjust width for volume axis labels
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--muted), 0.3)' }} />
          {/* <Legend /> */}
          <Line 
            yAxisId="price" 
            type="monotone" 
            dataKey="close" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
            dot={false} 
            name="Close Price"
          />
          <Bar 
            yAxisId="volume" 
            dataKey="volume" 
            fill="hsl(var(--secondary))" 
            barSize={10} 
            name="Volume"
            opacity={0.5}
          />
          {/* Add Brush for zooming if needed */}
          {/* <Brush dataKey="date" height={30} stroke="hsl(var(--primary))" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveStockChart;
