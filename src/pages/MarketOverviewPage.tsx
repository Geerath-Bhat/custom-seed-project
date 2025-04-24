import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import MarketFilterGroup from '@/components/market_overview_page/MarketFilterGroup';
import MarketIndexChart from '@/components/market_overview_page/MarketIndexChart';
import SectorHeatMap from '@/components/market_overview_page/SectorHeatMap';
import MarketStatCards from '@/components/market_overview_page/MarketStatCards';
import SectorMoversTable from '@/components/market_overview_page/SectorMoversTable';
import MarketGainersLosersChart from '@/components/market_overview_page/MarketGainersLosersChart';
import MarketNewsPanel from '@/components/market_overview_page/MarketNewsPanel';
import MarketNavigationLinks from '@/components/market_overview_page/MarketNavigationLinks';

// Placeholder Data Definitions
interface FilterOptions {
  exchanges: string[];
  regions: string[];
  sectors: string[];
}

interface IndexDataPoint {
  time: string;
  [indexName: string]: number | string;
}

interface SectorPerformance {
  name: string;
  change: number;
  volume?: number;
}

interface MarketStats {
  advancing: number;
  declining: number;
  unchanged: number;
  sentiment?: 'Bullish' | 'Bearish' | 'Neutral';
  marketHigh?: number;
  marketLow?: number;
}

interface SectorMover {
  id: string;
  name: string;
  change: number;
  volume: number;
}

interface MoverData {
  name: string;
  change: number;
}

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  publishTime: Date;
  source: string;
  url: string;
}

// --- Placeholder Data --- 

const mockFilterOptions: FilterOptions = {
  exchanges: ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX'],
  regions: ['North America', 'Europe', 'Asia', 'South America', 'Oceania'],
  sectors: ['Technology', 'Healthcare', 'Financials', 'Energy', 'Industrials', 'Consumer Discretionary', 'Utilities', 'Real Estate', 'Materials'],
};

const mockAvailableIndices: string[] = ['S&P 500', 'NASDAQ Comp.', 'Dow Jones IA', 'FTSE 100', 'Nikkei 225'];

const mockIndexData: IndexDataPoint[] = [
  { time: 'Jan', 'S&P 500': 4800, 'NASDAQ Comp.': 15000, 'Dow Jones IA': 37000 },
  { time: 'Feb', 'S&P 500': 4950, 'NASDAQ Comp.': 15500, 'Dow Jones IA': 37500 },
  { time: 'Mar', 'S&P 500': 5100, 'NASDAQ Comp.': 15800, 'Dow Jones IA': 38000 },
  { time: 'Apr', 'S&P 500': 5050, 'NASDAQ Comp.': 15600, 'Dow Jones IA': 37800 },
  { time: 'May', 'S&P 500': 5200, 'NASDAQ Comp.': 16000, 'Dow Jones IA': 38500 },
  { time: 'Jun', 'S&P 500': 5250, 'NASDAQ Comp.': 16200, 'Dow Jones IA': 38800 },
];

const mockSectorPerformanceData: SectorPerformance[] = [
    { name: 'Technology', change: 1.95, volume: 180000000 },
    { name: 'Healthcare', change: -0.6, volume: 115000000 },
    { name: 'Financials', change: 0.3, volume: 130000000 },
    { name: 'Energy', change: 2.8, volume: 105000000 },
    { name: 'Consumer Disc.', change: -2.1, volume: 75000000 },
    { name: 'Industrials', change: 0.85, volume: 85000000 },
    { name: 'Utilities', change: -0.2, volume: 50000000 },
    { name: 'Real Estate', change: 1.2, volume: 65000000 },
    { name: 'Materials', change: 0.5, volume: 70000000 },
];

const mockMarketStats: MarketStats = {
  advancing: 2150,
  declining: 1050,
  unchanged: 380,
  sentiment: 'Neutral',
  marketHigh: 5260.75,
  marketLow: 5225.10,
};

