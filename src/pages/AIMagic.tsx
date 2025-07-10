import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bird, ChevronDown, X, ArrowRight, Sparkles, MapPin, Clock, 
  Star, Trees, Building, Filter, Play, Calendar, Users, 
  Mountain, Compass, Sun, Moon, Leaf, Camera, Feather,
  Search, Info, Eye, Volume2, Heart, MessageSquare, Send,
  BotMessageSquare, Loader2, Mic, Brain
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
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
`;

interface BirdSpecies {
  name: string;
  scientificName: string;
  image: string;
  description: string;
  funFact: string;
  habitat: string;
}

const birdSpecies: BirdSpecies[] = [
  { name: "Red-shouldered Hawk", scientificName: "Buteo lineatus", image: "/red-shouldered-hawk.jpg", description: "Medium-sized hawk with distinctive reddish shoulder patches and banded tail.", funFact: "Red-shouldered Hawks have incredible eyesight, about 8 times sharper than humans!", habitat: "Wooded areas near water, often seen in the Arboretum." },
  { name: "Anna's Hummingbird", scientificName: "Calypte anna", image: "/anna-hummingbird.jpg", description: "Medium-sized hummingbird with iridescent rose-pink feathers on the male's head and throat.", funFact: "Anna's Hummingbirds are the only North American hummingbird species that regularly overwinters in northern latitudes.", habitat: "Gardens, parks, and anywhere with nectar-producing flowers." },
  { name: "American Crow", scientificName: "Corvus brachyrhynchos", image: "/american-crow.jpg", description: "Large, all-black bird with a sturdy bill and squared tail.", funFact: "American Crows are highly intelligent and can use tools and solve complex problems.", habitat: "Diverse habitats including urban areas, farms, and woodlands." },
  { name: "Mourning Dove", scientificName: "Zenaida macroura", image: "/mourning-dove.avif", description: "Slender, grayish-brown dove with black spots on its wings and a long, pointed tail.", funFact: "Mourning Doves can drink brackish water, which helps them survive in arid environments.", habitat: "Open country, parks, suburban areas; very common throughout campus." },
  { name: "California Scrub-Jay", scientificName: "Aphelocoma californica", image: "/california-scrub-jay.jpg", description: "Blue bird with a gray back/belly and a whitish throat, known for its intelligence.", funFact: "California Scrub-Jays are known to cache thousands of acorns each fall!", habitat: "Oak woodlands, chaparral, suburban gardens; common in the Arboretum." },
  { name: "California Towhee", scientificName: "Melozone crissalis", image: "/california-towhee.jpg", description: "Plain brown, sparrow-like bird with a rusty patch under its tail.", funFact: "Masters of the 'double-scratch' feeding technique to uncover seeds and insects.", habitat: "Chaparral, dense shrubs, undergrowth in gardens." },
  { name: "House Finch", scientificName: "Haemorhous mexicanus", image: "/house-finch.jpg", description: "Small finch; males have rosy red on the head and breast.", funFact: "The red coloration of male House Finches comes from pigments in their food.", habitat: "Ubiquitous in urban and suburban areas, parks, and open woods." },
  { name: "Lesser Goldfinch", scientificName: "Spinus psaltria", image: "/lesser-goldfinch.jpg", description: "Tiny finch with a bright yellow underside; males have a black cap.", funFact: "Lesser Goldfinches often feed acrobatically, hanging upside down to reach seeds.", habitat: "Open woodlands, weedy fields, gardens with seed-bearing plants." },
  { name: "Black Phoebe", scientificName: "Sayornis nigricans", image: "/black-phoebe.jpg", description: "Small, dark flycatcher with a contrasting white belly; often wags its tail.", funFact: "Frequently builds mud nests under the eaves of buildings or bridges.", habitat: "Near water sources, open areas with low perches for catching insects." },
  { name: "Northern Mockingbird", scientificName: "Mimus polyglottos", image: "/northern-mockingbird.jpg", description: "Gray bird with white wing patches, known for its incredible ability to mimic other birds.", funFact: "Northern Mockingbirds can learn and mimic over 200 different songs from other birds!", habitat: "Open areas with scattered trees, parks, suburban areas throughout campus." },
  { name: "Wrentit", scientificName: "Chamaea fasciata", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Wrentit.jpg/800px-Wrentit.jpg", description: "Small, plain grayish-brown bird with a long tail often cocked upwards; more often heard than seen.", funFact: "The Wrentit's song is a series of sharp notes that accelerate into a trill, often described as a 'bouncing ball'.", habitat: "Dense chaparral and coastal scrub; found in the Arboretum's native plant areas." }
];

// !! IMPORTANT SECURITY WARNING !!
// Do NOT use API keys directly in frontend code for production applications.
// This is for demonstration purposes ONLY.
const GEMINI_API_KEY = "AIzaSyAhgRnn_yJhbuiaQcoZMppaY8LnpItmdgI"; // User-provided API key

const AIMagic = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const navBackgroundClass = scrollY > 50 
    ? "bg-white/80 backdrop-blur-xl shadow-md border-gray-200/80"
    : "bg-transparent backdrop-blur-none shadow-none border-transparent";

  const navLogoTextColorClass = scrollY > 50 ? "text-gray-800" : "text-white [text-shadow:_1px_1px_3px_rgb(0_0_0_/_40%)]";
  const navLinkColorClass = scrollY > 50
    ? "text-foreground/70 hover:text-primary"
    : "text-gray-100 hover:text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_30%)]";
  const navIconColorClass = scrollY > 50 ? "text-primary" : "text-white";
  const mobileMenuIconColorClass = scrollY > 50 ? "bg-foreground/70" : "bg-white";

  // --- AI Call Functions ---
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
                    else if (item === 'AI Magic') scrollToSection('ai-magic');
                    else if (item === 'Tools') window.location.href = '/tools';
                    else if (item === 'Tours') window.location.href = '/tours';
                    else if (item === 'Species') window.location.href = '/species';
                    else window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'AI Magic' ? 'bg-white/10' : ''}`}
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
                    else if (item === 'AI Magic') {scrollToSection('ai-magic'); setIsMenuOpen(false);}
                    else if (item === 'Tools') {window.location.href = '/tools'; setIsMenuOpen(false);}
                    else if (item === 'Tours') {window.location.href = '/tours'; setIsMenuOpen(false);}
                    else if (item === 'Species') {window.location.href = '/species'; setIsMenuOpen(false);}
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
                AI Bird
                <span className="mt-2 block text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-rose-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Magic
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Interact with our feathered friends like never before through the power of artificial intelligence!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('ai-magic')}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                Try AI Magic
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

      {/* Enhanced AI Magic Section */}
      <section id="ai-magic" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/70 via-pink-50/70 to-rose-50/70 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-rose-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse animation-delay-1500"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
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

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-xl border border-purple-100">
              <h3 className="text-2xl font-light text-gray-800 mb-4">Want to See These Birds in Real Life?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Join our guided tours and meet the birds you've been chatting with!</p>
              <Button 
                onClick={() => window.location.href = '/tours'}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500"
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
            Experience the magic of AI-powered bird interactions! <br />
            <span className="text-purple-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

// Placeholder for UploadCloud icon if not available
const UploadCloud = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
);

export default AIMagic; 