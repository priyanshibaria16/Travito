import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Destinations | Travito',
  description: 'Discover amazing travel destinations around the world with Travito.',
};

export default function ExplorePage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Explore Destinations</h1>
      <p className="text-lg text-muted-foreground">
        Find your next adventure with our curated selection of travel destinations.
      </p>
      {/* Add destination cards or other content here */}
    </div>
  );
}
