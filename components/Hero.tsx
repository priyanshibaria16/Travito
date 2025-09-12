'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SearchForm } from './SearchForm';
import { ArrowRight, MapPin, Calendar, Users, Play } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring' as const,
      stiffness: 100 
    }
  },
} as const;

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0"></div>
        
        {/* Floating circles */}
        <motion.div 
          className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-36">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={item}
          >
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Discover Your Next
            </span>{' '}
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Adventure
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
            variants={item}
          >
            Find and book amazing travel experiences, hotels, and activities around the world. 
            Your perfect getaway is just a few clicks away.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={item}
          >
            <div 
              className="inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button 
                ref={buttonRef}
                size="lg" 
                className="group relative overflow-hidden px-8 py-6 text-lg font-semibold"
              >
                <span className="relative z-10 flex items-center">
                  Start Exploring
                  <motion.span 
                    className="ml-2 inline-block"
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              {isHovered && (
                <motion.span 
                  className="absolute inset-0 z-0 rounded-full bg-primary/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              )}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group relative overflow-hidden px-8 py-6 text-lg"
            >
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </span>
            </Button>
          </motion.div>

          {/* Search Form */}
          <motion.div 
            className="relative z-10 mx-auto mt-12 max-w-4xl rounded-2xl bg-background/80 p-6 shadow-2xl backdrop-blur-sm ring-1 ring-black/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchForm />
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: <MapPin className="h-6 w-6" />, 
                text: '10,000+ Destinations',
                delay: 0.1
              },
              { 
                icon: <Calendar className="h-6 w-6" />, 
                text: 'Flexible Booking',
                delay: 0.2
              },
              { 
                icon: <Users className="h-6 w-6" />, 
                text: 'Personalized Trips',
                delay: 0.3
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="group flex items-center justify-center gap-3 rounded-xl bg-muted/50 p-4 text-center transition-colors hover:bg-muted/80"
                variants={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ 
                  y: -5,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
