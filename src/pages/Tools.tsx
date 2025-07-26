import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Binoculars, Sun, Glasses, Book, Camera, Backpack, Droplet, Footprints, 
  Bug, NotebookPen, Smartphone, Image, CloudRain, DollarSign, Star, 
  Bird, ChevronDown, X, ArrowRight, Sparkles, ShoppingCart, ExternalLink,
  Compass, Wind, Mountain, TreePine, Zap, Shield
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
  
  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
  
  .content-max-width {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

// Student-friendly tools only
const studentGear = [
  {
    name: 'Binoculars',
    icon: <Binoculars className="h-6 w-6" />, 
    desc: 'Standard Issue 8x25 Waterproof Binoculars - Perfect for students and beginners.',
    link: 'https://www.nocsprovisions.com/products/standard-issue-8x25-waterproof-binoculars?variant=47377495654679',
    additionalResource: 'https://www.audubon.org/magazine/category-get-game',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Field Guide',
    icon: <Book className="h-6 w-6" />, 
    desc: 'Sibley\'s Backyard Birds of Southern California or Peterson Field Guide to Birds of Western North America.',
    link: 'https://www.sibleyguides.com/product/sibleys-backyard-birds-of-southern-california/',
    additionalInfo: 'Peterson Field Guide to Birds of Western North America (alternative)',
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Field Notebook',
    icon: <NotebookPen className="h-6 w-6" />, 
    desc: 'Rite in the Rain Birder\'s Journal or Sibley Birder\'s Life List and Field Diary.',
    link: 'https://www.riteintherain.com/no-195-birders-journal?search=195',
    additionalInfo: 'The Sibley Birder\'s Life List and Field Diary',
    additionalLink: 'https://www.birdcollective.com/collections/bird-books/products/the-sibley-birder-s-life-list-field-diary',
    tipsLink: 'https://www.allaboutbirds.org/news/take-note-tips-for-keeping-a-field-notebook/',
    color: 'from-slate-500 to-gray-600'
  },
  {
    name: 'Camera',
    icon: <Camera className="h-6 w-6" />, 
    desc: 'Nikon Coolpix P950 - Excellent zoom capabilities for bird photography.',
    link: 'https://www.nikonusa.com/p/coolpix-p950/26532/overview',
    color: 'from-purple-500 to-pink-600'
  }
];

const additionalResources = [
  {
    name: 'Birding at Bolsa Chica',
    url: 'https://bolsachica.org/birds/',
    description: 'Discover birds at this nearby ecological reserve'
  },
  {
    name: 'Fullerton Arboretum',
    url: 'https://arboretum.fullerton.edu/',
    description: 'Campus botanical garden with diverse bird species'
  },
  {
    name: 'eBird at Fullerton Arboretum',
    url: 'https://ebird.org/hotspot/L789249/bird-list',
    description: 'Real-time bird sightings at the campus arboretum'
  },
  {
    name: 'Birding for a Better World',
    url: 'https://bookshop.org/p/books/the-feminist-bird-club-s-birding-for-a-better-world-a-guide-to-finding-joy-and-community-in-nature-molly-adams/19811099?ean=9781797223339&next=t&affiliate=2057',
    description: 'A guide to finding joy and community in nature'
  },
  {
    name: 'Birdpedia',
    url: 'https://www.birdcollective.com/collections/bird-books/products/birdpedia',
    description: 'Comprehensive bird reference guide'
  },
  {
    name: 'Life List: Poets with Birds',
    url: 'https://www.poetrynw.org/life-list/',
    description: 'Poetry and literature inspired by birds'
  }
];

const Tools = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
                    if (item === 'Checklist') {
                      window.location.href = '/checklist';
                    }
                    else if (item === 'About Us') {
                      window.location.href = '/about-us';
                    }
                    else if (item === 'Tools') scrollToSection('tools');
                    else window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'Tools' ? 'bg-white/10' : ''}`}
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
                    if (item === 'Checklist') {
                      window.location.href = '/checklist';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'About Us') {
                      window.location.href = '/about-us';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'Tools') {scrollToSection('tools'); setIsMenuOpen(false);}
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
            backgroundImage: "url('/ARB_house_day.jpg')",
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
                Student-Friendly
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Birding Tools
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Affordable and beginner-friendly equipment to start your birdwatching journey at CSUF.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('tools')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <ShoppingCart className="mr-3 h-6 w-6 animate-pulse" />
                Shop Now
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

      {/* Student-Friendly Tools Section */}
      <section id="tools" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-green-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <DollarSign className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Student-Friendly Tools
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Perfect for students and beginners on a budget.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>
          
          {/* Student Tools Grid */}
          <div className="max-w-6xl mx-auto">            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {studentGear.map((item, index) => (
                <Card key={item.name} className="overflow-hidden border-0 shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 bg-white rounded-2xl" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className={`p-4 bg-gradient-to-r ${item.color} rounded-xl text-white shadow-lg transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <CardTitle className="text-xl font-medium text-gray-800">{item.name}</CardTitle>
                            <Badge className="bg-blue-500 text-white px-3 py-1">Student</Badge>
                          </div>
                          <CardDescription className="text-base text-gray-600 leading-relaxed mb-4">{item.desc}</CardDescription>
                          
                          {/* Main Link */}
                          <div className="space-y-3">
                            <Button 
                              asChild 
                              className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6"
                            >
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                View Product
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                            
                            {/* Additional Resources */}
                            {item.additionalResource && (
                              <div className="text-sm text-gray-600">
                                Additional resource: <a href={item.additionalResource} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Getting started guide</a>
                              </div>
                            )}
                            
                            {item.additionalInfo && (
                              <div className="text-sm text-gray-600">
                                Alternative: {item.additionalInfo}
                                {item.additionalLink && (
                                  <span> - <a href={item.additionalLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">View here</a></span>
                                )}
                              </div>
                            )}
                            
                            {item.tipsLink && (
                              <div className="text-sm text-gray-600">
                                Tips: <a href={item.tipsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">How to keep field notes</a>
                              </div>
                            )}
                            

                          </div>
                        </div>
                      </div>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <Book className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Explore these helpful resources to enhance your birding knowledge and experience.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalResources.map((resource, index) => (
                <Card key={resource.name} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 bg-white rounded-xl group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {resource.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {resource.description}
                      </CardDescription>
                      <Button 
                        asChild 
                        variant="outline"
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          Visit Resource
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
            Gear recommendations are affiliate links to Amazon for your convenience. <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Tools; 