"use client";

import { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTheme } from 'next-themes';
import { GEOAPIFY_API_KEY } from '@/lib/config';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  latitude: number;
  longitude: number;
}

export function MapView({ latitude, longitude }: MapViewProps) {
  const { resolvedTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState('');

  useEffect(() => {
    // Wait for the theme to be resolved before setting the map style
    if (resolvedTheme) {
      const style = resolvedTheme === 'dark' ? 'dark-matter' : 'positron';
      setMapStyle(`https://maps.geoapify.com/v1/styles/${style}/style.json?apiKey=${GEOAPIFY_API_KEY}`);
    }
  }, [resolvedTheme]);

  // Render a placeholder or nothing until the map style is determined
  if (!mapStyle) {
    return <div className="w-full h-96 rounded-lg bg-muted animate-pulse" />;
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden relative shadow-inner border-2 border-primary/20">
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 13,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        attributionControl={false}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <MapPin className="h-10 w-10 text-accent drop-shadow-lg" fill="hsl(var(--accent-foreground))" />
        </Marker>
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}
