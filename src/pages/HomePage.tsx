import { Link } from 'react-router-dom';
import { asset } from '@/lib/assets';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  ArrowRight,
  Building2,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Star,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
  };

  const stats = [
    { icon: Building2, value: '2,500+', label: 'Properties Listed' },
    { icon: Users, value: '1,200+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '$2.5B', label: 'Total Sales' },
  ];

  const popularCities = [
    { name: 'Miami', count: 45, image: asset('images/property-5.png') },
    { name: 'New York', count: 82, image: asset('images/property-2.png') },
    { name: 'Los Angeles', count: 63, image: asset('images/property-4.png') },
    { name: 'Austin', count: 31, image: asset('images/property-3.png') },
    { name: 'Denver', count: 28, image: asset('images/property-1.png') },
    { name: 'Chicago', count: 54, image: asset('images/property-6.png') },
    { name: 'Nashville', count: 22, image: asset('images/property-3.png') },
    { name: 'San Francisco', count: 47, image: asset('images/property-4.png') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={asset('images/hero-bg.png')}
            alt="Beautiful neighborhood"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium">Premier Real Estate Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 leading-[1.1]">
            Find Your
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {' '}
              Dream Home
            </span>
            <br />
            <span className="text-white/90">in Perfect Locations</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            Discover exceptional properties in the most coveted neighborhoods.
            From luxury villas to modern apartments, your perfect home awaits.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl shadow-black/20 hover:bg-white/15 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-500/40">
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search className="h-5 w-5 text-white/50" />
                <Input
                  id="hero-search"
                  placeholder="Search by city, neighborhood, or property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-white placeholder:text-white/40 h-12 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Quick search tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 animate-in fade-in duration-700 delay-700">
            <span className="text-sm text-white/40">Popular:</span>
            {['Miami', 'New York', 'Los Angeles', 'Austin', 'Denver', 'Chicago'].map((city) => (
              <button
                key={city}
                onClick={() => navigate(`/properties?search=${city}`)}
                className="text-sm px-4 py-1.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200 border border-white/10"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 mb-3">
                  <stat.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="h-3.5 w-3.5" />
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Handpicked Premium Properties
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our curated selection of the finest properties, personally vetted by our
              expert agents for exceptional quality and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties">
              <Button
                variant="outline"
                size="lg"
                className="group border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/5 hover:border-emerald-500/50"
              >
                View All Properties
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <MapPin className="h-3.5 w-3.5" />
              Top Locations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Explore Popular Cities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Browse properties in the most sought-after cities across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city) => (
              <Link
                key={city.name}
                to={`/properties?search=${city.name}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                  <p className="text-white/70 text-sm">{city.count} properties available</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Shield className="h-3.5 w-3.5" />
              Why LuxeEstates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We combine years of expertise with cutting-edge technology to deliver an
              unmatched real estate experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trusted & Verified',
                description:
                  'Every property is thoroughly vetted and verified by our team of expert agents, ensuring quality and authentication.',
              },
              {
                icon: Users,
                title: 'Expert Guidance',
                description:
                  'Our seasoned agents provide personalized guidance through every step of your property journey, from search to closing.',
              },
              {
                icon: Award,
                title: 'Premium Selection',
                description:
                  'Access an exclusive portfolio of premium properties in the most desirable locations across the nation.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={asset('images/property-1.png')}
              alt="Luxury property"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-900/80" />
            <div className="relative py-20 px-8 md:px-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Let our expert agents help you discover the perfect property. Schedule a
                consultation today and take the first step towards your new home.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/properties">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-800 hover:bg-white/90 shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Browse Properties
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                  >
                    Contact an Agent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
