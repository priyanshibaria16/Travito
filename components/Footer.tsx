import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-md">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Travito
              </span>
            </Link>
            <p className="text-muted-foreground">
              Your ultimate travel companion for discovering amazing destinations around the world.
            </p>
            <Button className="bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 transition-all duration-300 shadow-lg hover:shadow-primary/30">
              Watch Now
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="/tours" className="text-muted-foreground hover:text-primary transition-colors">Tours</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest travel updates and offers.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Travito. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
