'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar as CalendarIcon, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SearchForm() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('');

  return (
    <form className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Where to?"
            className="h-14 pl-10 text-base"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="When?"
            className="h-14 pl-10 text-base"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
          />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <select
            aria-label="Number of travelers"
            className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          >
            <option value="">Travelers</option>
            <option value="1">1 Traveler</option>
            <option value="2">2 Travelers</option>
            <option value="3">3 Travelers</option>
            <option value="4">4 Travelers</option>
            <option value="5+">5+ Travelers</option>
          </select>
        </div>
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
      >
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </form>
  );
}
