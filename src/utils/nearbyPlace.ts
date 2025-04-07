import { Client } from "@googlemaps/google-maps-services-js";

// Initialize the client
const client = new Client({});

// Function to get nearby places
export const getNearbyPlaces = async (
  _location: { lat: string; lng: string },
  _radius: number,
  _type?: string,
  _maxPrice?: number,
) => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing Google Maps API Key");
  }

  try {
    console.log("key", process.env.GOOGLE_MAPS_API_KEY);
    
    const params: any = {
      location: `${_location.lat},${_location.lng}`, 
      radius: Math.max(1, Math.min(50000, _radius)), 
      type: _type || "restaurant", 
      key: process.env.GOOGLE_MAPS_API_KEY,
    };

    if (_maxPrice && _maxPrice > 0) {
      params.maxprice = _maxPrice;
    }

    const response = await client.placesNearby({
      params,
      timeout: 3000,
    });

    return response.data.results;
  } catch (error: any) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message,
    );
    return { error: "Failed to fetch nearby places", details: error.message };
  }
};
