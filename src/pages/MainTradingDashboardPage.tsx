import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DashboardFilterGroup from '@/components/main_trading_dashboard/DashboardFilterGroup';
import TrendingStocksSection from '@/components/main_trading_dashboard/TrendingStocksSection';
import StockDetailModal from '@/components/main_trading_dashboard/StockDetailModal';
import MarketTrendOverviewPanel from '@/components/main_trading_dashboard/MarketTrendOverviewPanel';
import RecommendedStocksTable from '@/components/main_trading_dashboard/RecommendedStocksTable';
import LoserStocksTable from '@/components/main_trading_dashboard/LoserStocksTable';
import AppearanceSettings from '@/components/main_trading_dashboard/AppearanceSettings';
import { NewsItem } from '@/components/main_trading_dashboard/StockNewsCards'; // Assuming type export

// --- Placeholder Data Definitions ---

// Filter Group Data
const mockAvailableSectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods'];
const mockAvailableMarketSegments = ['Large Cap', 'Mid Cap', 'Small Cap'];
const mockInitialFilters = { timeframe: '1D' as const };

// Trending Stocks Data (including nested news)
const mockTrendingNews: NewsItem[] = [
  { id: 'n1', headline: 'Tech Giant Hits Record Highs', source: 'MarketWatch', summary: 'Shares surged after positive earnings report.', timestamp: new Date(Date.now() - 3600 * 1000).toISOString(), fullArticle: 'Full article text here...' },
  { id: 'n2', headline: 'New Partnership Announced', source: 'Reuters', summary: 'Strategic alliance expected to boost growth.', timestamp: new Date(Date.now() - 7200 * 1000).toISOString(), fullArticle: 'More details...' },
];
const mockTrendingStocks = [
  { id: 'stock1', ticker: 'TECH', name: 'Tech Innovations Inc.', price: 150.25, changePercent: 2.5, chartData: [{ name: '09:00', value: 148 }, { name: '10:00', value: 149 }, { name: '11:00', value: 151 }, { name: '12:00', value: 150.5 }, { name: '13:00', value: 150.25 }], news: mockTrendingNews },
  { id: 'stock2', ticker: 'HLTH', name: 'Healthcare Solutions Ltd.', price: 85.50, changePercent: -0.8, chartData: [{ name: '09:00', value: 86 }, { name: '10:00', value: 86.2 }, { name: '11:00', value: 85.8 }, { name: '12:00', value: 85.4 }, { name: '13:00', value: 85.50 }], news: mockTrendingNews.slice(0, 1) },
  { id: 'stock3', ticker: 'FINX', name: 'Finance Experts Group', price: 210.70, changePercent: 1.2, chartData: [{ name: '09:00', value: 208 }, { name: '10:00', value: 209 }, { name: '11:00', value: 211 }, { name: '12:00', value: 210 }, { name: '13:00', value: 210.70 }], news: [] },
];

// Market Trend Data (Example: Line Chart)
const mockMarketTrendDataLine = {
  visualizationType: 'line' as const,
  data: [
    { name: 'Mon', value: 12000 },
    { name: 'Tue', value: 12200 },
    { name: 'Wed', value: 12150 },
    { name: 'Thu', value: 12400 },
    { name: 'Fri', value: 12350 },
  ],
};

// Recommended Stocks Data
const mockRecommendedStocks = [
  { id: 'rec1', ticker: 'GROW', name: 'Growth Co.', price: 55.00, changePercent: 3.1, analystRating: 'Buy', recommendationReason: 'Strong earnings forecast and market expansion.' },
  { id: 'rec2', ticker: 'STBL', name: 'Stable Industries', price: 112.30, changePercent: 0.5, analystRating: 'Hold', recommendationReason: 'Solid fundamentals, market leader.' },
  { id: 'rec3', ticker: 'INNV', name: 'Innovate Corp', price: 78.90, changePercent: 4.5, analystRating: 'Strong Buy', recommendationReason: 'Breakthrough technology nearing market release.' },
  // Add more up to 10 if needed
];

// Loser Stocks Data
const mockLoserStocks = [
  { id: 'los1', ticker: 'DECL', name: 'Decline Ltd.', price: 30.10, changePercent: -5.2, analystRating: 'Sell', tooltipInfo: 'Missed earnings expectations significantly.' },
  { id: 'los2', ticker: 'DOWN', name: 'Downwards Inc.', price: 95.60, changePercent: -3.8, analystRating: 'Hold', tooltipInfo: 'Sector experiencing temporary headwinds.' },
  { id: 'los3', ticker: 'NEG', name: 'Negative Returns Plc', price: 15.20, changePercent: -6.1, tooltipInfo: 'Regulatory concerns impacting outlook.' },
  // Add more up to 10 if needed
];

