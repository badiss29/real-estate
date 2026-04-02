import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { properties, cities, propertyTypes, statusOptions } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Search,
  SlidersHorizontal,
  X,
  Building2,
  LayoutGrid,
  List,
} from 'lucide-react';

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000]);
  const [roomRange, setRoomRange] = useState<number[]>([1, 8]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // City filter
      if (selectedCity !== 'All Cities' && property.city !== selectedCity) return false;

      // Type filter
      if (selectedType !== 'All Types' && property.type !== selectedType) return false;

      // Status filter
      if (selectedStatus !== 'All Status' && property.status !== selectedStatus) return false;

      // Price filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) return false;

      // Room filter
      if (property.bedrooms < roomRange[0] || property.bedrooms > roomRange[1]) return false;

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCity, selectedType, selectedStatus, priceRange, roomRange, sortBy]);

  const activeFiltersCount = [
    selectedCity !== 'All Cities',
    selectedType !== 'All Types',
    selectedStatus !== 'All Status',
    priceRange[0] !== 0 || priceRange[1] !== 10000000,
    roomRange[0] !== 1 || roomRange[1] !== 8,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('All Cities');
    setSelectedType('All Types');
    setSelectedStatus('All Status');
    setPriceRange([0, 10000000]);
    setRoomRange([1, 8]);
    setSearchParams({});
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Building2 className="h-3.5 w-3.5" />
              Property Listings
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Explore Our Properties
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Browse through our exclusive collection of properties and find your perfect match.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-3 shadow-xl">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="search-properties"
                  placeholder="Search by city, property name, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent h-11 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchParams({});
                    }}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'default' : 'outline'}
                className={`relative ${
                  showFilters
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'border-border/50'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl animate-in slide-in-from-top-2 fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">City</label>
                    <Select value={selectedCity} onValueChange={(v) => v && setSelectedCity(v)}>
                      <SelectTrigger className="h-11 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Property Type
                    </label>
                    <Select value={selectedType} onValueChange={(v) => v && setSelectedType(v)}>
                      <SelectTrigger className="h-11 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Select value={selectedStatus} onValueChange={(v) => v && setSelectedStatus(v)}>
                      <SelectTrigger className="h-11 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-border/50">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-muted-foreground">
                        Price Range
                      </label>
                      <span className="text-sm font-medium text-emerald-600">
                        {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={10000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={(v) => setPriceRange(Array.isArray(v) ? v : [v])}
                      className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-emerald-500"
                    />
                  </div>

                  {/* Room Range */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-muted-foreground">
                        Bedrooms
                      </label>
                      <span className="text-sm font-medium text-emerald-600">
                        {roomRange[0]} – {roomRange[1]} rooms
                      </span>
                    </div>
                    <Slider
                      min={1}
                      max={8}
                      step={1}
                      value={roomRange}
                      onValueChange={(v) => setRoomRange(Array.isArray(v) ? v : [v])}
                      className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-emerald-500"
                    />
                  </div>
                </div>

                {/* Clear */}
                {activeFiltersCount > 0 && (
                  <div className="mt-6 pt-4 border-t border-border/50 flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          {/* Results header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">
                  {filteredProperties.length}
                </span>{' '}
                {filteredProperties.length === 1 ? 'property' : 'properties'}
              </p>
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCity !== 'All Cities' && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-destructive/10"
                      onClick={() => setSelectedCity('All Cities')}
                    >
                      {selectedCity}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {selectedType !== 'All Types' && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-destructive/10"
                      onClick={() => setSelectedType('All Types')}
                    >
                      {selectedType}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {selectedStatus !== 'All Status' && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-destructive/10"
                      onClick={() => setSelectedStatus('All Status')}
                    >
                      {selectedStatus}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(v) => v && setSortBy(v)}>
                <SelectTrigger className="w-44 h-9 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border border-border/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties grid */}
          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'grid grid-cols-1 gap-4'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any properties matching your criteria. Try adjusting your
                filters or search query.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
