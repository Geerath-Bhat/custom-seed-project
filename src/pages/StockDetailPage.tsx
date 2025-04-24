import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
// Assuming Footer is not needed based on layout 'H + B'
// import Footer from '@/components/layout/Footer';
import StockDetailModalContainer from '@/components/stock_detail_modal_view/StockDetailModalContainer';
import StockSelectorDropdown from '@/components/stock_detail_modal_view/StockSelectorDropdown';
import StockSummaryCard from '@/components/stock_detail_modal_view/StockSummaryCard';
import InteractiveStockChart from '@/components/stock_detail_modal_view/InteractiveStockChart';
import ChartTimeframeSelector from '@/components/stock_detail_modal_view/ChartTimeframeSelector';
import NewsHeadlineList from '@/components/stock_detail_modal_view/NewsHeadlineList';
import FundamentalsPanel from '@/components/stock_detail_modal_view/FundamentalsPanel';
import AnalystRatingsList from '@/components/stock_detail_modal_view/AnalystRatingsList';
import WatchlistActionButton from '@/components/stock_detail_modal_view/WatchlistActionButton';
import ModalCloseButton from '@/components/stock_detail_modal_view/ModalCloseButton';

// --- Placeholder Data --- //

const mockStockOptions = [
  { value: 'AAPL', label: 'Apple Inc. (AAPL)' },
  { value: 'MSFT', label: 'Microsoft Corp. (MSFT)' },
  { value: 'GOOGL', label: 'Alphabet Inc. (GOOGL)' },
  { value: 'AMZN', label: 'Amazon.com, Inc. (AMZN)' },
];

// Data for a specific stock (e.g., AAPL)
const mockStockData = {
  AAPL: {
    summary: {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 175.34,
      priceChange: 2.11,
      priceChangePercent: 1.22,
    },
    chartData: [
      { date: '2023-10-01', close: 170, volume: 50000000 },
      { date: '2023-10-02', close: 172, volume: 55000000 },
      { date: '2023-10-03', close: 171.5, volume: 48000000 },
      { date: '2023-10-04', close: 174, volume: 60000000 },
      { date: '2023-10-05', close: 175.34, volume: 52000000 },
      // Add more data points for different timeframes
    ],
    news: [
      { id: 1, title: 'Apple Unveils New iPhone Model', summary: 'Apple announced its latest iPhone with several new features...', source: 'TechCrunch', publishedDate: '2023-10-04', url: '#' },
      { id: 2, title: 'Analysts Bullish on Apple Stock Ahead of Earnings', summary: 'Several investment banks reiterated their buy ratings...', source: 'Reuters', publishedDate: '2023-10-03', url: '#' },
    ],
    fundamentals: {
      marketCap: 2.75e12,
      peRatio: 28.5,
      dividendYield: 0.55,
      sector: 'Technology',
      industry: 'Consumer Electronics',
      volume: 52000000,
      avgVolume: 58000000,
      yearHigh: 198.23,
      yearLow: 164.08,
    },
    ratings: [
      { id: 'r1', analyst: 'John Doe', institution: 'Top Bank', rating: 'Buy', rationale: 'Strong ecosystem growth anticipated.', date: '2023-10-01', priceTarget: 200 },
      { id: 'r2', analyst: 'Jane Smith', institution: 'Invest Co', rating: 'Hold', rationale: 'Valuation appears stretched short-term.', date: '2023-09-28', priceTarget: 180 },
    ],
  },
  // Add similar mock data for MSFT, GOOGL, AMZN if needed for the selector
  MSFT: { /* ... MSFT data ... */ },
  GOOGL: { /* ... GOOGL data ... */ },
  AMZN: { /* ... AMZN data ... */ },
};

const timeframes = ['1D', '5D', '1M', '6M', '1Y'];

// --- Page Component --- //

