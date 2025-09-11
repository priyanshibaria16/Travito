import React from "react";
import { MapPin, Globe, Compass, Share2, Calendar, Users } from "lucide-react";
import { getServerAuthSession } from "@/auth";
import AuthButton from "@/components/auth-button";

export default async function LandingPage() {
  const session = await getServerAuthSession();
  const isLoggedIn = !!session?.user;

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Plan Your Route",
      description: "Create detailed travel itineraries with multiple destinations and activities."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Discover Places",
      description: "Explore recommended destinations and points of interest around the world."
    },
    {
      icon: <Compass className="w-8 h-8 text-purple-600" />,
      title: "Navigate Easily",
      description: "Get turn-by-turn directions and travel times between locations."
    },
    {
      icon: <Share2 className="w-8 h-8 text-amber-600" />,
      title: "Share Plans",
      description: "Collaborate with friends and share your travel plans with ease."
    },
    {
      icon: <Calendar className="w-8 h-8 text-rose-600" />,
      title: "Stay Organized",
      description: "Keep track of your travel dates, bookings, and important details."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Travel Together",
      description: "Coordinate group trips and manage shared expenses."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Plan Your Perfect <span className="text-yellow-300">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Create, organize, and share your travel itineraries all in one place. 
              Make every trip memorable with our intuitive travel planning tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AuthButton
                isLoggedIn={isLoggedIn}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoggedIn ? (
                  "Go to Dashboard"
                ) : (
                  <span className="flex items-center">
                    <span>Get Started for Free</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </AuthButton>
              {!isLoggedIn && (
                <button className="px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-colors duration-200">
                  Watch Demo
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need for Perfect Trips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to plan and organize your travels effortlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust us to make their trips unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthButton
              isLoggedIn={isLoggedIn}
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started for Free'}
            </AuthButton>
            {!isLoggedIn && (
              <button className="w-full sm:w-auto bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200">
                Learn More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Travito</h3>
              <p className="max-w-xs">Making travel planning simple and enjoyable for everyone.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Travito. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}