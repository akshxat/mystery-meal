"use client";

import React, { useEffect, useState } from 'react';
import { getNearbyPlaces } from '../../utils/nearbyPlace';
import { Place } from '@googlemaps/google-maps-services-js';
import SectionTitle from "../Common/SectionTitle";

interface NearbyPlacesProps {
  location: { lat: number; lng: number };
  radius: number;
  type?: string;
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ location, radius, type }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const fetchedPlaces = await getNearbyPlaces(location, radius, type);
        setPlaces(fetchedPlaces);
      } catch (err) {
        setError('Failed to load places');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location, radius, type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Nearby Places</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyPlaces;