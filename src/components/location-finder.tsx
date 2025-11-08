"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, LoaderCircle, Globe, MapPin, Copy } from "lucide-react";
import { GEOAPIFY_API_KEY } from "@/lib/config";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapView } from "@/components/map";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Location {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
  };
}

const defaultLocation: Location = {
  name: "New York, NY, United States of America",
  country: "United States of America",
  state: "New York",
  lat: 40.7128,
  lon: -74.006,
};

export function LocationFinder() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>(defaultLocation);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = useCallback(async () => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      query
    )}&apiKey=${GEOAPIFY_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce API calls

    return () => {
      clearTimeout(handler);
    };
  }, [query, fetchSuggestions]);

  const handleSelect = (feature: GeoapifyFeature) => {
    const { properties } = feature;
    setSelectedLocation({
      name: properties.formatted,
      country: properties.country,
      state: properties.state,
      lat: properties.lat,
      lon: properties.lon,
    });
    setQuery(properties.formatted);
    setSuggestions([]);
    setShowSuggestions(false);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: text,
      className: "bg-accent text-accent-foreground",
    });
  };


  const LocationDetail = ({ icon: Icon, label, value, onCopy }: { icon: React.ElementType, label: string, value?: string, onCopy?: (value: string) => void }) => {
    if (!value) return null;
    return (
      <div className="flex items-center gap-3 text-sm p-3 bg-secondary rounded-lg">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{label}:</span>
        <span className="text-muted-foreground flex-1 truncate">{value}</span>
        {onCopy && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onCopy(value)}>
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Location Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for any city..."
            className="pl-10 text-base h-12 rounded-lg"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {loading && (
            <LoaderCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto animate-in fade-in-0">
              <ul>
                {suggestions.map((feature, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm transition-colors"
                    onMouseDown={() => handleSelect(feature)}
                  >
                    {feature.properties.formatted}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {selectedLocation && (
          <div className="space-y-4 pt-4 animate-in fade-in-0 duration-500">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <LocationDetail icon={MapPin} label="Latitude" value={selectedLocation.lat.toFixed(6)} onCopy={handleCopy} />
                <LocationDetail icon={MapPin} label="Longitude" value={selectedLocation.lon.toFixed(6)} onCopy={handleCopy} />
                <LocationDetail icon={Globe} label="Country" value={selectedLocation.country} />
                {selectedLocation.state && <LocationDetail icon={Globe} label="State" value={selectedLocation.state} />}
            </div>
            <div className="pt-4">
              <MapView
                key={`${selectedLocation.lat}-${selectedLocation.lon}`}
                latitude={selectedLocation.lat}
                longitude={selectedLocation.lon}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
