
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import MainTradingDashboardPage from "./pages/MainTradingDashboardPage";
import MarketOverviewPage from "./pages/MarketOverviewPage";
import StockDetailPage from "./pages/StockDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainTradingDashboardPage />} />
          <Route path="/stock/:ticker" element={<StockDetailPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/market-overview" element={<MarketOverviewPage />} />
          {/* catch-all */}
          {/* <Route path="*" element={<NotFound />} /> */}


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
