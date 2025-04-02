"use client";

import React, { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";

interface PlaceInfo {
  name: string;
  place_id: string;
}

interface NearbyPlacesProps {
  location: { lat: number; lng: number };
  radius: number;
  type?: string;
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ location, radius, type }) => {
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          `/api/nearby?lat=${location.lat}&lng=${location.lng}&radius=${radius}&type=${type}`
        );
        if (!response.ok) throw new Error("Failed to fetch places");

        const data = await response.json();
        if (isMounted) {
          setPlaces(data);
        }
      } catch (err) {
        console.error("Error fetching places:", err);
        setError(err instanceof Error ? err.message : "Failed to load places");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlaces();

    return () => {
      isMounted = false;
    };
  }, [location, radius, type]);

  if (loading) return <div>Loading nearby places...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SectionTitle title="Nearby Places" paragraph="Discover popular places near you." />
      {Array.isArray(places) && places.length > 0 ? (
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    ) : (
      <p>No places found.</p>
    )}
    </div>
  );
};

export default NearbyPlaces;