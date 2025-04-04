"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function MealFinder() {
    const { pending, data } = useFormStatus();
    const [distanceValue, setDistanceValue] = useState(25);
    const [priceValue, setPriceValue] = useState();
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
        console.log("Form Data:", formData);

        try {
            const response = await fetch(
                `/api/nearby?lat=${homeLocation.lat}&lng=${homeLocation.lng}&radius=${formData.distance * 1000}&type=${"restaurant"}&maxprice=${formData.price}`,
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

                const randomPlace = data[Math.floor(Math.random() * data.length)];

                if (randomPlace) {
                    // Construct the Google Maps URL
                    // const googleMapsUrl = `https://www.google.com/maps/dir/${homeLocation.lat},${homeLocation.lng}/${randomPlace.geometry.location.lat},${randomPlace.geometry.location.lng}`;
                    var xray1 = randomPlace.plus_code.compound_code.replace("+", "%2B");
                    console.log("🚀 ~ handleSubmit ~ xray1:", xray1)
                    var xray = xray1.replace(/\s+/g, "");
                    console.log("🚀 ~ handleSubmit ~ xray:", xray)
                    console.log("🚀 ~ handleSubmit ~ randomPlace.plus_code.compound_code:", randomPlace.plus_code.compound_code)
                    const googleMapsUrl = `https://www.google.com/maps/dir/${homeLocation.lat},${homeLocation.lng}/${xray}`;

                    console.log("🚀 ~ handleSubmit ~ googleMapsUrl:", googleMapsUrl)
                    // Open the URL in a new tab
                    window.open(googleMapsUrl, "_blank");
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

    return (
        <>
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
                        <label htmlFor="price" className="mb-2 text-gray-700 font-semibold">Price:</label>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => setPriceValue(1)}
                                disabled={pending}
                                aria-pressed={priceValue === 1}
                                className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${priceValue === 1 ? 'bg-gray-200' : ''
                                    }`}
                            >
                                $
                            </button>
                            <button
                                type="button"
                                onClick={() => setPriceValue(2)}
                                disabled={pending}
                                aria-pressed={priceValue === 2}
                                className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${priceValue === 2 ? 'bg-gray-200' : ''
                                    }`}
                            >
                                $$
                            </button>
                            <button
                                type="button"
                                onClick={() => setPriceValue(3)}
                                disabled={pending}
                                aria-pressed={priceValue === 3}
                                className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${priceValue === 3 ? 'bg-gray-200' : ''
                                    }`}
                            >
                                $$$
                            </button>
                            <button
                                type="button"
                                onClick={() => setPriceValue(4)}
                                disabled={pending}
                                aria-pressed={priceValue === 4}
                                className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 ${priceValue === 4 ? 'bg-gray-200' : ''
                                    }`}
                            >
                                $$$$
                            </button>
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
        </>
    );
}