const StockDetailPage: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();

  // State for the modal and its content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStockTicker, setSelectedStockTicker] = useState<string>(ticker || mockStockOptions[0].value);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(timeframes[2]); // Default to '1M'

  // Mocked state for user interactions
  const [isSignedIn, setIsSignedIn] = useState(true); // Assume user is signed in for demo
  const [isInWatchlist, setIsInWatchlist] = useState(false); // Assume initially not in watchlist
  const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(false);

  // Derive current stock data based on selected ticker
  // In a real app, this would trigger data fetching
  const currentStock = mockStockData[selectedStockTicker as keyof typeof mockStockData] || mockStockData['AAPL'];
  const stockSummary = currentStock?.summary;
  const mockChartData = currentStock?.chartData || [];
  const mockNewsItems = currentStock?.news || [];
  const mockFundamentals = currentStock?.fundamentals || {};
  const mockAnalystRatings = currentStock?.ratings || [];

  // Effect to control modal visibility based on route parameter
  useEffect(() => {
    if (ticker) {
      setSelectedStockTicker(ticker);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [ticker]);

  // Handle closing the modal - navigate back to a default page (e.g., dashboard)
  const handleModalClose = (open: boolean) => {
    if (!open) {
      setIsModalOpen(false);
      navigate('/dashboard'); // Navigate away when modal closes
    }
  };

  // Handle stock selection change from dropdown
  const handleStockChange = (newTicker: string) => {
    if (newTicker !== selectedStockTicker) {
      setSelectedStockTicker(newTicker);
      // In a real app, you'd likely update the URL without full navigation
      // navigate(`/stock/${newTicker}`, { replace: true });
      // And trigger data fetching for the new ticker here
      console.log(`Selected new stock: ${newTicker}. Data would refetch.`);
    }
  };

  // Mock handler for watchlist toggle
  const handleToggleWatchlist = (tickerToToggle: string, shouldAdd: boolean) => {
    console.log(`${shouldAdd ? 'Adding' : 'Removing'} ${tickerToToggle} ${shouldAdd ? 'to' : 'from'} watchlist...`);
    setIsLoadingWatchlist(true);
    // Simulate API call
    setTimeout(() => {
      setIsInWatchlist(shouldAdd);
      setIsLoadingWatchlist(false);
      console.log(`Watchlist update complete for ${tickerToToggle}.`);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Render Header always */}
      <Header />

      {/* Minimal main content for the page itself, focus is the modal */}
      <main className="flex-1 container mx-auto p-4">
        {/* You might show a loading indicator here if needed before modal opens */} 
        {/* Or leave it blank as the modal takes focus */} 
      </main>

      {/* Render the Modal using StockDetailModalContainer */} 
      <StockDetailModalContainer isOpen={isModalOpen} onOpenChange={handleModalClose}>
        {/* Layout within the modal */} 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[85vh] relative">
          {/* Left/Main Section (Chart, Summary, Timeframe) */} 
          <div className="md:col-span-2 space-y-4 flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4 px-1 pt-1">
              <StockSelectorDropdown
                stocks={mockStockOptions}
                selectedValue={selectedStockTicker}
                onValueChange={handleStockChange}
                className="min-w-[180px] z-10"
              />
              <WatchlistActionButton
                stockTicker={selectedStockTicker}
                isInWatchlist={isInWatchlist}
                isSignedIn={isSignedIn}
                isLoading={isLoadingWatchlist}
                onToggleWatchlist={handleToggleWatchlist}
                className="shrink-0"
              />
            </div>

            {stockSummary && (
              <div className="px-1">
                 <StockSummaryCard {...stockSummary} />
              </div>
            )}

            <div className="px-1">
                <ChartTimeframeSelector
                    timeframes={timeframes}
                    selectedTimeframe={selectedTimeframe}
                    onTimeframeChange={setSelectedTimeframe}
                    className="mb-2"
                />
            </div>
            
            <div className="flex-grow px-1 pb-1 min-h-[300px]"> 
                <InteractiveStockChart
                    data={mockChartData} // Use data derived from selectedStockTicker
                    timeframe={selectedTimeframe}
                />
            </div>
          </div>

          {/* Right/Side Section (Fundamentals, News, Ratings) */} 
          <div className="md:col-span-1 space-y-4 overflow-y-auto max-h-[80vh] pr-2 pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
             <FundamentalsPanel data={mockFundamentals} />
             <AnalystRatingsList ratings={mockAnalystRatings} />
             <NewsHeadlineList newsItems={mockNewsItems} />
          </div>
        </div>

        {/* Modal Close Button (often positioned absolutely by its component) */} 
        <ModalCloseButton />
      </StockDetailModalContainer>

      {/* Footer is not included based on layout 'H + B' */}
      {/* <Footer /> */} 
    </div>
  );
};

export default StockDetailPage;
