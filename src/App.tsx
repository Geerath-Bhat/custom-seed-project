
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import DestinationDetailItineraryPage from "./pages/DestinationDetailItineraryPage";
import GroupBookingPage from "./pages/GroupBookingPage";
import HomePage from "./pages/HomePage";
import HotelDetailsBookingPage from "./pages/HotelDetailsBookingPage";
import UserDashboardPage from "./pages/UserDashboardPage";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/home" element={<HomePage />} />
          <Route path="/destination/:id" element={<DestinationDetailItineraryPage />} />
          <Route path="/hotel/:id" element={<HotelDetailsBookingPage />} />
          <Route path="/group" element={<GroupBookingPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          {/* catch-all */}
          {/* <Route path="*" element={<NotFound />} /> */}


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
