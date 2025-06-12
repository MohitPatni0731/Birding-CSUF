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

const gear = [
  {
    name: 'Binoculars',
    icon: <Binoculars className="h-6 w-6" />, 
    desc: 'Essential for spotting distant birds clearly and observing fine details.',
    category: 'Essential',
    cheap: 'https://www.amazon.com/s?k=budget+binoculars+bird+watching+under+50',
    expensive: 'https://www.amazon.com/s?k=zeiss+swarovski+leica+binoculars+bird+watching',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Field Guide',
    icon: <Book className="h-6 w-6" />, 
    desc: 'Comprehensive guide to identify birds in your region.',
    category: 'Essential',
    cheap: 'https://www.amazon.com/s?k=sibley+guide+birds+paperback',
    expensive: 'https://www.amazon.com/s?k=national+geographic+birds+north+america+deluxe',
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Camera',
    icon: <Camera className="h-6 w-6" />, 
    desc: 'Capture stunning photos of your bird discoveries.',
    category: 'Photography',
    cheap: 'https://www.amazon.com/s?k=canon+powershot+sx70+bird+photography',
    expensive: 'https://www.amazon.com/s?k=canon+r5+600mm+lens+bird+photography',
    color: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Tripod',
    icon: <Image className="h-6 w-6" />, 
    desc: 'Stabilize your camera for sharp, professional shots.',
    category: 'Photography',
    cheap: 'https://www.amazon.com/s?k=lightweight+tripod+under+100',
    expensive: 'https://www.amazon.com/s?k=gitzo+carbon+fiber+tripod+professional',
    color: 'from-gray-500 to-slate-600'
  },
  {
    name: 'Sun Hat',
    icon: <Sun className="h-6 w-6" />, 
    desc: 'Wide-brim protection for long hours in the field.',
    category: 'Clothing',
    cheap: 'https://www.amazon.com/s?k=wide+brim+sun+hat+hiking+under+25',
    expensive: 'https://www.amazon.com/s?k=tilley+hat+sun+protection+premium',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    name: 'Hiking Shoes',
    icon: <Footprints className="h-6 w-6" />, 
    desc: 'Comfortable, waterproof shoes for any terrain.',
    category: 'Clothing',
    cheap: 'https://www.amazon.com/s?k=merrell+hiking+shoes+waterproof+under+100',
    expensive: 'https://www.amazon.com/s?k=salomon+hiking+boots+gore+tex+premium',
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Rain Jacket',
    icon: <CloudRain className="h-6 w-6" />, 
    desc: 'Lightweight, breathable protection from the elements.',
    category: 'Clothing',
    cheap: 'https://www.amazon.com/s?k=packable+rain+jacket+hiking+under+50',
    expensive: 'https://www.amazon.com/s?k=patagonia+arcteryx+rain+jacket+gore+tex',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    name: 'Backpack',
    icon: <Backpack className="h-6 w-6" />, 
    desc: 'Organized storage for all your birding gear.',
    category: 'Accessories',
    cheap: 'https://www.amazon.com/s?k=hiking+daypack+30l+under+60',
    expensive: 'https://www.amazon.com/s?k=osprey+gregory+premium+hiking+backpack',
    color: 'from-teal-500 to-green-600'
  },
  {
    name: 'Smartphone Adapter',
    icon: <Smartphone className="h-6 w-6" />, 
    desc: 'Connect your phone to binoculars for digiscoping.',
    category: 'Accessories',
    cheap: 'https://www.amazon.com/s?k=smartphone+binocular+adapter+universal',
    expensive: 'https://www.amazon.com/s?k=swarovski+zeiss+smartphone+adapter+premium',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    name: 'Insect Repellent',
    icon: <Bug className="h-6 w-6" />, 
    desc: 'DEET-free, natural protection from bugs.',
    category: 'Accessories',
    cheap: 'https://www.amazon.com/s?k=natural+insect+repellent+deet+free',
    expensive: 'https://www.amazon.com/s?k=premium+insect+repellent+permethrin+clothing',
    color: 'from-green-500 to-lime-600'
  },
  {
    name: 'Water Bottle',
    icon: <Droplet className="h-6 w-6" />, 
    desc: 'Insulated bottle to keep drinks at perfect temperature.',
    category: 'Accessories',
    cheap: 'https://www.amazon.com/s?k=insulated+water+bottle+32oz+under+30',
    expensive: 'https://www.amazon.com/s?k=hydro+flask+yeti+premium+water+bottle',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Field Notebook',
    icon: <NotebookPen className="h-6 w-6" />, 
    desc: 'Waterproof notebook for recording observations.',
    category: 'Accessories',
    cheap: 'https://www.amazon.com/s?k=waterproof+field+notebook+birding',
    expensive: 'https://www.amazon.com/s?k=rite+in+rain+premium+field+notebook',
    color: 'from-slate-500 to-gray-600'
  }
];

const Tools = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Essential', 'Photography', 'Clothing', 'Accessories'];

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

  const filteredGear = selectedCategory === 'All' 
    ? gear 
    : gear.filter(item => item.category === selectedCategory);

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
                      // Navigate to main page and open checklist modal
                      window.location.href = '/#checklist';
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
              {['Tours', 'Species', 'AI Magic', 'Tools', 'Checklist', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (item === 'Checklist') {
                      window.location.href = '/#checklist';
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
                Birding
                <span className="mt-2 block text-transparent bg-gradient-to-r from-emerald-300 via-sky-300 to-purple-400 bg-clip-text font-semibold [text-shadow:none] animate-gradient-x">
                  Tools & Gear
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_2px_4px_rgb(0_0_0_/_50%)] animate-fade-in-up animation-delay-500">
                Discover the essential equipment for your birdwatching adventures, from budget-friendly basics to premium professional gear.
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

      {/* Enhanced Tools Section */}
      <section id="tools" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-green-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
              <ShoppingCart className="h-8 w-8 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
              Essential Gear
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Choose your birding essentials based on your budget and experience level.
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mt-6 animate-gradient-x"></div>
          </div>
          
          {/* Enhanced filter buttons */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="flex bg-white/80 backdrop-blur-lg p-2 rounded-2xl shadow-xl border border-gray-200/50 flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 sm:px-8 py-3 rounded-xl transition-all duration-500 text-sm font-medium relative flex items-center gap-3 group ${selectedCategory === category
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/80'
                    }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Sections */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Pocket Friendly Section */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl mb-4 shadow-lg">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-3xl font-light text-green-700">Pocket Friendly</h3>
                    <p className="text-sm text-green-600">Great value for beginners</p>
                  </div>
                  <Badge className="bg-green-500 text-white px-3 py-1">Budget</Badge>
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredGear.map((item, index) => (
                  <Card key={`cheap-${item.name}`} className="overflow-hidden border-0 shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 bg-white rounded-2xl relative group" style={{ animationDelay: `${index * 100}ms` }}>
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                    <div className="relative bg-white rounded-2xl m-0.5">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg font-medium text-gray-800">{item.name}</CardTitle>
                              <Badge variant="outline" className="text-xs">{item.category}</Badge>
                            </div>
                            <CardDescription className="text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</CardDescription>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500">Budget-friendly option</span>
                            </div>
                          </div>
                          <Button 
                            asChild 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6"
                          >
                            <a href={item.cheap} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <ShoppingCart className="h-4 w-4" />
                              Buy
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Premium Section */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl mb-4 shadow-lg">
                  <Sparkles className="h-8 w-8 text-yellow-600" />
                  <div>
                    <h3 className="text-3xl font-light text-yellow-700">Premium</h3>
                    <p className="text-sm text-yellow-600">Professional quality gear</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white px-3 py-1">Pro</Badge>
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredGear.map((item, index) => (
                  <Card key={`expensive-${item.name}`} className="overflow-hidden border-0 shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 bg-white rounded-2xl relative group" style={{ animationDelay: `${index * 100 + 50}ms` }}>
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                    <div className="relative bg-white rounded-2xl m-0.5">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                            {item.icon}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg font-medium text-gray-800">{item.name}</CardTitle>
                              <Badge className="bg-yellow-100 text-yellow-700 text-xs">Premium</Badge>
                            </div>
                            <CardDescription className="text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</CardDescription>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">Professional grade</span>
                            </div>
                          </div>
                          <Button 
                            asChild 
                            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6"
                          >
                            <a href={item.expensive} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Buy
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-xl border border-blue-100">
              <h3 className="text-2xl font-light text-gray-800 mb-4">Ready to Start Your Birding Adventure?</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Join our guided tours and put your new gear to the test!</p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-500"
              >
                <Bird className="mr-3 h-6 w-6" />
                Explore Tours
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
            Gear recommendations are affiliate links to Amazon for your convenience. <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Tools; 