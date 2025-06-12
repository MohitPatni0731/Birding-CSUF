import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bird, ChevronDown, X, ArrowRight, Sparkles, MapPin, Clock, 
  Star, Trees, Building, Filter, Play, Calendar, Users, 
  Mountain, Compass, Sun, Moon, Leaf, Camera, Feather,
  Search, Info, Eye, Volume2, Heart, Droplet
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

interface BirdSpecies {
  name: string;
  scientificName: string;
  image: string;
  description: string;
  funFact: string;
  habitat: string;
  size?: string;
  diet?: string;
  behavior?: string;
  seasonality?: string;
  rarity?: 'Common' | 'Uncommon' | 'Rare';
  category?: 'Songbird' | 'Raptor' | 'Waterfowl' | 'Hummingbird' | 'Corvid';
}

const birdSpecies: BirdSpecies[] = [
  { 
    name: "Red-tailed Hawk", 
    scientificName: "Buteo jamaicensis", 
    image: "https://images.unsplash.com/photo-1530689300999-e09e32919d70?w=400", 
    description: "Large raptor with a broad, reddish tail, often seen soaring or perched high.", 
    funFact: "Red-tailed Hawks have incredible eyesight, about 8 times sharper than humans!", 
    habitat: "Open country, woodlands, often seen soaring over campus or perched on tall structures.",
    size: "17-22 inches wingspan",
    diet: "Small mammals, birds, reptiles",
    behavior: "Soars in wide circles, perches on high vantage points",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Raptor"
  },
  { 
    name: "Anna's Hummingbird", 
    scientificName: "Calypte anna", 
    image: "https://images.unsplash.com/photo-1595460004628-24f63786700e?w=400", 
    description: "Medium-sized hummingbird with iridescent rose-pink feathers on the male's head and throat.", 
    funFact: "Anna's Hummingbirds are the only North American hummingbird species that regularly overwinters in northern latitudes.", 
    habitat: "Gardens, parks, and anywhere with nectar-producing flowers.",
    size: "3.9-4.3 inches",
    diet: "Nectar, small insects, tree sap",
    behavior: "Hovers at flowers, aggressive at feeders, performs diving displays",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Hummingbird"
  },
  { 
    name: "American Robin", 
    scientificName: "Turdus migratorius", 
    image: "https://images.unsplash.com/photo-1552533700-8889fcc9829b?w=400", 
    description: "Familiar songbird with a gray back, rusty orange breast, and a cheerful song.", 
    funFact: "While often seen on lawns tugging at earthworms, American Robins also eat a lot of fruit, especially in winter.", 
    habitat: "Lawns, open woodlands, gardens.",
    size: "8-11 inches",
    diet: "Earthworms, insects, berries, fruits",
    behavior: "Hops on ground, tilts head to listen for worms, forms winter flocks",
    seasonality: "Year-round, more abundant in winter",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Cooper's Hawk", 
    scientificName: "Accipiter cooperii", 
    image: "https://images.unsplash.com/photo-1609852649986-c5a3c1aa62f2?w=400", 
    description: "Medium-sized hawk with a long, banded tail and relatively short, rounded wings.", 
    funFact: "Cooper's Hawks primarily hunt other birds, ambushing them with swift, agile flight.", 
    habitat: "Wooded areas, suburban parks.",
    size: "14-20 inches wingspan",
    diet: "Primarily birds, some small mammals",
    behavior: "Stealthy hunter, flies through dense vegetation, ambush predator",
    seasonality: "Year-round resident",
    rarity: "Uncommon",
    category: "Raptor"
  },
  { 
    name: "Mourning Dove", 
    scientificName: "Zenaida macroura", 
    image: "https://images.unsplash.com/photo-1599142315884-f6f1308030e3?w=400", 
    description: "Slender, grayish-brown dove with black spots on its wings and a long, pointed tail.", 
    funFact: "Mourning Doves can drink brackish water, which helps them survive in arid environments.", 
    habitat: "Open country, parks, suburban areas; very common throughout campus.",
    size: "9-13 inches",
    diet: "Seeds, grains, occasionally snails",
    behavior: "Ground feeder, forms flocks, produces mournful cooing call",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "California Scrub-Jay", 
    scientificName: "Aphelocoma californica", 
    image: "https://images.unsplash.com/photo-1604828033713-94a000a7d401?w=400", 
    description: "Blue bird with a gray back/belly and a whitish throat, known for its intelligence.", 
    funFact: "California Scrub-Jays are known to cache thousands of acorns each fall!", 
    habitat: "Oak woodlands, chaparral, suburban gardens; common in the Arboretum.",
    size: "11-12 inches",
    diet: "Acorns, insects, eggs, nestlings, small reptiles",
    behavior: "Highly intelligent, caches food, mobbing behavior, complex social structure",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Corvid"
  },
  { 
    name: "California Towhee", 
    scientificName: "Melozone crissalis", 
    image: "https://images.unsplash.com/photo-1628052701689-a386d6434595?w=400", 
    description: "Plain brown, sparrow-like bird with a rusty patch under its tail.", 
    funFact: "Masters of the 'double-scratch' feeding technique to uncover seeds and insects.", 
    habitat: "Chaparral, dense shrubs, undergrowth in gardens.",
    size: "8-10 inches",
    diet: "Seeds, insects, berries",
    behavior: "Ground forager, double-scratch feeding, secretive in dense brush",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "House Finch", 
    scientificName: "Haemorhous mexicanus", 
    image: "https://images.unsplash.com/photo-1506220926022-cc5c4892f411?w=400", 
    description: "Small finch; males have rosy red on the head and breast.", 
    funFact: "The red coloration of male House Finches comes from pigments in their food.", 
    habitat: "Ubiquitous in urban and suburban areas, parks, and open woods.",
    size: "5-6 inches",
    diet: "Seeds, buds, fruits",
    behavior: "Social, forms flocks, frequent at feeders, melodious song",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Lesser Goldfinch", 
    scientificName: "Spinus psaltria", 
    image: "https://images.unsplash.com/photo-1597739254919-a3c7dc0c400a?w=400", 
    description: "Tiny finch with a bright yellow underside; males have a black cap.", 
    funFact: "Lesser Goldfinches often feed acrobatically, hanging upside down to reach seeds.", 
    habitat: "Open woodlands, weedy fields, gardens with seed-bearing plants.",
    size: "3.5-4.5 inches",
    diet: "Seeds, especially thistle and sunflower",
    behavior: "Acrobatic feeder, forms flocks, undulating flight pattern",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Black Phoebe", 
    scientificName: "Sayornis nigricans", 
    image: "https://images.unsplash.com/photo-1601275205711-a2901a576270?w=400", 
    description: "Small, dark flycatcher with a contrasting white belly; often wags its tail.", 
    funFact: "Frequently builds mud nests under the eaves of buildings or bridges.", 
    habitat: "Near water sources, open areas with low perches for catching insects.",
    size: "6-7 inches",
    diet: "Flying insects caught on the wing",
    behavior: "Perches on low branches, tail wagging, sallies out for insects",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Yellow-rumped Warbler", 
    scientificName: "Setophaga coronata", 
    image: "https://images.unsplash.com/photo-1518490390990-b1911a97d1d7?w=400", 
    description: "Common winter warbler, gray or brownish with distinctive yellow patches on its rump.", 
    funFact: "Nicknamed 'butter-butt' for their yellow rump patch.", 
    habitat: "Abundant in winter in various habitats with trees and shrubs.",
    size: "4.7-5.5 inches",
    diet: "Insects in summer, berries and seeds in winter",
    behavior: "Active forager, flicks wings frequently, forms mixed flocks",
    seasonality: "Winter visitor",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Song Sparrow", 
    scientificName: "Melospiza melodia", 
    image: "https://images.unsplash.com/photo-1517984410560-1a739b0eba26?w=400", 
    description: "Streaked brown sparrow with a central dark spot on its breast; sings a varied, musical song.", 
    funFact: "Song Sparrows have many regional variations in their songs, almost like local dialects.", 
    habitat: "Dense shrubs, often near water or damp areas; found in the Arboretum and wetter landscaped parts of campus.",
    size: "4.7-6.7 inches",
    diet: "Seeds, insects, berries",
    behavior: "Skulks in dense cover, beautiful varied song, territorial",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Bushtit", 
    scientificName: "Psaltriparus minimus", 
    image: "https://images.unsplash.com/photo-1549063296-488f767e9911?w=400", 
    description: "Tiny, gray-brown bird with a long tail, almost always seen in active, chattering flocks.", 
    funFact: "Bushtits build impressive hanging sock-like nests woven from spiderwebs, moss, and lichens.", 
    habitat: "Trees and shrubs throughout campus and the Arboretum; listen for their constant high-pitched contact calls.",
    size: "2.8-3.1 inches",
    diet: "Small insects, spiders, occasionally berries",
    behavior: "Highly social, travels in flocks of 10-40 birds, acrobatic feeding",
    seasonality: "Year-round resident",
    rarity: "Common",
    category: "Songbird"
  },
  { 
    name: "Wrentit", 
    scientificName: "Chamaea fasciata", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Wrentit.jpg/800px-Wrentit.jpg", 
    description: "Small, plain grayish-brown bird with a long tail often cocked upwards; more often heard than seen.", 
    funFact: "The Wrentit's song is a series of sharp notes that accelerate into a trill, often described as a 'bouncing ball'.", 
    habitat: "Dense chaparral and coastal scrub; found in the Arboretum's native plant areas.",
    size: "5.9-6.3 inches",
    diet: "Insects, spiders, berries",
    behavior: "Secretive, stays in dense brush, distinctive bouncing ball song",
    seasonality: "Year-round resident",
    rarity: "Uncommon",
    category: "Songbird"
  }
];

