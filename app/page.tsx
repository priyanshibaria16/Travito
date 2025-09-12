import { getServerAuthSession } from "@/auth";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MapPin, Globe, Compass, Share2, Calendar, Users, Plane, Hotel, Utensils, Mountain } from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  const session = await getServerAuthSession();
  const isLoggedIn = !!session?.user;

  const features = [
    {
      icon: <MapPin className="w-10 h-10 text-primary" />,
      title: "Plan Your Route",
      description: "Create detailed travel itineraries with multiple destinations and activities.",
      color: "from-blue-500/10 to-blue-500/5"
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Discover Places",
      description: "Explore recommended destinations and points of interest around the world.",
      color: "from-green-500/10 to-green-500/5"
    },
    {
      icon: <Compass className="w-10 h-10 text-primary" />,
      title: "Navigate Easily",
      description: "Get turn-by-turn directions and travel times between locations.",
      color: "from-purple-500/10 to-purple-500/5"
    },
    {
      icon: <Share2 className="w-10 h-10 text-primary" />,
      title: "Share Plans",
      description: "Collaborate with friends and share your travel plans with ease.",
      color: "from-amber-500/10 to-amber-500/5"
    },
    {
      icon: <Calendar className="w-10 h-10 text-primary" />,
      title: "Stay Organized",
      description: "Keep track of your bookings, reservations, and important dates in one place.",
      color: "from-red-500/10 to-red-500/5"
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Group Planning",
      description: "Plan trips with friends and family, and vote on activities and destinations.",
      color: "from-emerald-500/10 to-emerald-500/5"
    }
  ];

  const popularDestinations = [
    {
      name: "Bali, Indonesia",
      image: "/bali.jpg",
      type: "Beach & Culture",
      icon: <Plane className="w-4 h-4" />
    },
    {
      name: "Kyoto, Japan",
      image: "/kyoto.jpg",
      type: "Culture & History",
      icon: <Hotel className="w-4 h-4" />
    },
    {
      name: "Santorini, Greece",
      image: "/santorini.jpg",
      type: "Romantic Getaway",
      icon: <Utensils className="w-4 h-4" />
    },
    {
      name: "Banff, Canada",
      image: "/banff.jpg",
      type: "Adventure & Nature",
      icon: <Mountain className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Plan Your Perfect Trip</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan, book, and enjoy your next adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`p-6 bg-gradient-to-br ${feature.color} hover:shadow-lg transition-shadow`}>
                <div className="mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover amazing places recommended by fellow travelers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end p-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{destination.name}</h3>
                      <div className="flex items-center text-sm text-white/80">
                        {destination.icon}
                        <span className="ml-1">{destination.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who plan their perfect trips with Travito
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isLoggedIn ? (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/dashboard" className="flex items-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/auth/signup" className="flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>
    </div>

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