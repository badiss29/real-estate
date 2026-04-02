import { useParams, Link } from 'react-router-dom';
import { properties } from '@/data/properties';
import { ImageGallery } from '@/components/ImageGallery';
import { ContactForm } from '@/components/ContactForm';
import { PropertyCard } from '@/components/PropertyCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Home,
  ArrowLeft,
  Share2,
  Heart,
  Phone,
  Mail,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { useState } from 'react';

export function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  const [isLiked, setIsLiked] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Property Not Found</h1>
          <p className="text-muted-foreground">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/properties">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/properties" className="hover:text-foreground transition-colors">
                Properties
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {property.title}
              </span>
            </div>
            <Link to="/properties">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <ImageGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-xs ${
                        property.status === 'For Sale'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }`}
                    >
                      {property.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                    {property.isFeatured && (
                      <Badge className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {property.title}
                  </h1>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-emerald-500" />
                    {property.address}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {formatPrice(property.price)}
                </span>
                {property.status === 'For Rent' && (
                  <span className="text-muted-foreground text-lg ml-1">/month</span>
                )}
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                { icon: Maximize, label: 'Area', value: `${property.area.toLocaleString()} ft²` },
                { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-muted/30 border border-border/50 rounded-xl p-4 text-center hover:border-emerald-500/30 transition-colors"
                >
                  <stat.icon className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-emerald-500" />
                About This Property
              </h2>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {property.description}
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Property Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 border border-border/50 rounded-lg px-4 py-3 hover:border-emerald-500/30 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Interested in This Property?</h2>
              <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8">
                <ContactForm propertyTitle={property.title} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                Listed By
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="h-14 w-14 rounded-full bg-muted border-2 border-emerald-500/20"
                />
                <div>
                  <h4 className="font-semibold">{property.agent.name}</h4>
                  <p className="text-sm text-muted-foreground">Senior Real Estate Agent</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                  {property.agent.email}
                </a>
              </div>

              <div className="flex gap-3 mb-6">
                <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1 border-emerald-500/30">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>

              <Separator className="mb-6" />

              <h3 className="font-semibold mb-2">Schedule a Viewing</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a private tour of this property with one of our agents.
              </p>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                Book a Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-20">
            <Separator className="mb-12" />
            <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
