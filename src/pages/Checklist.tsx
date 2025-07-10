import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Bird, ChevronDown, ArrowRight, MapPin, Calendar, Clock, Users
} from 'lucide-react';
import { staticBirdData, getRelativeTime, type BirdObservation } from '@/data/birdData';

// Custom CSS animations and styles (same as other pages)
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



const Checklist = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [birdData, setBirdData] = useState<BirdObservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveData, setIsLiveData] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.location.href = '/';
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Fetch real live eBird data using official API
  useEffect(() => {
    const fetchLiveEbirdData = async () => {
      setLoading(true);
      
      try {
        // Your eBird API key
        const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;
        
        // Fullerton Arboretum coordinates
        const lat = 33.8831;
        const lng = -117.8832;
        const radius = 5; // 5km radius to get more observations
        
        // Fetch recent observations from eBird API v2 with full detail to get observer names
        console.log('🐦 Attempting to fetch live eBird data...');
        
        // Option 1: Geographic search (gets data from wider area including whole city)
        const geoUrl = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&dist=${radius}&back=14&maxResults=50&includeProvisional=true&detail=full`;
        
        // Option 2: Specific hotspot search (CSUF campus locations only)
        const hotspotUrl = `https://api.ebird.org/v2/data/obs/L789249/recent?back=14&maxResults=50&includeProvisional=true&detail=full`;
        
        // Use hotspot search to get only university campus data
        const ebirdUrl = hotspotUrl;
        console.log('API URL:', ebirdUrl);
        
        // Try multiple CORS proxy approaches
        const proxyUrls = [
          // Direct API call (in case CORS is allowed)
          ebirdUrl,
          // Public CORS proxies as fallback
          `https://api.allorigins.win/get?url=${encodeURIComponent(ebirdUrl)}`,
          `https://corsproxy.io/?${encodeURIComponent(ebirdUrl)}`,
        ];
        
        let response = null;
        let lastError = null;
        
        for (let i = 0; i < proxyUrls.length; i++) {
          try {
            console.log(`🔄 Trying approach ${i + 1}: ${proxyUrls[i].substring(0, 100)}...`);
            
            const headers = i === 0 ? { 'X-eBirdApiToken': API_KEY } : {};
            
            response = await fetch(proxyUrls[i], {
              headers,
              mode: 'cors',
            });
            
            if (response.ok) {
              console.log(`✅ Success with approach ${i + 1}`);
              break;
            } else {
              console.log(`❌ Approach ${i + 1} failed: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.log(`❌ Approach ${i + 1} error:`, error.message);
            lastError = error;
            response = null;
          }
        }

        if (!response) {
          throw lastError || new Error('All proxy approaches failed');
        }

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('eBird API Error Response:', errorText);
          throw new Error(`eBird API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const responseData = await response.json();
        console.log('✅ Raw API response:', responseData);
        
        // Handle different response formats based on proxy used
        let liveData;
        if (responseData.contents) {
          // AllOrigins proxy response format
          liveData = JSON.parse(responseData.contents);
        } else if (Array.isArray(responseData)) {
          // Direct eBird API response
          liveData = responseData;
        } else {
          // Other proxy format
          liveData = responseData;
        }
        
        console.log('📊 Processed eBird data:', liveData);
        
        // Set the live data
        setBirdData(liveData);
        setIsLiveData(true);
        console.log(`🎉 Successfully fetched ${liveData.length} live bird observations from eBird API`);
        
        // Log the date range of observations
        if (liveData.length > 0) {
          const dates = liveData.map(bird => bird.obsDt).sort();
          console.log(`📅 Date range: ${dates[0]} to ${dates[dates.length - 1]}`);
          console.log(`📊 Sample data:`, liveData.slice(0, 3).map(bird => ({
            species: bird.comName,
            date: bird.obsDt,
            location: bird.locName,
            provisional: bird.obsValid === false ? 'PROVISIONAL' : 'REVIEWED'
          })));
        }
        
      } catch (error) {
        console.error('❌ Failed to fetch live eBird data:', error);
        console.error('Full error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        
        // Fallback to static data if API fails
        setBirdData(staticBirdData);
        setIsLiveData(false);
        console.log('⚠️ Using static fallback data from 2024');
      }
      
      setLoading(false);
    };

    fetchLiveEbirdData();
    
    // Auto-refresh every 15 minutes to get fresh data
    const interval = setInterval(fetchLiveEbirdData, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

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
              {['Tours', 'AI Magic', 'Tools', 'Checklist', 'About Us', 'Contact'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === 'Tools') {
                      window.location.href = '/tools';
                    }
                    else if (item === 'About Us') {
                      window.location.href = '/about-us';
                    }
                    else if (item === 'Checklist') scrollToSection('checklist');
                    else window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'Checklist' ? 'bg-white/10' : ''}`}
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
                    if (item === 'Tools') {
                      window.location.href = '/tools';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'About Us') {
                      window.location.href = '/about-us';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'Checklist') {scrollToSection('checklist'); setIsMenuOpen(false);}
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
            backgroundImage: "url('/ARB_lake.jpg')",
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
                CSUF Arboretum
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Bird Checklist
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Explore real-time bird sightings and create your own checklist for the Fullerton Arboretum using eBird data.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('checklist')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Bird className="mr-3 h-6 w-6 animate-pulse" />
                View Checklist
              </Button>
               <Button 
                onClick={() => window.location.href = '/'}
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/30 hover:border-white/50 backdrop-blur-md shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full"
              >
                Back to Tours
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

      {/* Bird Data Section */}
      <section id="checklist" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <Bird className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Recent Observations
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Real-time bird sightings from the Fullerton Arboretum and surrounding areas, powered by eBird's citizen science database.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>



          {/* Live eBird Data Display */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                <span className="text-lg text-gray-600 font-light">Fetching live bird observations...</span>
                <p className="text-sm text-gray-500 mt-2">Using eBird API to get real-time data</p>
              </div>
            </div>
          ) : birdData.length > 0 ? (
            <div className="max-w-6xl mx-auto space-y-12">

              
              {/* Data Source Indicator */}
              <div className="text-center mb-6">
                {isLiveData ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm">
                    ✓ Live eBird Data • Updated {new Date().toLocaleDateString()} • Auto-refreshes every 15 min
                  </Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2 text-sm">
                    ⚠️ Static Demo Data • Live API temporarily unavailable • Open console for details
                  </Badge>
                )}
              </div>

                            {/* Exact eBird-style Table */}
              <div className="bg-white border border-gray-300 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 border-b border-gray-300">
                      <TableHead className="text-left font-normal text-gray-600 text-xs uppercase tracking-wide py-3 px-4 border-r border-gray-200">#</TableHead>
                      <TableHead className="text-left font-normal text-gray-600 text-xs uppercase tracking-wide py-3 px-4 border-r border-gray-200">SPECIES NAME</TableHead>
                      <TableHead className="text-center font-normal text-gray-600 text-xs uppercase tracking-wide py-3 px-4 border-r border-gray-200">COUNT</TableHead>
                      <TableHead className="text-center font-normal text-gray-600 text-xs uppercase tracking-wide py-3 px-4 border-r border-gray-200">DATE</TableHead>
                      <TableHead className="text-left font-normal text-gray-600 text-xs uppercase tracking-wide py-3 px-4">LOCATION</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {birdData.map((bird, index) => (
                      <TableRow key={`${bird.speciesCode}-${index}`} className="hover:bg-blue-50 border-b border-gray-200 even:bg-gray-50">
                        <TableCell className="py-3 px-4 text-sm text-gray-500 border-r border-gray-200">
                          {index + 1}.
                        </TableCell>
                        <TableCell className="py-3 px-4 border-r border-gray-200">
                          <div>
                            <div className="font-normal text-blue-700 hover:text-blue-900 cursor-pointer text-sm">
                              {bird.comName}
                            </div>
                            <div className="text-xs text-gray-500 italic mt-0.5">
                              {bird.sciName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-center border-r border-gray-200">
                          <span className="text-sm text-gray-900">
                            {bird.howMany || 1}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4 text-center border-r border-gray-200">
                          <span className="text-sm text-gray-700">
                            {new Date(bird.obsDt).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <span className="text-blue-700 hover:text-blue-900 cursor-pointer text-sm">
                            {bird.locName || 'California State University Fullerton'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Show More Button */}
              {birdData.length > 12 && (
                <div className="text-center">
                  <Button 
                    onClick={() => window.open('https://ebird.org/hotspot/L789249/bird-list', '_blank')}
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    View All {birdData.length} Observations on eBird
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
                  <Bird className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-light text-gray-800 mb-4">No Recent Observations</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  No bird observations found in the last 14 days. Check the full eBird hotspot for historical data.
                </p>
                <Button 
                  onClick={() => window.open('https://ebird.org/hotspot/L789249/bird-list', '_blank')}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full"
                >
                  <Bird className="mr-3 h-5 w-5" />
                  View Full eBird Checklist
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
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
            eBird data provided by Cornell Lab of Ornithology. <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Checklist; 