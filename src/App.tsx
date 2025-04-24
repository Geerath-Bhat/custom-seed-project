
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CartCheckoutPage from "./pages/CartCheckoutPage";
import GameDetailPage from "./pages/GameDetailPage";
import GamesCatalogPage from "./pages/GamesCatalogPage";
import Homepage from "./pages/Homepage";
import ShopInformationBookingPage from "./pages/ShopInformationBookingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/games" element={<GamesCatalogPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/cart" element={<CartCheckoutPage />} />
          <Route path="/shop" element={<ShopInformationBookingPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
