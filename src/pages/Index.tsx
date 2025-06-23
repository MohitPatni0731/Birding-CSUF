import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Clock, Bird, Camera, Filter, X, ArrowRight, CheckCircle, Circle, Star, MessageSquare, Feather, Send, Sparkles, BotMessageSquare, Loader2, Trees, Building, Droplet, School, Sun, Leaf, Landmark, Microscope, Flower, Play, Pause, StopCircle, Copy, ListChecks, Wind, CalendarDays, Mountain, Users, Compass, Brain, Mic, Check, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Custom CSS animations and styles
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
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
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
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-3000 {
    animation-delay: 3s;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .hero-text-reveal {
    opacity: 0;
    animation: fade-in-up 1s ease-out 0.3s forwards;
  }
  
  .hero-text-reveal-item {
    opacity: 0;
    animation: fade-in-up 0.8s ease-out forwards;
  }
  
  .hero-text-reveal-delay-1 {
    animation-delay: 0.6s;
  }
  
  .hero-text-reveal-delay-3 {
    animation-delay: 1.2s;
  }
  
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
  
  .content-max-width {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  /* Glassmorphism effects */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-dark {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Hover effects */
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #10b981);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #059669);
  }
`;

// !! IMPORTANT SECURITY WARNING !!
// Do NOT use API keys directly in frontend code for production applications.
// This is for demonstration purposes ONLY.
// In a real application, this key should be kept on a secure backend server,
// and your frontend should make requests to your backend, which then calls the Gemini API.
const GEMINI_API_KEY = "AIzaSyAhgRnn_yJhbuiaQcoZMppaY8LnpItmdgI"; // User-provided API key

interface Tour {
  id: number;
  title: string;
  subtitle: string;
  time: string; // General time like "8:00 AM"
  duration: string;
  difficulty: string;
  speciesFocus: string[];
  image: string;
  category: string; // 'arboretum', 'campus'
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
  // New fields for interactive tour finder & guided experience
  seasonality: string[]; // e.g., ["Spring", "Summer", "Fall", "Winter", "All Year"]
  timeOfDayPreference: string[]; // e.g., ["Morning", "Afternoon", "Evening"]
  environmentType: string; // e.g., "Nature", "Urban", "Semi-Urban"
  route?: Array<{ name: string; instructions: string; birdsToSpot?: string[] }>; // Simplified route
  frequentBirds: string[]; // Subset of birdSpecies for this tour's checklist
}

interface BirdSpecies {
    name: string;
    scientificName: string;
    image: string;
    description: string;
    funFact: string;
    habitat: string;
}


const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTourModal, setSelectedTourModal] = useState<Tour | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // --- Interactive Tour Finder State ---
  const [showTourFinder, setShowTourFinder] = useState(false);
  const [finderStep, setFinderStep] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [recommendedTours, setRecommendedTours] = useState<Tour[]>([]);

  // --- Active Tour State ---
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [showActiveTourView, setShowActiveTourView] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(0);
  const [activeTourChecklist, setActiveTourChecklist] = useState<Set<string>>(new Set());

  // --- Post-Tour Summary State ---
  const [fieldNotes, setFieldNotes] = useState('');
  const [showFieldNotesModal, setShowFieldNotesModal] = useState(false);

  // --- General Checklist State ---
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [globalCheckedBirds, setGlobalCheckedBirds] = useState(new Set());

  // --- AI Feature States ---
  const [selectedBirdForChat, setSelectedBirdForChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [isAiRespondingChat, setIsAiRespondingChat] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [selectedBirdForPoem, setSelectedBirdForPoem] = useState<string | null>(null);
  const [generatedPoem, setGeneratedPoem] = useState("");
  const [isAiGeneratingPoem, setIsAiGeneratingPoem] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedBirdForTip, setSelectedBirdForTip] = useState<string | null>(null);
  const [generatedTip, setGeneratedTip] = useState("");
  const [isAiGeneratingTip, setIsAiGeneratingTip] = useState(false);


  const tours: Tour[] = [
    {
      id: 1,
      title: "Arboretum's Natural Treasures",
      subtitle: "A Deep Dive into CSUF's Premier Birding Hotspot",
      time: "8:00 AM - 11:00 AM",
      duration: "60 min",
      difficulty: "Moderate",
      speciesFocus: ["Hawks", "Owls", "Woodpeckers", "Waterfowl", "Native Songbirds"],
      image: "/ARB_lake.jpg", // Updated image
      category: "arboretum", // Maps to "Nature"
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
      image: "/LIB_day.jpg", // Updated image
      category: "campus", // Maps to "Urban" or "Semi-Urban"
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
      image: "/ARB_lake.jpg", // Updated image
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
      image: "/VA_icecream.jpg", // Updated image
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

  const birdSpecies: BirdSpecies[] = [
    { name: "Red-tailed Hawk", scientificName: "Buteo jamaicensis", image: "https://images.unsplash.com/photo-1530689300999-e09e32919d70?w=400", description: "Large raptor with a broad, reddish tail, often seen soaring or perched high.", funFact: "Red-tailed Hawks have incredible eyesight, about 8 times sharper than humans!", habitat: "Open country, woodlands, often seen soaring over campus or perched on tall structures." },
    { name: "Anna's Hummingbird", scientificName: "Calypte anna", image: "https://images.unsplash.com/photo-1595460004628-24f63786700e?w=400", description: "Medium-sized hummingbird with iridescent rose-pink feathers on the male's head and throat.", funFact: "Anna's Hummingbirds are the only North American hummingbird species that regularly overwinters in northern latitudes.", habitat: "Gardens, parks, and anywhere with nectar-producing flowers." },
    { name: "American Robin", scientificName: "Turdus migratorius", image: "https://images.unsplash.com/photo-1552533700-8889fcc9829b?w=400", description: "Familiar songbird with a gray back, rusty orange breast, and a cheerful song.", funFact: "While often seen on lawns tugging at earthworms, American Robins also eat a lot of fruit, especially in winter.", habitat: "Lawns, open woodlands, gardens." },
    { name: "Cooper's Hawk", scientificName: "Accipiter cooperii", image: "https://images.unsplash.com/photo-1609852649986-c5a3c1aa62f2?w=400", description: "Medium-sized hawk with a long, banded tail and relatively short, rounded wings.", funFact: "Cooper's Hawks primarily hunt other birds, ambushing them with swift, agile flight.", habitat: "Wooded areas, suburban parks." },
    { name: "Mourning Dove", scientificName: "Zenaida macroura", image: "https://images.unsplash.com/photo-1599142315884-f6f1308030e3?w=400", description: "Slender, grayish-brown dove with black spots on its wings and a long, pointed tail.", funFact: "Mourning Doves can drink brackish water, which helps them survive in arid environments.", habitat: "Open country, parks, suburban areas; very common throughout campus." },
    { name: "California Scrub-Jay", scientificName: "Aphelocoma californica", image: "https://images.unsplash.com/photo-1604828033713-94a000a7d401?w=400", description: "Blue bird with a gray back/belly and a whitish throat, known for its intelligence.", funFact: "California Scrub-Jays are known to cache thousands of acorns each fall!", habitat: "Oak woodlands, chaparral, suburban gardens; common in the Arboretum." },
    { name: "California Towhee", scientificName: "Melozone crissalis", image: "https://images.unsplash.com/photo-1628052701689-a386d6434595?w=400", description: "Plain brown, sparrow-like bird with a rusty patch under its tail.", funFact: "Masters of the 'double-scratch' feeding technique to uncover seeds and insects.", habitat: "Chaparral, dense shrubs, undergrowth in gardens." },
    { name: "House Finch", scientificName: "Haemorhous mexicanus", image: "https://images.unsplash.com/photo-1506220926022-cc5c4892f411?w=400", description: "Small finch; males have rosy red on the head and breast.", funFact: "The red coloration of male House Finches comes from pigments in their food.", habitat: "Ubiquitous in urban and suburban areas, parks, and open woods." },
    { name: "Lesser Goldfinch", scientificName: "Spinus psaltria", image: "https://images.unsplash.com/photo-1597739254919-a3c7dc0c400a?w=400", description: "Tiny finch with a bright yellow underside; males have a black cap.", funFact: "Lesser Goldfinches often feed acrobatically, hanging upside down to reach seeds.", habitat: "Open woodlands, weedy fields, gardens with seed-bearing plants." },
    { name: "Black Phoebe", scientificName: "Sayornis nigricans", image: "https://images.unsplash.com/photo-1601275205711-a2901a576270?w=400", description: "Small, dark flycatcher with a contrasting white belly; often wags its tail.", funFact: "Frequently builds mud nests under the eaves of buildings or bridges.", habitat: "Near water sources, open areas with low perches for catching insects." },
    { name: "Yellow-rumped Warbler", scientificName: "Setophaga coronata", image: "https://images.unsplash.com/photo-1518490390990-b1911a97d1d7?w=400", description: "Common winter warbler, gray or brownish with distinctive yellow patches on its rump.", funFact: "Nicknamed 'butter-butt' for their yellow rump patch.", habitat: "Abundant in winter in various habitats with trees and shrubs." },
    { name: "Song Sparrow", scientificName: "Melospiza melodia", image: "https://images.unsplash.com/photo-1517984410560-1a739b0eba26?w=400", description: "Streaked brown sparrow with a central dark spot on its breast; sings a varied, musical song.", funFact: "Song Sparrows have many regional variations in their songs, almost like local dialects.", habitat: "Dense shrubs, often near water or damp areas; found in the Arboretum and wetter landscaped parts of campus." },
    { name: "Bushtit", scientificName: "Psaltriparus minimus", image: "https://images.unsplash.com/photo-1549063296-488f767e9911?w=400", description: "Tiny, gray-brown bird with a long tail, almost always seen in active, chattering flocks.", funFact: "Bushtits build impressive hanging sock-like nests woven from spiderwebs, moss, and lichens.", habitat: "Trees and shrubs throughout campus and the Arboretum; listen for their constant high-pitched contact calls." },
    { name: "Wrentit", scientificName: "Chamaea fasciata", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Wrentit.jpg/800px-Wrentit.jpg", description: "Small, plain grayish-brown bird with a long tail often cocked upwards; more often heard than seen.", funFact: "The Wrentit's song is a series of sharp notes that accelerate into a trill, often described as a 'bouncing ball'.", habitat: "Dense chaparral and coastal scrub; found in the Arboretum's native plant areas." }
  ];

  // --- Timer Logic ---
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // --- Interactive Tour Finder Logic ---
  const handleNextFinderStep = () => {
    if (finderStep === 1 && !selectedSeason) { alert("Please select a season."); return; }
    if (finderStep === 2 && !selectedTime) { alert("Please select a time."); return; }
    if (finderStep === 3 && !selectedEnvironment) { alert("Please select an environment."); return; }
    
    if (finderStep < 3) {
      setFinderStep(finderStep + 1);
    } else {
      // Filter tours
      const filtered = tours.filter(tour =>
        tour.seasonality.includes(selectedSeason) &&
        tour.timeOfDayPreference.includes(selectedTime) &&
        tour.environmentType.toLowerCase().includes(selectedEnvironment.toLowerCase())
      );
      setRecommendedTours(filtered);
      setShowTourFinder(false); 
      console.log("Recommended Tours:", filtered);
      if(filtered.length === 0) {
        alert("No tours match your criteria. Try broadening your search or explore all tours!");
      }
    }
  };
  
  const resetTourFinder = () => {
    setFinderStep(1);
    setSelectedSeason('');
    setSelectedTime('');
    setSelectedEnvironment('');
    setRecommendedTours([]);
    setShowTourFinder(true);
  }

  // --- Active Tour Logic ---
  const startTour = (tour: Tour) => {
    setActiveTour(tour);
    setCurrentTourStepIndex(0);
    setTimer(0);
    setIsTimerRunning(true);
    setActiveTourChecklist(new Set()); 
    setShowActiveTourView(true);
    setSelectedTourModal(null); 
  };

  const handleActiveTourChecklistToggle = (birdName: string) => {
    setActiveTourChecklist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(birdName)) {
        newSet.delete(birdName);
      } else {
        newSet.add(birdName);
      }
      return newSet;
    });
  };
  
  const generateFieldNotes = () => {
    if (!activeTour) return;
  
    const tourTitle = activeTour.title;
    const placesVisited = activeTour.route ? activeTour.route.map(step => step.name).join(', ') : 'the designated tour areas';
    const birdsSeen = activeTourChecklist.size > 0 ? Array.from(activeTourChecklist).join(', ') : 'no specific birds marked';
  
    const summary = `Summary: You have taken the ${tourTitle} tour. You visited ${placesVisited}. According to your birding checklist, you saw ${birdsSeen}.`;
  
    const notes = `
CSUF Birding Field Notes
-------------------------
Date: ${new Date().toLocaleDateString()}
Tour: ${tourTitle}
Duration of Tour: ${formatTime(timer)}

${summary}

Weather Conditions: (Describe weather)
Other Wildlife Seen: (e.g., squirrels, butterflies)
Personal Observations:
  (Add your personal notes here)
-------------------------
    `;
    setFieldNotes(notes.trim());
    setShowFieldNotesModal(true);
  };

  const endTour = () => {
    setIsTimerRunning(false);
    generateFieldNotes();
  };

  const closeActiveTour = () => {
    setActiveTour(null);
    setShowActiveTourView(false);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Field notes copied to clipboard!"))
      .catch(err => console.error("Failed to copy text: ", err));
  };


  // --- Global Checklist Logic ---
  const toggleGlobalBirdCheck = (birdName: string) => {
    setGlobalCheckedBirds(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(birdName)) {
        newChecked.delete(birdName);
      } else {
        newChecked.add(birdName);
      }
      return newChecked;
    });
  };
  
  // --- AI Call and other existing useEffects and functions ---
  const callGeminiAPI = async (promptText: string) => {
    setAiError(null);
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        setAiError(errorData.error?.message || `API request failed with status ${response.status}`);
        return null;
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", data);
        setAiError("Could not extract text from API response.");
        return null;
      }
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      setAiError(error.message || "An unknown error occurred while contacting the AI.");
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!currentUserMessage.trim() || !selectedBirdForChat) return;

    const userMsg = { sender: 'user', text: currentUserMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setCurrentUserMessage("");
    setIsAiRespondingChat(true);

    const bird = birdSpecies.find(b => b.name === selectedBirdForChat);
    if (!bird) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: "Hmm, I can't seem to find that bird. Maybe try another one?" }]);
        setIsAiRespondingChat(false);
        return;
    }

    const prompt = `You are a ${bird.name} (${bird.scientificName}), a bird known for being a ${bird.description}. Your fun fact is: "${bird.funFact}". You are often found in ${bird.habitat}. A user is talking to you. Respond to their message: "${userMsg.text}". Stay in character as the bird. Be friendly, a little witty, and incorporate facts about your species (like your diet, habitat, sounds, or behavior from your description, fun fact, or habitat info) naturally into the conversation. Keep your responses relatively short, like a chat. If the user asks something you wouldn't know (like complex human affairs or things outside a bird's typical knowledge), politely say you're just a bird and don't know much about that, perhaps making a bird-related joke.`;

    const aiResponseText = await callGeminiAPI(prompt);

    if (aiResponseText) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    } else {
      setChatMessages(prev => [...prev, { sender: 'ai', text: "Chirp... I seem to be having trouble thinking right now. My apologies!" }]);
    }
    setIsAiRespondingChat(false);
  };

  const handleGeneratePoem = async () => {
    if (!selectedBirdForPoem) return;
    setIsAiGeneratingPoem(true);
    setGeneratedPoem("");

    const bird = birdSpecies.find(b => b.name === selectedBirdForPoem);
    if (!bird) {
        setGeneratedPoem("Could not find that bird to write a poem about. Please select one!");
        setIsAiGeneratingPoem(false);
        return;
    }
    const prompt = `Create a short, evocative, and delightful 4 to 8 line poem about the ${bird.name} (${bird.scientificName}). It is known as a ${bird.description} and a fun fact about it is: "${bird.funFact}". It lives in ${bird.habitat}. Capture its spirit and beauty in the poem.`;

    const poemText = await callGeminiAPI(prompt);

    if (poemText) {
      setGeneratedPoem(poemText);
    } else {
      setGeneratedPoem("My muse seems to have flown off... Please try again! (Perhaps there was an issue with the AI?)");
    }
    setIsAiGeneratingPoem(false);
  };

  const handleGenerateTip = async () => {
    if (!selectedBirdForTip) return;
    setIsAiGeneratingTip(true);
    setGeneratedTip("");

    const bird = birdSpecies.find(b => b.name === selectedBirdForTip);
    if (!bird) {
        setGeneratedTip("Could not find that bird to generate a tip. Please select one!");
        setIsAiGeneratingTip(false);
        return;
    }
    const prompt = `Provide a concise and actionable birding tip (1-2 sentences) specifically for spotting or appreciating the ${bird.name}. Consider its habitat (${bird.habitat}), common behaviors (e.g., from description: "${bird.description}"), or unique characteristics (e.g., fun fact: "${bird.funFact}"). Make the tip practical for an amateur birdwatcher on a university campus or in a local arboretum.`;

    const tipText = await callGeminiAPI(prompt);

    if (tipText) {
      setGeneratedTip(tipText);
    } else {
      setGeneratedTip("Hmm, my wisdom feathers are ruffled. Couldn't generate a tip right now. (AI might be busy!)");
    }
    setIsAiGeneratingTip(false);
  };
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);


  const filterTours = (category: string) => {
    if (category === 'all' && recommendedTours.length === 0) return tours;
    if (recommendedTours.length > 0 && category === 'all') return recommendedTours; // Show recommendations if available and 'all' is clicked
    if (recommendedTours.length > 0 && category !== 'all') return recommendedTours.filter(tour => tour.category === category);
    return tours.filter(tour => tour.category === category);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          section.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const tourCategories = [
    {id: 'all', name: 'All Tours', icon: Filter},
    {id: 'arboretum', name: 'Arboretum', icon: Trees},
    {id: 'campus', name: 'Campus Core', icon: Building},
  ];

  const seasonOptions = ["Spring", "Summer", "Fall", "Winter", "All Year"];
  const timeOptions = ["Morning", "Afternoon", "Evening"];
  const environmentOptions = ["Nature", "Semi-Urban", "Urban"];

  const navBackgroundClass = scrollY > 50 // Threshold for navbar background change
    ? "bg-white/80 backdrop-blur-xl shadow-md border-gray-200/80"
    : "bg-transparent backdrop-blur-none shadow-none border-transparent";

  const navLogoTextColorClass = scrollY > 50 ? "text-gray-800" : "text-white [text-shadow:_1px_1px_3px_rgb(0_0_0_/_40%)]";
  const navLinkColorClass = scrollY > 50
    ? "text-foreground/70 hover:text-primary"
    : "text-gray-100 hover:text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_30%)]";
  const navIconColorClass = scrollY > 50 ? "text-primary" : "text-white";
  const mobileMenuIconColorClass = scrollY > 50 ? "bg-foreground/70" : "bg-white";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative font-sans">
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Enhanced Navigation with glassmorphism */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ${navBackgroundClass}`}>
        <div className="content-max-width px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Bird className={`h-8 w-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10 ${navIconColorClass}`} />
              </div>
              <span className={`text-2xl font-medium tracking-tight transition-all duration-300 ${navLogoTextColorClass}`}>
                Titan Bird Trails
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {['Tours', 'AI Magic', 'Tools', 'Checklist', 'About Us', 'Contact'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === 'Checklist') window.location.href = '/checklist';
                    else if (item === 'Tools') window.location.href = '/tools';
                    else if (item === 'About Us') window.location.href = '/about-us';
                    else scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105`}
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
              {['Tours', 'AI Magic', 'Tools', 'Checklist', 'About Us', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                     if (item === 'Checklist') {window.location.href = '/checklist'; setIsMenuOpen(false);}
                    else if (item === 'Tools') {window.location.href = '/tools'; setIsMenuOpen(false);}
                    else if (item === 'About Us') {window.location.href = '/about-us'; setIsMenuOpen(false);}
                    else {scrollToSection(item.toLowerCase().replace(/\s+/g, '-')); setIsMenuOpen(false);}
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
      
      {/* Enhanced Hero Section with animated background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: "url('/PA_mountains.jpg')",
            transform: `translateY(${scrollY * 0.2}px) scale(1.05)`
          }}
        ></div>
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight hero-text-reveal-item [text-shadow:_3px_4px_8px_rgb(0_0_0_/_60%)] animate-fade-in-up">
                Explore CSUF's
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold hero-text-reveal-item hero-text-reveal-delay-1 [text-shadow:none] animate-gradient-x">
                  Avian Wonders
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Discover the hidden world of birds right on your campus through guided tours, AI interactions, and immersive experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 hero-text-reveal-item hero-text-reveal-delay-3">
              <Button 
                onClick={() => scrollToSection('ai-magic')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                Discover AI Magic
              </Button>
               <Button 
                onClick={() => scrollToSection('tours')}
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/30 hover:border-white/50 backdrop-blur-md shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full"
              >
                Browse All Tours
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

      {showTourFinder && (
        <Dialog open={showTourFinder} onOpenChange={(isOpen) => { if(!isOpen) { setShowTourFinder(false); resetTourFinder(); }}}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-light text-gray-800">Find Your Ideal Birding Tour</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">Answer a few questions to help us suggest the best tours for you.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              {finderStep === 1 && (
                <div className="space-y-2">
                  <label htmlFor="season" className="text-sm font-medium text-gray-700">What season is it currently (or when do you plan to visit)?</label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger id="season"><SelectValue placeholder="Select a season..." /></SelectTrigger>
                    <SelectContent>
                      {seasonOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {finderStep === 2 && (
                <div className="space-y-2">
                  <label htmlFor="timeOfDay" className="text-sm font-medium text-gray-700">What time of day do you prefer for birding?</label>
                   <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="timeOfDay"><SelectValue placeholder="Select time of day..." /></SelectTrigger>
                    <SelectContent>
                       {timeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {finderStep === 3 && (
                 <div className="space-y-2">
                  <label htmlFor="environment" className="text-sm font-medium text-gray-700">What kind of environment are you interested in?</label>
                   <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger id="environment"><SelectValue placeholder="Select environment type..." /></SelectTrigger>
                    <SelectContent>
                      {environmentOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-between">
               <Button variant="outline" onClick={() => {setShowTourFinder(false); resetTourFinder();}}>Cancel</Button>
              <Button onClick={handleNextFinderStep} className="bg-green-600 hover:bg-green-700">
                {finderStep < 3 ? "Next" : "Find Tours"} <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {recommendedTours.length > 0 && !showTourFinder && (
        <section id="recommended-tours" className="py-20 bg-sky-50/50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extralight text-gray-800 mb-3">Our Recommendations For You</h2>
              <p className="text-gray-600">Based on your preferences for {selectedSeason}, {selectedTime} birding in a {selectedEnvironment.toLowerCase()} setting:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedTours.map((tour, index) => (
                 <div key={tour.id} className="group cursor-pointer" onClick={() => setSelectedTourModal(tour)} style={{ animationDelay: `${index * 100}ms` }}>
                    <Card className="overflow-hidden border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl">
                        <div className="relative h-60 overflow-hidden"> <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> <div className={`absolute inset-0 bg-gradient-to-t ${tour.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div> <div className="absolute top-4 right-4"> <Badge className="bg-white/80 backdrop-blur-sm text-gray-700 font-medium border-0 px-3 py-1.5 rounded-full shadow">{tour.difficulty}</Badge> </div> </div>
                        <CardContent className="p-6 space-y-3"> <div> <h3 className="text-2xl font-light text-gray-800 mb-1 group-hover:text-green-700 transition-colors duration-300">{tour.title}</h3> <p className="text-gray-500 font-light text-base">{tour.subtitle}</p> </div> <div className="flex items-center justify-between text-xs text-gray-500 pt-2"> <div className="flex items-center gap-1.5"> <Clock className="h-3.5 w-3.5" /> {tour.duration} </div> <div className="flex items-center gap-1.5"> <Bird className="h-3.5 w-3.5" /> {tour.speciesFocus.slice(0,2).join(', ')}... </div> </div> <div className="pt-3"> <Button variant="link" className="p-0 text-green-700 font-light group-hover:underline"> View Details <ArrowRight className="ml-1.5 h-4 w-4" /> </Button> </div> </CardContent>
                    </Card>
                 </div>
              ))}
            </div>
            <div className="text-center mt-12">
                <Button variant="outline" onClick={resetTourFinder}>Search Again</Button>
                <Button className="ml-4" onClick={() => {setRecommendedTours([]); scrollToSection('tours');}}>View All Tours</Button>
            </div>
          </div>
        </section>
      )}

      {(!showTourFinder && recommendedTours.length === 0) && (
        <section id="tours" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30" data-animate>
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
          </div>
        </section>
      )}

      {/* Enhanced Species Section */}
      <section id="species" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50/70 via-green-50/50 to-yellow-50/70 relative overflow-hidden" data-animate>
        {/* Animated background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-sky-300/30 to-green-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-full mb-6 shadow-lg">
              <Feather className="h-5 w-5 text-sky-600 animate-bounce" />
              <span className="text-sm font-medium text-gray-700">Featured Species</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extralight text-gray-800 mb-4 tracking-tighter bg-gradient-to-r from-sky-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
              Meet Our Birds
            </h2>
             <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Get to know some of the fascinating birds you might encounter on your journey.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 via-green-500 to-yellow-500 mx-auto rounded-full mt-4 animate-gradient-x"></div>
          </div>
          
          {/* Enhanced bird cards with better layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {birdSpecies.slice(0, 8).map((bird, index) => ( 
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-green-400 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-white rounded-xl m-0.5">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={bird.image}
                      alt={bird.name}
                      className="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Floating sparkle effect */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                      <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 group-hover:text-sky-700 transition-colors duration-300 line-clamp-1">
                      {bird.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light italic mb-2 line-clamp-1">{bird.scientificName}</p>
                    <p className="text-xs text-gray-600 font-light mb-3 h-10 overflow-hidden leading-relaxed line-clamp-2">
                      {bird.description}
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 text-xs text-sky-600 hover:text-sky-700 font-medium group/btn transition-all duration-300 h-auto" 
                      onClick={() => { 
                        setSelectedBirdForChat(bird.name); 
                        setSelectedBirdForPoem(bird.name); 
                        setSelectedBirdForTip(bird.name); 
                        scrollToSection('ai-magic'); 
                      }}
                    >
                      <span className="relative text-xs">
                        AI Magic
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-purple-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"></div>
                      </span>
                      <Sparkles className="ml-1 h-3 w-3 transform group-hover/btn:rotate-12 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
           
           {/* Enhanced CTA button */}
           <div className="text-center">
             <Button 
               onClick={() => setShowChecklistModal(true)} 
               variant="outline" 
               className="border-2 border-green-300 hover:border-green-500 bg-white/80 hover:bg-green-50 text-gray-700 hover:text-green-700 px-8 py-4 rounded-full text-base font-medium transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm group"
             >
                 <Bird className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                 View Full Bird Checklist
                 <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced AI Magic Section */}
      <section id="ai-magic" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/70 via-pink-50/70 to-rose-50/70 relative overflow-hidden" data-animate>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-rose-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse animation-delay-1500"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-4 p-4 bg-white/70 backdrop-blur-lg rounded-full mb-8 shadow-xl border border-purple-200/50">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Sparkles className="h-6 w-6 text-white animate-pulse" />
              </div>
              <span className="text-sm font-medium text-gray-700">AI-Powered Features</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter">
              AI Bird <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text animate-gradient-x">Magic</span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Interact with our feathered friends like never before through the power of artificial intelligence!
            </p>
            <div className="w-40 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
            {aiError && (
              <div className="mt-8 p-6 bg-red-50/80 backdrop-blur-sm border-2 border-red-200 text-red-700 rounded-2xl shadow-lg">
                <p className="font-medium text-sm">AI Assistant Error:</p>
                <p className="text-xs mt-1">{aiError} Please check your API key or network connection and try again.</p>
              </div>
            )}
          </div>

          {/* Unified AI Magic Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 mb-16">
            {/* Chat with a Bird */}
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-lg p-4 group hover:shadow-3xl transition-all duration-700 rounded-xl relative transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-white rounded-xl m-0.5 p-3">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-tr from-sky-500 to-blue-600 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-light text-gray-800 group-hover:text-sky-700 transition-colors duration-300">Chat with a Bird!</CardTitle>
                      <CardDescription className="text-gray-500 font-light text-xs">Select a bird and ask it anything you'd like to know.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="mb-5">
                    <Select onValueChange={(value) => { setSelectedBirdForChat(value); setChatMessages([]); }} value={selectedBirdForChat || ""}>
                      <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-sky-300 transition-colors duration-300">
                        <SelectValue placeholder="Select a bird to chat with..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {birdSpecies.map(bird => (
                          <SelectItem key={bird.name} value={bird.name} className="rounded-lg">{bird.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedBirdForChat && (
                    <>
                      <ScrollArea className="h-64 w-full rounded-xl border-2 border-gray-200 p-4 mb-4 bg-gradient-to-br from-gray-50 to-sky-50/30" ref={chatContainerRef}>
                        {chatMessages.length === 0 && (
                          <div className="text-center py-8">
                            <Bird className="h-12 w-12 text-sky-400 mx-auto mb-3 animate-bounce" />
                            <p className="text-sm text-gray-500">Say hi to the {selectedBirdForChat}!</p>
                          </div>
                        )}
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] py-3 px-4 rounded-2xl text-sm shadow-md ${msg.sender === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-br-md' 
                              : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'}`}>
                              {msg.sender === 'ai' && <BotMessageSquare className="inline-block h-4 w-4 mr-2 mb-0.5 text-sky-600" />} 
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        {isAiRespondingChat && (
                          <div className="flex justify-start mb-3">
                            <div className="max-w-[80%] py-3 px-4 rounded-2xl bg-white text-gray-800 rounded-bl-md border border-gray-200 flex items-center text-sm shadow-md">
                              <Loader2 className="h-4 w-4 animate-spin mr-2 text-sky-600" /> 
                              <span className="animate-pulse">Typing...</span>
                            </div>
                          </div>
                        )}
                      </ScrollArea>
                      <div className="flex gap-3">
                        <Textarea
                          placeholder={`Message the ${selectedBirdForChat}...`}
                          value={currentUserMessage}
                          onChange={(e) => setCurrentUserMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                          className="flex-1 resize-none text-sm p-3 rounded-xl border-2 border-gray-200 hover:border-sky-300 transition-colors duration-300"
                          rows={1}
                        />
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={isAiRespondingChat || !currentUserMessage.trim()} 
                          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 h-auto px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </div>
            </Card>

            {/* AI Bird Poems */}
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-lg p-4 group hover:shadow-3xl transition-all duration-700 rounded-xl relative transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative bg-white rounded-xl m-0.5 p-3">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-tr from-pink-500 to-rose-600 rounded shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <Feather className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-light text-gray-800 group-hover:text-rose-700 transition-colors duration-300">AI Bird Poems</CardTitle>
                      <CardDescription className="text-gray-500 font-light text-xs">Let AI craft a unique poem for your chosen bird.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Select onValueChange={setSelectedBirdForPoem} value={selectedBirdForPoem || ""}>
                      <SelectTrigger className="w-full sm:flex-1 h-12 rounded-xl border-2 border-gray-200 hover:border-rose-300 transition-colors duration-300">
                        <SelectValue placeholder="Select a bird for a poem..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {birdSpecies.map(bird => (
                          <SelectItem key={bird.name} value={bird.name} className="rounded-lg">{bird.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleGeneratePoem} 
                      disabled={isAiGeneratingPoem || !selectedBirdForPoem} 
                      className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 h-12 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {isAiGeneratingPoem ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Sparkles className="mr-2 h-5 w-5" />}
                      Generate Poem
                    </Button>
                  </div>
                  {isAiGeneratingPoem && (
                    <div className="text-center p-10 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-100">
                      <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto" />
                      <p className="text-gray-500 mt-3 text-sm animate-pulse">Crafting your poetic verse...</p>
                    </div>
                  )}
                  {generatedPoem && !isAiGeneratingPoem && (
                    <ScrollArea className="h-48">
                      <div className="mt-3 p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl whitespace-pre-line font-serif text-sm text-gray-700 leading-relaxed shadow-inner">
                        {generatedPoem}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </div>
            </Card>

            {/* Bird Song ID (Soon!) */}
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-lg p-4 group hover:shadow-3xl transition-all duration-700 rounded-xl relative transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-white rounded-xl m-0.5 p-3">
                  <CardHeader className="p-0 mb-3">
                      <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gradient-to-tr from-teal-500 to-cyan-500 rounded shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Mic className="h-5 w-5 text-white" />
                          </div>
                          <div>
                              <CardTitle className="text-lg font-light text-gray-800 group-hover:text-teal-700 transition-colors duration-300">Bird Song ID (Soon!)</CardTitle>
                              <CardDescription className="text-gray-500 font-light text-xs">Upload a recording to identify a bird by its song.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="mb-5">
                          <div className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 flex items-center px-4 text-gray-400">
                              <Mic className="h-4 w-4 mr-2" />
                              <span className="text-sm">Audio file upload (coming soon)</span>
                          </div>
                      </div>
                      
                      <div className="h-64 w-full rounded-xl border-2 border-dashed border-gray-300 p-4 mb-4 bg-gradient-to-br from-gray-50 to-teal-50/30 group-hover:border-teal-300 transition-colors duration-300">
                          <div className="flex flex-col items-center justify-center h-full text-center">
                              <div className="p-4 bg-white rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                  <UploadCloud className="h-10 w-10 text-gray-400 group-hover:text-teal-500 transition-colors duration-300"/>
                              </div>
                              <p className="text-sm text-gray-600 font-medium mb-2">Recording upload feature coming soon</p>
                              <p className="text-xs text-gray-400 mb-4">Drag & drop audio files or click to browse</p>
                              <div className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
                                  <span className="text-xs text-teal-700 font-medium">Future Enhancement</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex gap-3">
                          <Button 
                              disabled 
                              className="flex-1 bg-gray-300 text-gray-500 h-12 rounded-xl cursor-not-allowed"
                          >
                              <UploadCloud className="mr-2 h-5 w-5" />
                              Upload Audio
                          </Button>
                          <Button 
                              disabled 
                              className="bg-gradient-to-r from-teal-300 to-cyan-300 text-gray-500 h-12 px-6 rounded-xl cursor-not-allowed"
                          >
                              <Sparkles className="h-5 w-5" />
                          </Button>
                      </div>
                  </CardContent>
                </div>
            </Card>

            {/* Personalized Birding Tip */}
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-lg p-4 group hover:shadow-3xl transition-all duration-700 rounded-xl relative transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative bg-white rounded-xl m-0.5 p-3">
                  <CardHeader className="p-0 mb-3">
                      <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gradient-to-tr from-amber-500 to-orange-500 rounded shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Brain className="h-5 w-5 text-white" />
                          </div>
                          <div>
                              <CardTitle className="text-lg font-light text-gray-800 group-hover:text-orange-700 transition-colors duration-300">Personalized Birding Tip</CardTitle>
                              <CardDescription className="text-gray-500 font-light text-xs">Get an AI-generated tip for a specific bird.</CardDescription>
                          </div>
                      </div>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="mb-5">
                          <Select onValueChange={setSelectedBirdForTip} value={selectedBirdForTip || ""}>
                              <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                  <SelectValue placeholder="Select a bird for a tip..." />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                  {birdSpecies.map(bird => (
                                      <SelectItem key={bird.name} value={bird.name} className="rounded-lg">{bird.name}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                      </div>

                      <div className="h-64 w-full rounded-xl border-2 border-gray-200 p-4 mb-4 bg-gradient-to-br from-gray-50 to-orange-50/30">
                          {!selectedBirdForTip && (
                              <div className="flex flex-col items-center justify-center h-full text-center">
                                  <Brain className="h-12 w-12 text-orange-400 mx-auto mb-3 animate-pulse" />
                                  <p className="text-sm text-gray-500">Select a bird to get personalized tips!</p>
                              </div>
                          )}
                          {isAiGeneratingTip && (
                              <div className="flex flex-col items-center justify-center h-full text-center">
                                  <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
                                  <p className="text-gray-500 mt-3 text-sm animate-pulse">Brewing a wise tip...</p>
                              </div>
                          )}
                          {generatedTip && !isAiGeneratingTip && (
                              <ScrollArea className="h-full">
                                  <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg shadow-inner h-full">
                                      <p className="text-sm text-gray-700 leading-relaxed">{generatedTip}</p>
                                  </div>
                              </ScrollArea>
                          )}
                      </div>
                      
                      <div className="flex gap-3">
                          <Button 
                              onClick={handleGenerateTip} 
                              disabled={isAiGeneratingTip || !selectedBirdForTip} 
                              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          >
                              {isAiGeneratingTip ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Sparkles className="mr-2 h-5 w-5" />}
                              Generate Tip
                          </Button>
                      </div>
                  </CardContent>
                </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden" data-animate>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
         <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 shadow-xl">
            <Bird className="h-6 w-6 text-green-400 animate-bounce" />
            <span className="text-sm font-medium text-gray-300">Get Started</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-extralight mb-6 tracking-tight bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent">
            Get Involved
          </h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
            Want to get involved with birding on campus and share your self-guided tour experience, or offer feedback?
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-16 rounded-full"></div>
          
          <div className="space-y-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 hover:text-green-300 transition-colors duration-300 group mb-4">
                <Mail className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-medium text-white">Contact:</span>
              </div>
              <a 
                href="mailto:mohitpatni@csu.fullerton.edu" 
                className="text-2xl text-green-300 hover:text-green-200 font-light hover:underline transition-all duration-300 block text-center"
              >
                mohitpatni@csu.fullerton.edu
              </a>
              <p className="text-sm mt-4 text-gray-300 text-center">
                Share your birding experiences, provide feedback, or get involved with campus birding initiatives
              </p>
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
            Landscape and bird information based on public CSUF resources and general ornithological knowledge. <br />
            <span className="text-red-500 font-medium">GEMINI_API_KEY is for demonstration purposes only. Not for production.</span>
          </p>
        </div>
      </footer>

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
                  onClick={() => startTour(selectedTourModal)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-base font-light transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" /> Start Guided Tour
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

        {showActiveTourView && activeTour && (
            <Dialog open={showActiveTourView} onOpenChange={() => {/* Don't close on overlay click for now, use explicit close */}}>
            <DialogContent className="sm:max-w-2xl p-0 flex flex-col h-[90vh] sm:h-[85vh]">
                <DialogHeader className="p-6 border-b">
                <DialogTitle className="text-2xl font-light text-gray-800">{activeTour.title} - In Progress</DialogTitle>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-lg font-semibold text-green-600">{formatTime(timer)}</p>
                    <div className="flex gap-2">
                    {!isTimerRunning ? (
                        <Button onClick={() => setIsTimerRunning(true)} size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                            <Play className="mr-1.5 h-4 w-4"/> Resume
                        </Button>
                    ) : (
                        <Button onClick={() => setIsTimerRunning(false)} size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                            <Pause className="mr-1.5 h-4 w-4"/> Pause
                        </Button>
                    )}
                    <Button onClick={endTour} size="sm" variant="destructive">
                        <StopCircle className="mr-1.5 h-4 w-4"/> End Tour
                    </Button>
                    </div>
                </div>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    {activeTour.route && activeTour.route.length > 0 && (
                    <div>
                        <h4 className="text-lg font-medium text-gray-700 mb-2">
                        Current Stop ({currentTourStepIndex + 1}/{activeTour.route.length}): {activeTour.route[currentTourStepIndex].name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-md border">
                        {activeTour.route[currentTourStepIndex].instructions}
                        </p>
                        {activeTour.route[currentTourStepIndex].birdsToSpot && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Look out for:</p>
                                <div className="flex flex-wrap gap-1">
                                {activeTour.route[currentTourStepIndex].birdsToSpot?.map(bird => (
                                    <Badge key={bird} variant="outline" className="text-xs font-light">{bird}</Badge>
                                ))}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between mt-4">
                        <Button 
                            onClick={() => setCurrentTourStepIndex(prev => Math.max(0, prev - 1))} 
                            disabled={currentTourStepIndex === 0}
                            variant="outline" size="sm"
                        >
                            Previous Stop
                        </Button>
                        <Button 
                            onClick={() => setCurrentTourStepIndex(prev => Math.min(activeTour.route!.length - 1, prev + 1))} 
                            disabled={currentTourStepIndex === activeTour.route.length - 1}
                             size="sm" className="bg-gray-700 hover:bg-gray-800"
                        >
                            Next Stop
                        </Button>
                        </div>
                    </div>
                    )}

                    <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Birds on this Tour</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {activeTour.frequentBirds.map(birdName => {
                        const birdDetail = birdSpecies.find(b => b.name === birdName);
                        return (
                            <div key={birdName} 
                                className={`flex items-center justify-between p-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${activeTourChecklist.has(birdName) ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                                onClick={() => handleActiveTourChecklistToggle(birdName)}
                            >
                            <div className="flex items-center space-x-3">
                                <img src={birdDetail?.image || '/placeholder.svg'} alt={birdName} className="w-8 h-8 rounded-md object-cover"/>
                                <span className={`text-sm ${activeTourChecklist.has(birdName) ? 'text-green-700 font-medium' : 'text-gray-700'}`}>{birdName}</span>
                            </div>
                            {activeTourChecklist.has(birdName) ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Circle className="h-5 w-5 text-gray-300"/>}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                </div>
                </ScrollArea>
            </DialogContent>
            </Dialog>
        )}

      {showFieldNotesModal && (
        <Dialog open={showFieldNotesModal} onOpenChange={(isOpen) => {
            if(!isOpen) {
                setShowFieldNotesModal(false);
                closeActiveTour();
            }
        }}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-light">Your Birding Field Notes</DialogTitle>
              <DialogDescription>A summary of your tour. You can copy this for your records.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] my-4">
                <pre className="bg-gray-50 p-4 rounded-md text-xs leading-relaxed whitespace-pre-wrap border font-mono">
                {fieldNotes}
                </pre>
            </ScrollArea>
            <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={() => {setShowFieldNotesModal(false); closeActiveTour();}}>Close</Button>
                <Button onClick={() => copyToClipboard(fieldNotes)} className="bg-green-600 hover:bg-green-700">
                    <Copy className="mr-2 h-4 w-4"/> Copy Notes
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showChecklistModal && (
        <Dialog open={showChecklistModal} onOpenChange={setShowChecklistModal}>
            <DialogContent className="sm:max-w-2xl p-0 flex flex-col h-[90vh] sm:h-[85vh]">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-2xl sm:text-3xl font-light text-gray-800">My Birding Checklist</DialogTitle>
                    <DialogDescription className="text-gray-500 font-light mt-1 text-sm">Track your campus bird sightings</DialogDescription>
                </DialogHeader>
                 <ScrollArea className="flex-1">
                    <div className="p-6 space-y-3">
                        {birdSpecies.map((bird, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/70 transition-all duration-200 group cursor-pointer"
                            onClick={() => toggleGlobalBirdCheck(bird.name)}
                        >
                            <button
                            className={`text-green-600 hover:scale-110 transition-transform duration-200 p-1 rounded-full ${globalCheckedBirds.has(bird.name) ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-50'}`}
                            >
                            {globalCheckedBirds.has(bird.name) ? 
                                <CheckCircle className="h-5 w-5" /> : 
                                <Circle className="h-5 w-5 text-gray-400 group-hover:text-green-500" />
                            }
                            </button>
                            <img 
                            src={bird.image} 
                            alt={bird.name}
                            className="w-10 h-10 rounded-md object-cover shadow-sm"
                            />
                            <div className="flex-1">
                            <h4 className={`font-medium text-sm ${globalCheckedBirds.has(bird.name) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                {bird.name}
                            </h4>
                            <p className={`text-xs ${globalCheckedBirds.has(bird.name) ? 'text-gray-400' :'text-gray-500'}`}>{bird.scientificName}</p>
                            </div>
                            {globalCheckedBirds.has(bird.name) && <Check className="h-5 w-5 text-green-500" />}
                        </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
                    <div className="flex items-center space-x-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                        <h4 className="font-medium text-gray-700 text-sm">Progress</h4>
                        <p className="text-xs text-gray-500">
                            {globalCheckedBirds.size} of {birdSpecies.length} birds spotted
                        </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Placeholder for UploadCloud icon if not available
const UploadCloud = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
);


export default Index;