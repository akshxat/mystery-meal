"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function MealFinder() {
  const { pending, data } = useFormStatus();
  const [distanceValue, setDistanceValue] = useState(25);
  const [priceValue, setPriceValue] = useState(50);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const isMounted = useRef(true);

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
        }
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
      cuisine: Array.from(event.target.elements)
        .filter(
          (element: any) =>
            (element as HTMLInputElement).type === "checkbox" &&
            (element as HTMLInputElement).checked,
        )
        .map((element) =>
          (element as HTMLInputElement).id.replace("cuisine-", ""),
        ),
    };
    console.log("Form Data:", formData);

    try {
      const response = await fetch(
        `/api/nearby?lat=${44.6509}&lng=${-63.5923}&radius=${20000}&type=${'restaurant'}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch places");

      const data = await response.json();
      console.log("Data:", data);
      
      if (isMounted.current) {
        setPlaces(data);
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
    <div className="mx-auto mt-12 max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 rounded-md bg-gray-50 p-6 shadow-md"
      >
        <div className="flex flex-col">
          <label
            htmlFor="distance"
            className="mb-2 font-semibold text-gray-700"
          >
            Distance: {distanceValue} Kilometers
          </label>
          <input
            type="range"
            id="distance"
            min="0"
            max="25"
            value={distanceValue}
            onChange={(e) => setDistanceValue(Number(e.target.value))}
            disabled={pending}
            className="w-full"
          />
          <br></br>
          <label htmlFor="price" className="mb-2 font-semibold text-gray-700">
            Price: ${priceValue}/person
          </label>
          <input
            type="range"
            id="price"
            min="0"
            max="100"
            value={priceValue}
            onChange={(e) => setPriceValue(Number(e.target.value))}
            disabled={pending}
            className="w-full"
          />
          <div className="mt-4">
            <label
              htmlFor="cuisine"
              className="mb-2 font-semibold text-gray-700"
            >
              Cuisine:
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cuisine-italian"
                  disabled={pending}
                  className="h-4 w-4 cursor-pointer rounded bg-gray-300 accent-blue-600"
                />
                <label htmlFor="cuisine-italian" className="ml-1 text-gray-700">
                  Italian
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cuisine-japanese"
                  disabled={pending}
                  className="h-4 w-4 cursor-pointer rounded bg-gray-300 accent-blue-600"
                />
                <label
                  htmlFor="cuisine-japanese"
                  className="ml-1 text-gray-700"
                >
                  Japanese
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cuisine-indian"
                  disabled={pending}
                  className="h-4 w-4 cursor-pointer rounded bg-gray-300 accent-blue-600"
                />
                <label htmlFor="cuisine-indian" className="ml-1 text-gray-700">
                  Indian
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cuisine-mediterranean"
                  disabled={pending}
                  className="h-4 w-4 cursor-pointer rounded bg-gray-300 accent-blue-600"
                />
                <label
                  htmlFor="cuisine-mediterranean"
                  className="ml-1 text-gray-700"
                >
                  Mediterranean
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Go!
        </button>
      </form>
    </div>
  );
}
