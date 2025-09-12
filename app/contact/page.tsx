import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const metadata: Metadata = {
  title: 'Contact Us | Travito',
  description: 'Get in touch with the Travito team for any questions or feedback.',
};

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have questions or feedback? We'd love to hear from you!
        </p>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="How can we help?" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="Your message here..." rows={5} required />
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full md:w-auto">
                Send Message
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground">hello@travito.com</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <p className="text-muted-foreground">123 Travel St, Adventure City, 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
