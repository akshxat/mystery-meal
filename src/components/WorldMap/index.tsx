'use client';

import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Location {
  city: string;
  lat: number;
  lng: number;
}

const WorldMap = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  
  useEffect(() => {
    const fetchLocations = async () => {
      const data = [
        { city: 'New York', lat: 40.7128, lng: -74.006 },
        { city: 'London', lat: 51.5074, lng: -0.1278 }
      ];
      setLocations(data);
    };
  
    fetchLocations();
  }, []);
  
  

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Global User Access
      </h2>
      <div className="h-[400px] overflow-hidden">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 160 }}
          width={800}
          height={400}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: '#E0E0E0',
                      stroke: '#FFFFFF',
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: '#B0B0B0',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#A0A0A0',
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((loc) => (
            <Marker key={loc.city} coordinates={[loc.lng, loc.lat]}>
              <circle r={6} fill="#000080" stroke="#fff" strokeWidth={1.5} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: 'system-ui', fill: '#333', fontSize: '10px' }}
              >
                {loc.city}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </section>
  );
};

export default WorldMap;
