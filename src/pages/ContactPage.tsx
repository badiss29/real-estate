import { ContactForm } from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Building2 className="h-3.5 w-3.5" />
            Get In Touch
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a question about a property or want to schedule a viewing? Our team is here to
            help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="text-muted-foreground">
                Reach out to our experienced team for personalized real estate assistance.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    title: 'Visit Our Office',
                    details: ['123 Luxury Ave, Suite 500', 'Miami, FL 33101'],
                  },
                  {
                    icon: Phone,
                    title: 'Call Us',
                    details: ['+1 (800) 555-LUXE', '+1 (305) 555-0100'],
                  },
                  {
                    icon: Mail,
                    title: 'Email Us',
                    details: ['info@luxeestates.com', 'support@luxeestates.com'],
                  },
                  {
                    icon: Clock,
                    title: 'Working Hours',
                    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: 10:00 AM - 4:00 PM'],
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/50">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57336.17390834065!2d-80.19432968408!3d25.79090950128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                  className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below and one of our agents will get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