const mockSectorMoversData: SectorMover[] = [
  { id: 'energy', name: 'Energy', change: 2.8, volume: 105000000 },
  { id: 'tech', name: 'Technology', change: 1.95, volume: 180000000 },
  { id: 'realestate', name: 'Real Estate', change: 1.2, volume: 65000000 },
  { id: 'industrials', name: 'Industrials', change: 0.85, volume: 85000000 },
  { id: 'materials', name: 'Materials', change: 0.5, volume: 70000000 },
  { id: 'financials', name: 'Financials', change: 0.3, volume: 130000000 },
  { id: 'utils', name: 'Utilities', change: -0.2, volume: 50000000 },
  { id: 'healthcare', name: 'Healthcare', change: -0.6, volume: 115000000 },
  { id: 'consumer', name: 'Consumer Disc.', change: -2.1, volume: 75000000 },
];

const mockGainersData: MoverData[] = [
  { name: 'GainerCorp', change: 6.1 },
  { name: 'UpStock Inc', change: 5.8 },
  { name: 'Profit Ltd', change: 5.3 },
  { name: 'Advance Co', change: 4.9 },
  { name: 'Bullish Ent', change: 4.5 },
];

const mockLosersData: MoverData[] = [
  { name: 'Decline Plc', change: -5.5 },
  { name: 'DownTrend Sys', change: -4.9 },
  { name: 'LossMaking', change: -4.3 },
  { name: 'Bearish Ltd', change: -4.0 },
  { name: 'Shrink Co', change: -3.7 },
];

const mockNewsItems: NewsItem[] = [
  {
    id: 'n1',
    headline: 'Global Markets React to Latest Inflation Data',
    summary: 'Markets worldwide showed mixed reactions as new inflation figures were released, raising questions about future central bank policies.',
    publishTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    source: 'Global Finance News',
    url: '#',
  },
  {
    id: 'n2',
    headline: 'Energy Sector Surges on Supply Concerns',
    summary: 'Ongoing geopolitical tensions and supply chain disruptions have led to a significant rally in energy stocks globally.',
    publishTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    source: 'Oil & Gas Monitor',
    url: '#',
  },
  {
    id: 'n3',
    headline: 'Economic Forum Discusses Impact of AI on Productivity',
    summary: 'Leaders at the World Economic Forum debated the potential boosts and challenges artificial intelligence presents to global productivity and labor markets.',
    publishTime: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    source: 'Economic Times',
    url: '#',
  },
  {
    id: 'n4',
    headline: 'Central Bank Watch: Rate Hike Expectations Shift',
    summary: 'Analysts are revising their forecasts for future interest rate hikes following recent comments from central bank officials and evolving economic indicators.',
    publishTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    source: 'Financial Analysts Hub',
    url: '#',
  },
];

// --- Page Component --- 

const MarketOverviewPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Dummy handler for filter changes - replace with actual logic
  const handleFilterChange = (filters: any) => {
    console.log('Market filters changed:', filters);
    // In a real app, trigger data refetching/updating based on these filters
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} hasCollapsibleSidebar={true} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-6">
            {/* Component 1: Filter Group */}
            <MarketFilterGroup options={mockFilterOptions} onFilterChange={handleFilterChange} />

            {/* Component 2: Line Chart */}
            <MarketIndexChart data={mockIndexData} availableIndices={mockAvailableIndices} />

            {/* Component 3: Heat Map */}
            <SectorHeatMap sectors={mockSectorPerformanceData} />

            {/* Component 4: Stat Card Group */}
            <MarketStatCards stats={mockMarketStats} />

            {/* Component 5: Table */}
            <SectorMoversTable movers={mockSectorMoversData} title="Top Sector Movers (Filtered)" />

            {/* Component 6: Bar Chart */}
            <MarketGainersLosersChart gainers={mockGainersData} losers={mockLosersData} />

            {/* Component 7: News Panel */}
            <MarketNewsPanel newsItems={mockNewsItems} title="Market Headlines & Economic Updates" />

            {/* Component 8: Navigation Links */}
            <MarketNavigationLinks dashboardPath="/dashboard" sectorAnalysisPath="/sectors" /> {/* Assuming a general /sectors route */} 
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MarketOverviewPage;
