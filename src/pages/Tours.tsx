import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bird, ChevronDown, X, ArrowRight, Sparkles, MapPin, Clock, 
  Star, Trees, Building, Filter, Play, Calendar, Users, 
  Mountain, Compass, Sun, Moon, Leaf, Camera
} from 'lucide-react';

// Custom CSS animations and styles (same as main page)
const customStyles = `
  html {
    scroll-behavior: smooth;
  }
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
  }
  
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
  
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  
  .animation-delay-1500 {
    animation-delay: 1.5s;
  }
  
  .hero-text-reveal {
    opacity: 0;
    animation: fade-in-up 1s ease-out 0.3s forwards;
  }
  
  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
  
  .content-max-width {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

interface Tour {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  duration: string;
  difficulty: string;
  speciesFocus: string[];
  image: string;
  category: string;
  color: string;
  description: string;
  details: {
    meetingPoint: string;
    guide: string;
    focus: string;
    whatToBring: string[];
    keyFeatures?: string[];
    birdlifePotential?: string;
  };
  seasonality: string[];
  timeOfDayPreference: string[];
  environmentType: string;
  route?: Array<{ name: string; instructions: string; birdsToSpot?: string[] }>;
  frequentBirds: string[];
}

const tours: Tour[] = [
  {
    id: 1,
    title: "Arboretum's Natural Treasures",
    subtitle: "A Deep Dive into CSUF's Premier Birding Hotspot",
    time: "8:00 AM - 11:00 AM",
    duration: "60 min",
    difficulty: "Moderate",
    speciesFocus: ["Hawks", "Owls", "Woodpeckers", "Waterfowl", "Native Songbirds"],
    image: "/ARB_lake.jpg",
    category: "arboretum",
    color: "from-green-500 to-teal-600",
    description: "Explore the 26-acre Fullerton Arboretum. Discover diverse plant collections and spot varied birdlife.",
    details: {
      meetingPoint: "Fullerton Arboretum Entrance (near Heritage House)",
      guide: "Arboretum Staff Biologist / Trained Docent",
      focus: "Identifying birds across diverse global plant collections, understanding plant-bird co-evolution.",
      whatToBring: ["Binoculars (essential)", "Field guide/app", "Water", "Comfortable shoes", "Sun hat"],
      keyFeatures: ["Woodlands", "Desert Collection", "Mediterranean Collection", "Native Meadow", "Lake & Ponds"],
    },
    seasonality: ["Spring", "Fall", "All Year"],
    timeOfDayPreference: ["Morning"],
    environmentType: "Nature",
    route: [
      { name: "Arboretum Entrance", instructions: "Meet near Heritage House. Overview of the Arboretum.", birdsToSpot: ["House Finch", "Mourning Dove"] },
      { name: "Woodlands Collection", instructions: "Explore the shaded paths. Listen for woodpeckers and songbirds.", birdsToSpot: ["Nuttall's Woodpecker", "Bewick's Wren", "Oak Titmouse"] },
      { name: "Desert Collection", instructions: "Look for hummingbirds among the cacti and agaves.", birdsToSpot: ["Anna's Hummingbird", "Costa's Hummingbird", "Verdin"] },
      { name: "Lake & Ponds", instructions: "Observe waterfowl and wading birds. Scan the edges for herons.", birdsToSpot: ["Mallard", "American Coot", "Great Blue Heron", "Snowy Egret"] },
      { name: "Native Meadow & Chaparral Hill", instructions: "Spot native sparrows and towhees in the scrub.", birdsToSpot: ["California Towhee", "Spotted Towhee", "Song Sparrow", "Wrentit"] }
    ],
    frequentBirds: ["Anna's Hummingbird", "California Scrub-Jay", "California Towhee", "House Finch", "Mourning Dove", "Mallard", "American Coot", "Red-shouldered Hawk"]
  },
  {
    id: 2,
    title: "Campus Core & Urban Adapters",
    subtitle: "Birding Amongst CSUF's Iconic Buildings",
    time: "10:00 AM / 2:00 PM",
    duration: "30 min",
    difficulty: "Easy",
    speciesFocus: ["Mourning Doves", "Northern Mockingbirds", "House Finches", "Black Phoebes"],
    image: "/LIB_day.jpg",
    category: "campus",
    color: "from-sky-400 to-blue-600",
    description: "Discover avian inhabitants around CSUF landmarks like Pollak Library, Mihaylo Hall, and the TSU.",
    details: {
      meetingPoint: "Pollak Library South Entrance",
      guide: "Student Naturalist",
      focus: "Observing common campus birds and their adaptation to urban environments.",
      whatToBring: ["Binoculars", "Water", "Comfortable shoes"],
      keyFeatures: ["Pollak Library", "Mihaylo Hall (cactus garden, orange trees)", "TSU (garden amphitheater)", "Campus Quads"],
    },
    seasonality: ["All Year"],
    timeOfDayPreference: ["Morning", "Afternoon"],
    environmentType: "Urban",
    route: [
      { name: "Pollak Library", instructions: "Start at the south entrance. Observe trees and open areas nearby.", birdsToSpot: ["Mourning Dove", "House Sparrow"] },
      { name: "Mihaylo Hall", instructions: "Check the native landscaping, cactus garden, and any orange trees for activity.", birdsToSpot: ["Black Phoebe", "Lesser Goldfinch", "Anna's Hummingbird"] },
      { name: "Titan Student Union", instructions: "Explore the garden amphitheater and surrounding green spaces.", birdsToSpot: ["Northern Mockingbird", "House Finch"] },
      { name: "Central Quad", instructions: "Scan the lawns and mature trees for foraging birds.", birdsToSpot: ["American Robin", "European Starling", "Brewer's Blackbird"] }
    ],
    frequentBirds: ["Mourning Dove", "Northern Mockingbird", "House Finch", "Black Phoebe", "American Crow", "European Starling"]
  },
  {
    id: 3,
    title: "Evening Chorus at the Arboretum",
    subtitle: "Sunset Birdsong and Roosting Behaviors",
    time: "5:30 PM (Seasonal)",
    duration: "60 min",
    difficulty: "Easy",
    speciesFocus: ["Owls (potential)", "Robins", "Roosting species"],
    image: "/ARB_lake.jpg",
    category: "arboretum",
    color: "from-purple-400 to-pink-500",
    description: "View birds preparing for the night as sunset approaches in the Arboretum.",
    details: {
      meetingPoint: "Arboretum Pavilion",
      guide: "Arboretum Docent",
      focus: "Identifying birds active at dusk, learning about roosting behaviors, and listening for evening calls.",
      whatToBring: ["Binoculars", "Light jacket", "Insect repellent (seasonal)"],
       keyFeatures: ["Woodlands Collection", "Open areas for sunset views", "Near water features"],
    },
    seasonality: ["Spring", "Summer", "Fall"],
    timeOfDayPreference: ["Evening"],
    environmentType: "Nature",
     route: [
      { name: "Arboretum Pavilion", instructions: "Gather as the sun begins to set. Discuss roosting bird behavior.", birdsToSpot: ["American Robin", "Northern Mockingbird"] },
      { name: "Edge of Woodlands", instructions: "Listen for owls calling and observe birds settling in for the night.", birdsToSpot: ["Great Horned Owl (listen)", "Black-crowned Night-Heron (near water)"] },
      { name: "Open Meadow Viewpoint", instructions: "Watch for late insectivores and any aerial displays.", birdsToSpot: ["Swallows (seasonal)", "Bats (non-avian!)"] },
      { name: "Quiet Pond Stroll", instructions: "Observe any remaining waterfowl activity as light fades.", birdsToSpot: ["Mallard", "American Coot"] }
    ],
    frequentBirds: ["American Robin", "Northern Mockingbird", "Black Phoebe", "Mourning Dove", "Great Horned Owl (by sound)"]
  },
   {
    id: 4,
    title: "Sustainable Landscapes Birding",
    subtitle: "Birds Thriving in CSUF's Eco-Friendly Zones",
    time: "Afternoon (Check Schedule)",
    duration: "30 min",
    difficulty: "Easy",
    speciesFocus: ["Native Sparrows", "Lesser Goldfinch", "Bushtit", "Pollinator-attracted birds"],
    image: "/VA_icecream.jpg",
    category: "campus",
    color: "from-lime-500 to-emerald-600",
    description: "Explore how CSUF's drought-tolerant and native plant landscaping choices benefit local bird populations around newer campus developments.",
    details: {
      meetingPoint: "Front of Visual Arts Complex",
      guide: "Campus Sustainability Intern",
      focus: "Identifying birds in native & drought-tolerant landscapes, understanding plant-insect-bird relationships.",
      whatToBring: ["Binoculars", "Notebook", "Water"],
      keyFeatures: ["Visual Arts Complex landscaping", "Mihaylo Hall native plants", "Other bioswales or eco-zones"],
    },
    seasonality: ["All Year", "Spring (for flowering/nesting)"],
    timeOfDayPreference: ["Afternoon", "Morning"],
    environmentType: "Semi-Urban",
    route: [
      { name: "Visual Arts Complex", instructions: "Examine the new drought-resistant plantings and slender trees.", birdsToSpot: ["Lesser Goldfinch", "House Finch", "Bushtit"] },
      { name: "Mihaylo Hall Eco-zones", instructions: "Observe native plant sections and any bioswales.", birdsToSpot: ["Song Sparrow", "Anna's Hummingbird"] },
      { name: "ECS Lawn & Surroundings", instructions: "Check edges and nearby trees for activity.", birdsToSpot: ["Black Phoebe", "Mourning Dove"] }
    ],
    frequentBirds: ["Lesser Goldfinch", "Anna's Hummingbird", "Bushtit", "Song Sparrow", "Black Phoebe"]
  }
];

const Tours = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTourModal, setSelectedTourModal] = useState<Tour | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.location.href = '/';
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackgroundClass = scrollY > 50 
    ? "bg-white/80 backdrop-blur-xl shadow-md border-gray-200/80"
    : "bg-transparent backdrop-blur-none shadow-none border-transparent";

  const navLogoTextColorClass = scrollY > 50 ? "text-gray-800" : "text-white [text-shadow:_1px_1px_3px_rgb(0_0_0_/_40%)]";
  const navLinkColorClass = scrollY > 50
    ? "text-foreground/70 hover:text-primary"
    : "text-gray-100 hover:text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_30%)]";
  const navIconColorClass = scrollY > 50 ? "text-primary" : "text-white";
  const mobileMenuIconColorClass = scrollY > 50 ? "bg-foreground/70" : "bg-white";

  const tourCategories = [
    {id: 'all', name: 'All Tours', icon: Filter},
    {id: 'arboretum', name: 'Arboretum', icon: Trees},
    {id: 'campus', name: 'Campus Core', icon: Building},
  ];

  const filterTours = (category: string) => {
    if (category === 'all') return tours;
    return tours.filter(tour => tour.category === category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative font-sans">
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ${navBackgroundClass}`}>
        <div className="content-max-width px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Bird className={`h-8 w-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10 ${navIconColorClass}`} />
              </div>
              <span className={`text-2xl font-medium tracking-tight transition-all duration-300 ${navLogoTextColorClass}`}>
                Titan Bird Trails
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {['Tours', 'Species', 'AI Magic', 'Tools', 'Checklist', 'Contact'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === 'Checklist') {
                      window.location.href = '/#checklist';
                    }
                    else if (item === 'Tours') scrollToSection('tours');
                    else if (item === 'Tools') window.location.href = '/tools';
                    else window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'Tours' ? 'bg-white/10' : ''}`}
                >
                  <span className="relative z-10">{item}</span>
                  <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${scrollY > 50 ? "bg-gradient-to-r from-green-100 to-blue-100" : "bg-white/10 backdrop-blur-sm"}`}></div>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${scrollY > 50 ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-white/70"}`}></div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 hover:scale-110"
            >
              <div className="space-y-1.5">
                <div className={`w-6 h-0.5 transition-all duration-300 ${mobileMenuIconColorClass} ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></div>
                <div className={`w-6 h-0.5 transition-all duration-300 ${mobileMenuIconColorClass} ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 transition-all duration-300 ${mobileMenuIconColorClass} ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></div>
              </div>
            </button>
          </div>

          {isMenuOpen && (
            <div className={`md:hidden pt-3 pb-2 space-y-1 animate-fade-in-up border-t backdrop-blur-lg ${scrollY > 50 ? "border-border bg-white/90" : "border-white/20 bg-black/20"}`}>
              {['Tours', 'Species', 'AI Magic', 'Tools', 'Checklist', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === 'Checklist') {
                      window.location.href = '/#checklist';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'Tours') {scrollToSection('tours'); setIsMenuOpen(false);}
                    else if (item === 'Tools') {window.location.href = '/tools'; setIsMenuOpen(false);}
                    else {window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`; setIsMenuOpen(false);}
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium hover:bg-muted/50 transition-all duration-300 hover:translate-x-2 ${navLinkColorClass}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: "url('/PA_mountains.jpg')",
            transform: `translateY(${scrollY * 0.2}px) scale(1.05)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 content-max-width pt-28 pb-16">
          <div className="space-y-8 hero-text-reveal">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight [text-shadow:_3px_4px_8px_rgb(0_0_0_/_60%)] animate-fade-in-up">
                Guided
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Birding Tours
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Explore CSUF's diverse habitats with expert guides and discover the fascinating world of campus birds.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('tours')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Calendar className="mr-3 h-6 w-6 animate-pulse" />
                Book a Tour
              </Button>
               <Button 
                onClick={() => window.location.href = '/'}
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/30 hover:border-white/50 backdrop-blur-md shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full"
              >
                Back to Home
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="h-5 w-5 text-white/60" />
          </div>
        </div>
      </section>

      {/* Enhanced Tours Section */}
      <section id="tours" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-green-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <Bird className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Our Birding Tours
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Choose an adventure that suits your interest and schedule.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>
          
          {/* Enhanced filter buttons */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="flex bg-white/80 backdrop-blur-lg p-2 rounded-2xl shadow-xl border border-gray-200/50">
              {tourCategories.map((filterCat) => (
                <button
                  key={filterCat.id}
                  onClick={() => setActiveFilter(filterCat.id)}
                  className={`px-6 sm:px-8 py-3 rounded-xl transition-all duration-500 text-sm font-medium relative flex items-center gap-3 group ${activeFilter === filterCat.id
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80'
                    }`}
                >
                  <filterCat.icon className={`h-5 w-5 transition-all duration-300 ${activeFilter === filterCat.id ? 'text-green-400 animate-pulse' : 'text-gray-400 group-hover:text-green-500'}`} />
                  {filterCat.name}
                  {activeFilter === filterCat.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced tour cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filterTours(activeFilter).map((tour, index) => (
              <div key={tour.id} className="group cursor-pointer" onClick={() => setSelectedTourModal(tour)} style={{ animationDelay: `${index * 150}ms` }}>
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 bg-white rounded-3xl relative">
                      {/* Gradient border effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="relative bg-white rounded-3xl m-0.5">
                        <div className="relative h-64 overflow-hidden rounded-t-3xl">
                          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${tour.color} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 font-medium border-0 px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              {tour.difficulty}
                            </Badge>
                          </div>
                          {/* Floating icon */}
                          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                              <Bird className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-8 space-y-4">
                          <div>
                            <h3 className="text-2xl font-light text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                              {tour.title}
                            </h3>
                            <p className="text-gray-500 font-light text-base leading-relaxed">{tour.subtitle}</p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-500" />
                              <span className="font-medium">{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bird className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">{tour.speciesFocus.slice(0,2).join(', ')}...</span>
                            </div>
                          </div>
                          <div className="pt-4">
                            <Button variant="link" className="p-0 text-green-700 font-medium group-hover:text-green-800 transition-colors duration-300 group/btn">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                  </Card>
               </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-xl border border-blue-100">
              <h3 className="text-2xl font-light text-gray-800 mb-4">Ready to Start Your Birding Adventure?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Join our expert guides and discover the amazing birds of CSUF!</p>
              <Button 
                onClick={() => window.location.href = '/#contact'}
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500"
              >
                <Calendar className="mr-3 h-6 w-6" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full group-hover:scale-110 transition-transform duration-300">
              <Bird className="h-8 w-8 text-green-600 group-hover:animate-bounce" />
            </div>
            <span className="text-gray-600 font-light text-xl">CSUF Titan Bird Trails</span>
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-8"></div>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-3xl mx-auto">
            © {new Date().getFullYear()} California State University, Fullerton. All Rights Reserved. <br />
            Join us for unforgettable birding experiences on campus! <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>

      {/* Tour Detail Modal */}
      {selectedTourModal && (
        <Dialog open={!!selectedTourModal} onOpenChange={() => setSelectedTourModal(null)}>
          <DialogContent className="sm:max-w-2xl p-0">
             <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-lg">
              <img
                src={selectedTourModal.image}
                alt={selectedTourModal.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${selectedTourModal.color} opacity-25`}></div>
               <Button
                variant="ghost" size="icon"
                onClick={() => setSelectedTourModal(null)}
                className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
             <ScrollArea className="max-h-[60vh]">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-light text-gray-800 mb-1.5">{selectedTourModal.title}</h3>
                  <p className="text-gray-500 font-light text-lg">{selectedTourModal.subtitle}</p>
                </div>

                <p className="text-gray-600 font-light leading-relaxed text-base">{selectedTourModal.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-gray-100 py-5 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1.5">Details</h4>
                    <ul className="space-y-1 text-gray-500 font-light">
                      <li><MapPin className="inline h-3.5 w-3.5 mr-1.5 text-gray-400" /><strong>Start:</strong> {selectedTourModal.details.meetingPoint}</li>
                      <li><Clock className="inline h-3.5 w-3.5 mr-1.5 text-gray-400" /> ({selectedTourModal.duration})</li>
                      <li><Star className="inline h-3.5 w-3.5 mr-1.5 text-gray-400" /><strong>Difficulty:</strong> {selectedTourModal.difficulty}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1.5">Focus</h4>
                    <p className="text-gray-500 font-light">{selectedTourModal.details.focus}</p>
                  </div>
                </div>
                
                {selectedTourModal.details.keyFeatures && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Key Features / Stops</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTourModal.details.keyFeatures.map((feature: string) => (
                        <Badge key={feature} variant="secondary" className="font-light px-2.5 py-1">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Potential Species</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTourModal.speciesFocus.map((species: string) => (
                      <Badge key={species} className="bg-green-100 text-green-800 font-light border-0 px-2.5 py-1">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">What to Bring</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-500 font-light text-sm">
                    {selectedTourModal.details.whatToBring.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
            </div>
            </ScrollArea>
            <DialogFooter className="p-6 border-t border-gray-100">
                <Button
                  onClick={() => window.location.href = '/#contact'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-base font-light transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Book This Tour
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Tours; 