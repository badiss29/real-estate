import { Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={property.images[0]}
            alt={property.title}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge
              className={`text-xs font-medium shadow-lg ${
                property.status === 'For Sale'
                  ? 'bg-emerald-500/90 hover:bg-emerald-500 text-white border-0'
                  : 'bg-blue-500/90 hover:bg-blue-500 text-white border-0'
              }`}
            >
              {property.status}
            </Badge>
            {property.isFeatured && (
              <Badge className="text-xs font-medium bg-amber-500/90 hover:bg-amber-500 text-white border-0 shadow-lg">
                Featured
              </Badge>
            )}
          </div>

          {/* Like button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg"
          >
            <Heart
              className={`h-4 w-4 transition-all duration-200 ${
                isLiked
                  ? 'fill-red-500 text-red-500 scale-110'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Price on image */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xl font-bold text-white drop-shadow-lg">
              {formatPrice(property.price)}
            </span>
            {property.status === 'For Rent' && (
              <span className="text-white/80 text-sm ml-1">/month</span>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-base line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300">
                {property.title}
              </h3>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                <span className="line-clamp-1">{property.address}</span>
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Bed className="h-4 w-4 text-emerald-500/70" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Bath className="h-4 w-4 text-emerald-500/70" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Maximize className="h-4 w-4 text-emerald-500/70" />
                <span>{property.area.toLocaleString()} ft²</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
