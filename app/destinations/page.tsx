import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Popular Destinations | Travito',
  description: 'Explore our most popular travel destinations and plan your next trip.',
};

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    description: 'The city of love and lights, known for its art, fashion, and culture.',
    image: '/destinations/paris.jpg',
    rating: 4.8,
    price: 1200,
  },
  {
    id: 2,
    name: 'Kyoto, Japan',
    description: 'Experience traditional Japanese culture with stunning temples and cherry blossoms.',
    image: '/destinations/kyoto.jpg',
    rating: 4.9,
    price: 1800,
  },
  {
    id: 3,
    name: 'Santorini, Greece',
    description: 'White-washed buildings with blue domes overlooking the Aegean Sea.',
    image: '/destinations/santorini.jpg',
    rating: 4.7,
    price: 1500,
  },
  {
    id: 4,
    name: 'New York, USA',
    description: 'The city that never sleeps, full of iconic landmarks and vibrant culture.',
    image: '/destinations/newyork.jpg',
    rating: 4.6,
    price: 1400,
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with lush jungles, beaches, and rich culture.',
    image: '/destinations/bali.jpg',
    rating: 4.9,
    price: 1300,
  },
  {
    id: 6,
    name: 'Cape Town, South Africa',
    description: 'Stunning landscapes, wildlife, and beautiful beaches at the southern tip of Africa.',
    image: '/destinations/capetown.jpg',
    rating: 4.8,
    price: 1600,
  },
];

export default function DestinationsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Popular Destinations</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the most sought-after travel destinations around the world and start planning your next adventure.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-card border">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'fill-current' : 'fill-none'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-300">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-300 line-through">${destination.price + 200}</span>
                    <p className="text-xl font-bold text-white">${destination.price}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">{destination.description}</p>
              <Button asChild className="w-full">
                <Link href={`/tours?destination=${encodeURIComponent(destination.name)}`}>
                  View Tours
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Can't find your dream destination?</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          We have many more amazing places to explore. Contact us for custom travel packages.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
          <Link href="/contact">Contact Our Travel Experts</Link>
        </Button>
      </div>
    </div>
  );
}