const Species = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBird, setSelectedBird] = useState<BirdSpecies | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Songbird', 'Raptor', 'Waterfowl', 'Hummingbird', 'Corvid'];

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

  const filteredBirds = birdSpecies.filter(bird => {
    const matchesCategory = selectedCategory === 'All' || bird.category === selectedCategory;
    const matchesSearch = bird.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bird.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-green-100 text-green-800';
      case 'Uncommon': return 'bg-yellow-100 text-yellow-800';
      case 'Rare': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Raptor': return <Eye className="h-4 w-4" />;
      case 'Hummingbird': return <Heart className="h-4 w-4" />;
      case 'Corvid': return <Star className="h-4 w-4" />;
      case 'Waterfowl': return <Droplet className="h-4 w-4" />;
      default: return <Feather className="h-4 w-4" />;
    }
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
                    else if (item === 'Species') scrollToSection('species');
                    else if (item === 'Tools') window.location.href = '/tools';
                    else if (item === 'Tours') window.location.href = '/tours';
                    else window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'Species' ? 'bg-white/10' : ''}`}
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
                    else if (item === 'Species') {scrollToSection('species'); setIsMenuOpen(false);}
                    else if (item === 'Tools') {window.location.href = '/tools'; setIsMenuOpen(false);}
                    else if (item === 'Tours') {window.location.href = '/tours'; setIsMenuOpen(false);}
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
                Campus
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Bird Species
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Discover the amazing diversity of birds that call CSUF home, from tiny hummingbirds to soaring hawks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('species')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Search className="mr-3 h-6 w-6 animate-pulse" />
                Explore Species
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

      {/* Enhanced Species Section */}
      <section id="species" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-green-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <Feather className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Our Feathered Friends
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Meet the diverse bird species that inhabit CSUF's campus and arboretum.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 sm:mb-16">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search birds by name or scientific name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white/80 backdrop-blur-lg shadow-lg text-gray-700 placeholder-gray-400 transition-all duration-300"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex bg-white/80 backdrop-blur-lg p-2 rounded-2xl shadow-xl border border-gray-200/50 flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-3 rounded-xl transition-all duration-500 text-sm font-medium relative flex items-center gap-2 group ${selectedCategory === category
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80'
                    }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced bird cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {filteredBirds.map((bird, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setSelectedBird(bird)}
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
                    {/* Rarity badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className={`text-xs px-2 py-1 ${getRarityColor(bird.rarity || 'Common')}`}>
                        {bird.rarity || 'Common'}
                      </Badge>
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
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(bird.category || 'Songbird')}
                        <span className="ml-1">{bird.category || 'Songbird'}</span>
                      </Badge>
                      <Button 
                        variant="link" 
                        className="p-0 text-xs text-sky-600 hover:text-sky-700 font-medium group/btn transition-all duration-300 h-auto" 
                      >
                        <span className="relative text-xs">
                          Learn More
                          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-sky-500 to-purple-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"></div>
                        </span>
                        <Info className="ml-1 h-3 w-3 transform group-hover/btn:rotate-12 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-gray-500 mb-8">
            Showing {filteredBirds.length} of {birdSpecies.length} species
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-xl border border-blue-100">
              <h3 className="text-2xl font-light text-gray-800 mb-4">Want to See These Birds in Person?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Join our guided tours and spot these amazing species in their natural campus habitats!</p>
              <Button 
                onClick={() => window.location.href = '/tours'}
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500"
              >
                <Calendar className="mr-3 h-6 w-6" />
                Book a Tour
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
            Discover the incredible diversity of campus wildlife! <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>

      {/* Bird Detail Modal */}
      {selectedBird && (
        <Dialog open={!!selectedBird} onOpenChange={() => setSelectedBird(null)}>
          <DialogContent className="sm:max-w-2xl p-0">
             <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-lg">
              <img
                src={selectedBird.image}
                alt={selectedBird.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
               <Button
                variant="ghost" size="icon"
                onClick={() => setSelectedBird(null)}
                className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_60%)]">{selectedBird.name}</h3>
                <p className="text-lg italic [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">{selectedBird.scientificName}</p>
              </div>
              <div className="absolute top-4 left-4">
                <Badge className={`${getRarityColor(selectedBird.rarity || 'Common')}`}>
                  {selectedBird.rarity || 'Common'}
                </Badge>
              </div>
            </div>
             <ScrollArea className="max-h-[60vh]">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <p className="text-gray-600 font-light leading-relaxed text-base mb-4">{selectedBird.description}</p>
                  <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Fun Fact
                    </h4>
                    <p className="text-blue-700 text-sm">{selectedBird.funFact}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        Habitat
                      </h4>
                      <p className="text-gray-600 text-sm">{selectedBird.habitat}</p>
                    </div>
                    
                    {selectedBird.size && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Size</h4>
                        <p className="text-gray-600 text-sm">{selectedBird.size}</p>
                      </div>
                    )}

                    {selectedBird.diet && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Diet</h4>
                        <p className="text-gray-600 text-sm">{selectedBird.diet}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {selectedBird.behavior && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Behavior</h4>
                        <p className="text-gray-600 text-sm">{selectedBird.behavior}</p>
                      </div>
                    )}

                    {selectedBird.seasonality && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          Seasonality
                        </h4>
                        <p className="text-gray-600 text-sm">{selectedBird.seasonality}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Category</h4>
                      <Badge variant="outline" className="text-sm">
                        {getCategoryIcon(selectedBird.category || 'Songbird')}
                        <span className="ml-2">{selectedBird.category || 'Songbird'}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
            </div>
            </ScrollArea>
            <DialogFooter className="p-6 border-t border-gray-100">
                <Button
                  onClick={() => window.location.href = '/#ai-magic'}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg py-3 text-base font-light transition-all duration-300"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Try AI Magic with this Bird
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Species; 