import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/homepage/HeroBanner';
import FeaturedGamesCarousel from '@/components/homepage/FeaturedGamesCarousel';
import GameHighlightCards from '@/components/homepage/GameHighlightCards';
import ShopCallout from '@/components/homepage/ShopCallout';
import SiteStats from '@/components/homepage/SiteStats';
import AnnouncementBar from '@/components/homepage/AnnouncementBar';
import ActionButtons from '@/components/homepage/ActionButtons';
import IntroTextBlock from '@/components/homepage/IntroTextBlock';
import { Gamepad2, MapPin, ArrowRight, UserPlus, Package, Users, Ticket, Store } from 'lucide-react';

// --- Placeholder Data --- 

const heroBannerData = {
  headline: "Welcome to Iron Vault Games",
  tagline: "Your ultimate destination for game rentals and purchases, inspired by the invincible Iron Man.",
  ctaPrimary: {
    text: "Browse Games",
    href: "/games",
    icon: Gamepad2
  },
  ctaSecondary: {
    text: "Visit the Shop",
    href: "/shop",
    icon: Store,
    variant: 'secondary' as const
  }
};

const featuredGamesData = [
  {
    id: 'fg1',
    title: "Stark Industries: Legacy",
    imageUrl: "https://via.placeholder.com/400x225/FF0000/FFFFFF?text=Game+Art+1",
    details: "Build your own Stark tech empire in this thrilling simulation.",
    status: 'NEW' as const,
    link: "/games/stark-legacy"
  },
  {
    id: 'fg2',
    title: "Avenger Initiative Tactics",
    imageUrl: "https://via.placeholder.com/400x225/FFD700/000000?text=Game+Art+2",
    details: "Lead the Avengers in strategic turn-based combat.",
    status: 'RENTAL' as const,
    link: "/games/avenger-tactics"
  },
  {
    id: 'fg3',
    title: "Cosmic Gauntlet Quest",
    imageUrl: "https://via.placeholder.com/400x225/000000/FFFFFF?text=Game+Art+3",
    details: "Explore the galaxy and race against Thanos.",
    link: "/games/cosmic-quest"
  },
    {
    id: 'fg4',
    title: "Tech Heroes Arena",
    imageUrl: "https://via.placeholder.com/400x225/C0C0C0/000000?text=Game+Art+4",
    details: "Battle with high-tech heroes in a fast-paced arena.",
    status: 'NEW' as const,
    link: "/games/tech-arena"
  },
];

const highlightedGamesData = [
  {
    id: 'hg1',
    title: "Iron Racer VR",
    imageUrl: "https://via.placeholder.com/300x200/AA0000/FFFFFF?text=Highlight+1",
    status: 'NEW' as const,
    description: "Experience high-speed racing in Iron Man's suit.",
    link: "/games/iron-racer"
  },
  {
    id: 'hg2',
    title: "Armor Wars Strategy",
    imageUrl: "https://via.placeholder.com/300x200/E0C000/000000?text=Highlight+2",
    status: 'RENTAL' as const,
    description: "Defend Stark technology from falling into the wrong hands.",
    link: "/games/armor-wars"
  },
  {
    id: 'hg3',
    title: "Heroic Missions Pack",
    imageUrl: "https://via.placeholder.com/300x200/333333/FFFFFF?text=Highlight+3",
    description: "New missions available for your favorite hero game.",
    link: "/games/missions"
  },
   {
    id: 'hg4',
    title: "Stealth Ops: Ghost Protocol",
    imageUrl: "https://via.placeholder.com/300x200/5555AA/FFFFFF?text=Highlight+4",
    description: "Infiltrate enemy bases using advanced stealth tech.",
    link: "/games/stealth-ops"
  },
];

const shopCalloutData = {
  title: "Visit Our Flagship Store",
  description: "Step into our state-of-the-art physical store, designed with an Iron Man theme. Experience gaming like never before!",
  addressSnippet: "1 Stark Tower Plaza, New York, NY",
  imageUrl: "https://via.placeholder.com/600x400/8B0000/FFFFFF?text=Shop+Interior",
  buttonText: "Visit the Shop Page",
  buttonLink: "/shop"
};

const siteStatsData = [
  {
    id: 'stat1',
    value: "50+",
    label: "New Arrivals This Week",
    iconName: 'Package' as const
  },
  {
    id: 'stat2',
    value: "1,200+",
    label: "Games Available",
    iconName: 'Gamepad2' as const
  },
  {
    id: 'stat3',
    value: "10k+",
    label: "Registered Users",
    iconName: 'Users' as const
  },
  {
    id: 'stat4',
    value: "5k+",
    label: "Rentals Processed",
    iconName: 'Ticket' as const
  }
];

const announcementData = {
  message: "Special Event: Iron Man Anniversary Week! Check out exclusive rentals and offers.",
  link: "#", // Link to event page if available
  linkText: "See Details"
};

const actionButtonsData = [
  {
    text: "Start Browsing Catalog",
    link: "/games",
    iconName: 'ArrowRight' as const,
    variant: 'default' as const
  },
  {
    text: "Register Now",
    link: "#", // Link to registration page
    iconName: 'UserPlus' as const,
    variant: 'secondary' as const
  },
  {
    text: "Explore Shop Info",
    link: "/shop",
    iconName: 'Store' as const,
    variant: 'outline' as const
  }
];

const introTextData = {
  title: "More Than Just a Game Store",
  paragraphs: [
    "Inspired by Tony Stark's innovation and flair, Iron Vault Games offers a curated selection of the latest and greatest video games for purchase and rental.",
    "Whether you're looking for the newest AAA release or a classic favorite, our extensive catalog has something for every gamer. Explore our offerings online or visit our uniquely themed physical store."
  ]
};

// --- Homepage Component --- 

export default function Homepage() {
  // In a real app, you might handle sidebar state here if needed
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> 
      {/* Sidebar would be included here if the layout required it */}
      {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
      
      <main className="flex-grow">
        {/* Components rendered in order specified by Page Data JSON */} 
        <HeroBanner {...heroBannerData} />
        <FeaturedGamesCarousel games={featuredGamesData} />
        <GameHighlightCards title="New & Noteworthy" games={highlightedGamesData} />
        <ShopCallout {...shopCalloutData} />
        <SiteStats stats={siteStatsData} />
        <AnnouncementBar {...announcementData} onClose={() => console.log('Announcement closed')} /> 
        <ActionButtons buttons={actionButtonsData} alignment="center" />
        <IntroTextBlock {...introTextData} />
      </main>

      <Footer />
    </div>
  );
}
