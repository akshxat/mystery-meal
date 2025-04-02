import { Client } from "@googlemaps/google-maps-services-js";

// Initialize the client
const client = new Client({});

// Function to get nearby places
export const getNearbyPlaces = async (
  location: { lat: string; lng: string },
  radius: number,
  type?: string,
) => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing Google Maps API Key");
  }

  try {
    const response = await client.placesNearby({
      params: {
        location: `${location.lat},${location.lng}`, // Convert to "lat,lng"
        radius: Math.max(1, Math.min(50000, radius)), // Ensure valid radius
        type: type || "restaurant", // Default type if missing
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 3000,
    });

    return response.data.results; // Return only results
  } catch (error: any) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message,
    );
    return { error: "Failed to fetch nearby places", details: error.message };
  }
};
