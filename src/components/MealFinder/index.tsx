"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { fetchResponse } from "../../utils/aiWebSearch";

export default function MealFinder() {
  const { pending, data } = useFormStatus();
  const [distanceValue, setDistanceValue] = useState(25);
  const [priceValue, setPriceValue] = useState(50);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const isMounted = useRef(true);
  const homeLocation = { lat: 44.669591, lng: -63.613833 };

  useEffect(() => {
    isMounted.current = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted.current) {
            console.log("Location:", location);
          }
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          if (isMounted.current) {
            setError("Failed to get location");
          }
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      distance: distanceValue,
      price: priceValue,
    };

    try {
      const nearbyResponse = await fetch(
        `/api/nearby?lat=${homeLocation.lat}&lng=${homeLocation.lng}&radius=${formData.distance * 1000}&type=restaurant&maxprice=${formData.price}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!nearbyResponse.ok) throw new Error("Failed to fetch places");

      const nearbyResponseData = await nearbyResponse.json();

      const randomPlace = nearbyResponseData[Math.floor(Math.random() * nearbyResponseData.length)];

      if (randomPlace) {
        const xray1 = randomPlace.plus_code.compound_code.replace("+", "%2B");
        const xray = xray1.replace(/\s+/g, "");
        const googleMapsUrl = `https://www.google.com/maps/dir/${homeLocation.lat},${homeLocation.lng}/${xray}`;
        window.open(googleMapsUrl, "_blank");
      }

      if (isMounted.current) {
        setPlaces(nearbyResponseData);
      }
    } catch (err) {
      console.error("Error fetching places:", err);
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : "Failed to load places");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-2xl px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-8 rounded-md bg-gray-100 p-6 shadow-md dark:bg-gray-900"
      >
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="distance"
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Distance: {distanceValue} Kilometers
          </label>
          <input
            type="range"
            id="distance"
            min="1"
            max="25"
            value={distanceValue}
            onChange={(e) => setDistanceValue(Number(e.target.value))}
            disabled={pending}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="price"
            className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Price
          </label>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setPriceValue(val)}
                disabled={pending}
                aria-pressed={priceValue === val}
                className={`px-4 py-2 border rounded transition-colors ${
                  priceValue === val
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white dark:bg-gray-800 dark:text-white border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {val === 0 ? "Any" : "$".repeat(val)}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {loading ? "Searching..." : "Go!"}
        </button>

        {error && (
          <div className="mt-2 rounded bg-red-100 px-4 py-2 text-red-700 dark:bg-red-900 dark:text-red-300">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
