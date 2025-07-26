import React, { useState, useEffect } from 'react';
import { Bird, ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
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
      <style dangerouslySetInnerHTML={{ __html: `
        .content-max-width {
          max-width: 1400px;
          margin: 0 auto;
        }
      `}} />
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ${navBackgroundClass}`}>
        <div className="content-max-width px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
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
                    else if (item === 'Checklist') {
                      window.location.href = '/checklist';
                    }
                    else if (item === 'About Us') {
                      scrollToSection('about');
                    }
                    else {
                      window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                    }
                  }}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${navLinkColorClass} hover:scale-105 ${item === 'About Us' ? 'bg-white/10' : ''}`}
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
                    else if (item === 'Checklist') {
                      window.location.href = '/checklist';
                      setIsMenuOpen(false);
                    }
                    else if (item === 'About Us') {
                      scrollToSection('about');
                      setIsMenuOpen(false);
                    }
                    else {
                      window.location.href = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                      setIsMenuOpen(false);
                    }
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/MH_day.jpg')",
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        {/* Light grey gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Bird className="h-16 w-16 text-white animate-pulse" />
            </div>
            <h1 className="text-6xl sm:text-8xl font-extralight text-white mb-8 tracking-tighter [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]">
              About Our Project
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed [text-shadow:_1px_1px_2px_rgb(0_0_0_/_30%)]">
              Discover the story behind Titan Bird Trails and the passionate people who brought this vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => scrollToSection('about')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Bird className="mr-3 h-6 w-6 animate-pulse" />
                Learn More
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

      {/* About Section */}
      <section id="about" className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* About Our Project */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-block p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-6">
                <Bird className="h-8 w-8 text-green-600 animate-bounce" />
              </div>
              <h2 className="text-5xl sm:text-6xl font-extralight text-gray-800 mb-6 tracking-tighter bg-gradient-to-r from-gray-800 via-green-700 to-blue-700 bg-clip-text text-transparent">
                About Our Project
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
              <h3 className="text-3xl font-light text-gray-800 mb-6 text-center">Analog Birding</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In an algorithmic world where we can chat with artificial hummingbirds and bird through audio recordings, analog birding remains an important environmental process and practice. While using this application as an entry into the meaningful and fulfilling world of birding, we encourage you to think about this application in tandem with the embodied experience of birding, whether by sight, sound, or otherwise.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let this application serve as a reminder that birds thrive with us, even in a landlocked urban campus surrounded by freeways. Take a moment to sit and experience the birds of Cal State Fullerton, with or without the application, and be sure to reflect in ways that speak to you.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Professor Section */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                  <Bird className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-3xl font-light text-gray-800 mb-2">Project Supervisor</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>
              
              <h4 className="text-2xl font-medium text-gray-800 mb-4">Dr. Sarah G. Grant</h4>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Associate Professor of Anthropology and Environmental Studies at Cal State Fullerton. She is currently researching the multispecies relations between birds and birding communities in urban spaces. Her research illuminates how our human entanglements with the environment, neoliberalism, and non-human cohabitants can reveal an environmental justice framework to mitigate and live with climate change.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                She is an avid amateur birder and especially loves birding along the Los Angeles River. Dr. Grant proposed this idea and guided throughout the project development.
              </p>
              
              <Button 
                onClick={() => window.open('https://sarahggrant.com/', '_blank')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Visit Dr. Grant's Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Developer Section */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4">
                  <Bird className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-light text-gray-800 mb-2">Website Creator</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
              </div>
              
              <h4 className="text-2xl font-medium text-gray-800 mb-4">Mohit Patni</h4>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Creator of this website, currently pursuing Masters in Computer Science at California State University Fullerton. From very early in my career, I have always been involved in research, especially in the field of Computer Science, with experience from more than 4 research internships.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Working with Dr. Grant has been a very unique opportunity to work on an interdisciplinary project and implement my computer science skills. This website was created under research work as an EG-RSCA research scholar program.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                I am very excited to see my fellow friends at Cal State Fullerton use this website and get to know the campus birds!
              </p>
              
              <Button 
                onClick={() => window.open('https://www.linkedin.com/in/mohitpatni1/', '_blank')}
                className="w-full bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Connect on LinkedIn
                <ExternalLink className="ml-2 h-4 w-4" />
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
            Developed under EG-RSCA Research Scholar Program. <br />
            <span className="text-blue-600 font-medium">Happy Birding!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs; 