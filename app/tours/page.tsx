import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guided Tours | Travito',
  description: 'Book amazing guided tours for your next adventure with Travito.',
};

export default function ToursPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Guided Tours</h1>
      <p className="text-lg text-muted-foreground">
        Explore our selection of guided tours and experiences around the world.
      </p>
      {/* Add tour cards or other content here */}
    </div>
  );
}
