"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { fetchResponse } from "../../utils/aiWebSearch";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import PreLoader from "@/components/Common/Loader";

export default function MealFinder() {
  const { pending, data } = useFormStatus();
  const [distanceValue, setDistanceValue] = useState(25);
  const [priceValue, setPriceValue] = useState(50);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mysteryFilter, setMysteryFilter] = useState("");
  const isMounted = useRef(true);
  const homeLocation = { lat: 44.669591, lng: -63.613833 };
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const [loading, setLoading] = useState<boolean>(false);

  // console.log("Session ID:", sessionId);
  // console.log("Premium:", session?.user);

  const isPremiumUser = () => {
    return session?.user?.isPremium ? true : false;
  };

  useEffect(() => {
    isMounted.current = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted.current) {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        (error) => {
          // console.error("Error getting location:", error);
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
    console.log("Form Data:", formData);

    try {
      const nearbyResponse = await fetch(
        `/api/nearby?lat=${location.lat}&lng=${location.lng}&radius=${formData.distance * 1000}&type=restaurant&maxprice=${formData.price}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!nearbyResponse.ok) throw new Error("Failed to fetch places");

      const nearbyResponseData = await nearbyResponse.json();
      console.log(
        "🚀 ~ handleSubmit ~ nearbyResponseData:",
        nearbyResponseData,
      );

      const transformedRestaurantsData = nearbyResponseData?.map(
        (place: any) => ({
          name: place.name,
          id: place.place_id,
        }),
      );

      // console.log("Transformed Restaurants Data:", transformedRestaurantsData);
      const isPremium =
        session?.user != null ? session?.user?.isPremium : false;

      if (isPremium) {
        // Wait for the AI web search response
        const webResponse = await fetch(`/api/ai-web-search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurantsData: transformedRestaurantsData,
            searchData: mysteryFilter,
            location: location,
          }),
        });

        const webData = await webResponse.json();

        if (!webResponse.ok) {
          throw new Error("Failed to fetch AI web search data");
          return;
        }

        if (webData.result.toLocaleLowerCase().includes("not found")) {
          // setError("No results found for the given search input.");
          toast.error("Please try again with a different search input.");
          return;
        }

        const aiRecommendedPlace = nearbyResponseData.find(
          (x: any) => x["place_id"] === webData["result"],
        );
        // console.log("🚀 ~ handleSubmit ~ aiRecommendedPlace:", aiRecommendedPlace)

        if (aiRecommendedPlace) {
          const googleMapsUrl = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${encodeURIComponent(aiRecommendedPlace.plus_code.compound_code)}`;
          window.open(googleMapsUrl, "_blank");
        } else {
          toast.error("No results found for the given search input.");
        }

        // console.log("webData:", webData);
      } else {
        // Non-premium user logic
        if (isMounted.current) {
          const randomPlace =
            nearbyResponseData[
              Math.floor(Math.random() * nearbyResponseData.length)
            ];

          if (randomPlace) {
            const xray1 = randomPlace.plus_code.compound_code.replace(
              "+",
              "%2B",
            );
            const xray = xray1.replace(/\s+/g, "");
            const googleMapsUrl = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${xray}`;
            //window.open(googleMapsUrl, "_blank");
          }
        }
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

  // Conditional form styling based on location availability
  const formClassName = !location
    ? "flex flex-col space-y-6 rounded-md bg-red-100 p-6 shadow-md border-2 border-red-500"
    : "flex flex-col space-y-6 rounded-md bg-gray-50 p-6 shadow-md";

  return (
    <>
      <div className="mx-auto mt-12 max-w-2xl">
        <form onSubmit={handleSubmit} className={formClassName}>
          <div className="flex flex-col">
            {/* <label htmlFor="Session ID" className="mb-2 font-semibold text-gray-700">
              Session ID: (Testing Only)
            </label>
            <input
              type="text"
              id="Session ID"
              value={sessionId ? sessionId : "No user signed in"}
              readOnly
              className="rounded border-gray-300 p-2 disabled:opacity-50"
              disabled={pending}
            />
            <br />
            <label htmlFor="Session ID" className="mb-2 font-semibold text-gray-700">
              Premium User: (Testing Only)
            </label>
            <input
              type="text"
              id="Premium User"
              value={isPremiumUser() ? "Yes" : "No"}
              readOnly
              className="rounded border-gray-300 p-2 disabled:opacity-50"
              disabled={pending}
            />
            <br /> */}
            <label
              htmlFor="location"
              className="mb-2 font-semibold text-gray-700"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={
                location
                  ? `${location.lat}, ${location.lng} ✅`
                  : "Please allow location access ❌"
              }
              readOnly
              className="rounded border-gray-300 p-2 disabled:opacity-50"
              disabled={pending}
            />
            <br />
            <label
              htmlFor="distance"
              className="mb-2 font-semibold text-gray-700"
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
              className="w-full"
            />
            <br />
            <label
              htmlFor="MysteryPlus+ Filter"
              className="mb-2 font-semibold text-gray-700"
            >
              ✨MysteryPlus+🔮 AI Filter✨:
            </label>
            <input
              type="text"
              id="MysteryPlus+ Filter"
              value={
                isPremiumUser()
                  ? mysteryFilter
                  : "Subscribe to MysteryPlus+ to use custom AI powered filters!"
              }
              onChange={(e) =>
                isPremiumUser() && setMysteryFilter(e.target.value)
              }
              className="rounded border-gray-300 p-2"
              disabled={!isPremiumUser()}
            />
            <br />
            <label htmlFor="price" className="mb-2 font-semibold text-gray-700">
              Price:
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setPriceValue(0)}
                disabled={pending}
                aria-pressed={priceValue === 0}
                className={`rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                  priceValue === 0 ? "bg-gray-200" : ""
                }`}
              >
                Any
              </button>
              <button
                type="button"
                onClick={() => setPriceValue(1)}
                disabled={pending}
                aria-pressed={priceValue === 1}
                className={`rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                  priceValue === 1 ? "bg-gray-200" : ""
                }`}
              >
                $
              </button>
              <button
                type="button"
                onClick={() => setPriceValue(2)}
                disabled={pending}
                aria-pressed={priceValue === 2}
                className={`rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                  priceValue === 2 ? "bg-gray-200" : ""
                }`}
              >
                $$
              </button>
              <button
                type="button"
                onClick={() => setPriceValue(3)}
                disabled={pending}
                aria-pressed={priceValue === 3}
                className={`rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                  priceValue === 3 ? "bg-gray-200" : ""
                }`}
              >
                $$$
              </button>
              <button
                type="button"
                onClick={() => setPriceValue(4)}
                disabled={pending}
                aria-pressed={priceValue === 4}
                className={`rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 ${
                  priceValue === 4 ? "bg-gray-200" : ""
                }`}
              >
                $$$$
              </button>
            </div>
          </div>

          {loading ? (
            <div className="mt-4 flex items-center justify-center">
              <span
                className={`h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-700 border-t-transparent`}
              ></span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!location}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Go!
            </button>
          )}
        </form>
      </div>
    </>
  );
}
