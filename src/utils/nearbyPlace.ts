import { Client } from "@googlemaps/google-maps-services-js";
import { fetchAllNearbyPlaces } from "./nearbyPlaceGetAll";

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
    const params: any = {
      location: `${_location.lat},${_location.lng}`,
      radius: Math.max(1, Math.min(1000, _radius)),
      type: _type || "restaurant",
      key: process.env.GOOGLE_MAPS_API_KEY,
    };

    if (_maxPrice && _maxPrice > 0) {
      params.next_page_token = _maxPrice;
    }

    const response = await client.placesNearby({
      params,
    });

    let allResults = response.data.results as any[];

    // setTimeout(() => {
    //   //console.log("Fetching all nearby places...");
    //   allResults.push(fetchAllNearbyPlaces(response.data.next_page_token));
    // }, 2000);

    const nextPageToken = response.data.next_page_token;
    
    if (nextPageToken) {
      //console.log("Fetching additional pages...");
      // Wait for fetchAllNearbyPlaces to complete and append the results
      const additionalResults = await fetchAllNearbyPlaces(nextPageToken);
      allResults = [...allResults, ...additionalResults];
      //console.log("🚀 ~ allResults:", allResults.length)
    }
    
    return allResults;
  } catch (error: any) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message,
    );
    return { error: "Failed to fetch nearby places", details: error.message };
  }
};
