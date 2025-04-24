import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Activity, TrendingUp, Map, Smile, Frown } from 'lucide-react';

// Define potential visualization types
type VisualizationType = 'line' | 'heatmap' | 'sentiment_bar';

// Placeholder data structures based on visualization type
interface LineDataPoint { name: string; value: number; }
interface HeatmapSector { name: string; value: number; } // Simplified heatmap data
interface SentimentData { positive: number; negative: number; neutral: number; }

interface MarketTrendOverviewPanelProps {
  title?: string;
  visualizationType: VisualizationType;
  data: LineDataPoint[] | HeatmapSector[] | SentimentData; // Adjust based on type
}

// Helper to render the correct chart
const renderVisualization = (type: VisualizationType, data: any) => {
  switch (type) {
    case 'line':
      const lineData = data as LineDataPoint[];
      const lastValue = lineData[lineData.length - 1]?.value ?? 0;
      const firstValue = lineData[0]?.value ?? 1; // Avoid division by zero
      const isPositiveTrend = lastValue >= firstValue;
      const strokeColor = isPositiveTrend ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={lineData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            {/* Minimal axes */}
            <XAxis dataKey="name" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#trendGradient)"
              />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 'heatmap': // Simplified heatmap using colored boxes
      const heatmapData = data as HeatmapSector[];
      return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 p-2 h-[200px] overflow-y-auto no-scrollbar">
          {heatmapData.map((sector) => {
            // Simple value-to-color mapping (example)
            let bgColorClass = 'bg-muted';
            if (sector.value > 1) bgColorClass = 'bg-success/70';
            else if (sector.value < -1) bgColorClass = 'bg-destructive/70';
            else if (sector.value > 0) bgColorClass = 'bg-success/30';
            else if (sector.value < 0) bgColorClass = 'bg-destructive/30';

            return (
              <div key={sector.name} className={`p-2 rounded-md flex flex-col items-center justify-center text-center ${bgColorClass}`}>
                <span className="text-xs font-medium text-foreground/90 truncate w-full">{sector.name}</span>
                <span className={`text-sm font-bold ${sector.value > 0 ? 'text-success-foreground' : sector.value < 0 ? 'text-destructive-foreground' : 'text-foreground'}`}>
                    {sector.value.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      );
    case 'sentiment_bar':
      const sentiment = data as SentimentData;
      const total = sentiment.positive + sentiment.negative + sentiment.neutral;
      const positivePercent = total > 0 ? (sentiment.positive / total) * 100 : 0;
      const negativePercent = total > 0 ? (sentiment.negative / total) * 100 : 0;
      const neutralPercent = total > 0 ? (sentiment.neutral / total) * 100 : 0;
      return (
          <div className="w-full h-[200px] flex flex-col justify-center items-center p-4 space-y-3">
              <div className="w-full h-6 flex rounded-full overflow-hidden border border-border">
                  <div className="bg-success h-full flex items-center justify-center" style={{ width: `${positivePercent}%` }} title={`Positive: ${positivePercent.toFixed(1)}%`}>
                     {positivePercent > 10 && <Smile className="h-4 w-4 text-success-foreground" />} 
                  </div>
                  <div className="bg-muted h-full flex items-center justify-center" style={{ width: `${neutralPercent}%` }} title={`Neutral: ${neutralPercent.toFixed(1)}%`}>
                       {/* Neutral Icon or Text if needed */}
                  </div>
                  <div className="bg-destructive h-full flex items-center justify-center" style={{ width: `${negativePercent}%` }} title={`Negative: ${negativePercent.toFixed(1)}%`}>
                      {negativePercent > 10 && <Frown className="h-4 w-4 text-destructive-foreground" />} 
                  </div>
              </div>
               <div className="flex justify-between w-full text-xs text-muted-foreground px-1">
                  <span>{positivePercent.toFixed(1)}% Positive</span>
                  <span>{neutralPercent.toFixed(1)}% Neutral</span>
                  <span>{negativePercent.toFixed(1)}% Negative</span>
               </div>
          </div>
      );
    default:
      return <p className="text-muted-foreground text-center py-10">Unsupported visualization type.</p>;
  }
};

// Map type to Icon
const getIcon = (type: VisualizationType) => {
    switch(type) {
        case 'line': return <TrendingUp className="mr-2 h-5 w-5 text-primary" />;
        case 'heatmap': return <Map className="mr-2 h-5 w-5 text-primary" />;
        case 'sentiment_bar': return <Activity className="mr-2 h-5 w-5 text-primary" />;
        default: return <Activity className="mr-2 h-5 w-5 text-primary" />;
    }
}

const MarketTrendOverviewPanel: React.FC<MarketTrendOverviewPanelProps> = ({ title = 'Market Trend Overview', visualizationType, data }) => {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-xl font-semibold flex items-center">
          {getIcon(visualizationType)}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
         {renderVisualization(visualizationType, data)}
      </CardContent>
    </Card>
  );
};

export default MarketTrendOverviewPanel;
