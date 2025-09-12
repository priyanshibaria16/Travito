import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Travito',
  description: 'Learn more about Travito and our mission to make travel planning easy and enjoyable.',
};

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About Travito</h1>
      <div className="prose max-w-3xl text-muted-foreground">
        <p className="text-lg mb-4">
          Welcome to Travito, your ultimate travel companion for discovering and planning your next adventure.
        </p>
        <p className="mb-4">
          At Travito, we believe that travel should be accessible, enjoyable, and memorable for everyone. 
          Our platform helps you discover amazing destinations, find the best tours, and plan your trips with ease.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          To make travel planning simple, fun, and stress-free, so you can focus on creating unforgettable memories.
        </p>
      </div>
    </div>
  );
}
