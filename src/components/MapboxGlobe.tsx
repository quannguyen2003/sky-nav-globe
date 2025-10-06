import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const users = [
  { id: 1, coordinates: [100.9925, 15.8700], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
  { id: 2, coordinates: [101.5, 16.5], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
  { id: 3, coordinates: [102.0, 15.5], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
  { id: 4, coordinates: [100.0, 14.5], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
];

export const MapboxGlobe = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiamFzb25nMDMiLCJhIjoiY21nZGR2dnp0MW9lMTJycHl0bDgwb2M0dyJ9.ktCzP9_99FM9DqR-tbNvYg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [100, 20],
      zoom: 3,
      projection: 'globe' as any,
    });

    map.current.on('style.load', () => {
      if (!map.current) return;

      map.current.setFog({
        range: [-1, 2],
        'horizon-blend': 0.3,
        color: '#242B4B',
        'high-color': '#161B36',
        'space-color': '#0B1026',
        'star-intensity': 0.8,
      } as any);

      map.current.addSource('users', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: users.map(user => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: user.coordinates,
            },
            properties: {
              id: user.id,
            },
          })),
        },
      });

      map.current.addLayer({
        id: 'user-dots',
        type: 'circle',
        source: 'users',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FFFFFF',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        },
      });

      users.forEach(user => {
        const el = document.createElement('div');
        el.className = 'avatar-marker';
        el.style.cssText = `
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-image: url(${user.avatar});
          background-size: cover;
          background-position: center;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        `;
        el.id = `avatar-${user.id}`;

        new mapboxgl.Marker(el)
          .setLngLat(user.coordinates as [number, number])
          .addTo(map.current!);
      });

      function updateMarkers() {
        if (!map.current) return;
        const zoom = map.current.getZoom();
        
        if (zoom >= 4) {
          map.current.setLayoutProperty('user-dots', 'visibility', 'none');
          document.querySelectorAll('.avatar-marker').forEach(marker => {
            (marker as HTMLElement).style.opacity = '1';
          });
        } else {
          map.current.setLayoutProperty('user-dots', 'visibility', 'visible');
          document.querySelectorAll('.avatar-marker').forEach(marker => {
            (marker as HTMLElement).style.opacity = '0';
          });
        }
      }

      map.current.on('zoom', updateMarkers);
      updateMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return <div ref={mapContainer} className="absolute inset-0 w-full h-full" />;
};