// Stock Detail Modal Data (Example structure)
const mockStockDetailData: { [key: string]: any } = {
  stock1: { id: 'stock1', ticker: 'TECH', name: 'Tech Innovations Inc.', price: 150.25, changePercent: 2.5, marketCap: '500B', volume: '10M', dayHigh: 151.50, dayLow: 148.00, yearHigh: 160.00, yearLow: 100.00, analystRating: 'Buy', historicalData: [{ date: '2023-01-01', price: 110 }, { date: '2023-04-01', price: 130 }, { date: '2023-07-01', price: 140 }, { date: '2023-10-01', price: 145 }, { date: '2024-01-01', price: 150 }], news: mockTrendingNews },
  stock2: { id: 'stock2', ticker: 'HLTH', name: 'Healthcare Solutions Ltd.', price: 85.50, changePercent: -0.8, marketCap: '200B', volume: '5M', dayHigh: 86.50, dayLow: 85.00, yearHigh: 95.00, yearLow: 70.00, analystRating: 'Hold', historicalData: [{ date: '2023-01-01', price: 75 }, { date: '2023-04-01', price: 80 }, { date: '2023-07-01', price: 90 }, { date: '2023-10-01', price: 88 }, { date: '2024-01-01', price: 85 }], news: mockTrendingNews.slice(0, 1) },
  // Add details for other stocks as needed
};

// --- Page Component ---

export default function MainTradingDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStockData, setSelectedStockData] = useState<any | null>(null);
  const [dashboardFilters, setDashboardFilters] = useState(mockInitialFilters);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStockClick = (stockId: string) => {
    // Find the detailed data for the clicked stock (using mock data here)
    const detailData = mockStockDetailData[stockId] || mockTrendingStocks.find(s => s.id === stockId) || mockRecommendedStocks.find(s => s.id === stockId) || mockLoserStocks.find(s => s.id === stockId);
    // If detailed data isn't pre-defined, create a basic structure
    const dataToShow = detailData?.historicalData ? detailData : {
        ...detailData,
        // Add placeholder detailed fields if missing from the basic list item
        marketCap: detailData?.marketCap || 'N/A',
        volume: detailData?.volume || 'N/A',
        dayHigh: detailData?.dayHigh || detailData?.price || 0,
        dayLow: detailData?.dayLow || detailData?.price || 0,
        yearHigh: detailData?.yearHigh || detailData?.price || 0,
        yearLow: detailData?.yearLow || detailData?.price || 0,
        historicalData: [], // Add placeholder historical data if needed
        news: detailData?.news || [], // Ensure news array exists
    };

    if (dataToShow) {
        setSelectedStockData(dataToShow);
        setIsModalOpen(true);
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    setDashboardFilters(filters);
    // In a real app, trigger data refetching based on filters here
  };

  const handleModalClose = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      setSelectedStockData(null); // Clear data when closing
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} hasCollapsibleSidebar={true} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="space-y-6">
            {/* Component 1: Filter Group */}
            <DashboardFilterGroup
              availableSectors={mockAvailableSectors}
              availableMarketSegments={mockAvailableMarketSegments}
              initialFilters={dashboardFilters}
              onFilterChange={handleFilterChange}
            />

            {/* Component 2 & 3: Trending Stocks (Card Group) with News Cards */}
            <TrendingStocksSection
              stocks={mockTrendingStocks}
              onStockClick={handleStockClick}
            />

            {/* Component 5: Market Trend Overview Panel */}
            <MarketTrendOverviewPanel
              title="Market Index Overview"
              visualizationType={mockMarketTrendDataLine.visualizationType}
              data={mockMarketTrendDataLine.data}
            />

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Component 6: Recommended Stocks Table */}
                <RecommendedStocksTable
                stocks={mockRecommendedStocks}
                onStockClick={handleStockClick}
                title="Top Recommended Stocks"
                />

                {/* Component 7: Loser Stocks Table */}
                <LoserStocksTable
                stocks={mockLoserStocks}
                onStockClick={handleStockClick}
                title="Top Loser Stocks"
                />
             </div>

            {/* Component 8: Appearance Settings (Toggle Group) */}
            <AppearanceSettings />
          </div>
        </main>
      </div>
      <Footer />

      {/* Component 4: Stock Detail Modal (Rendered outside main flow) */}
      <StockDetailModal
        stockData={selectedStockData}
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
      />
    </div>
  );
}
