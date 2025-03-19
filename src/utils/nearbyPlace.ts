import { Client, PlacesNearbyRequest, Place } from '@googlemaps/google-maps-services-js';

// Initialize the client
const client = new Client({});

// Function to get nearby places
export const getNearbyPlaces = async (
  location: { lat: number; lng: number },
  radius: number,
  type?: string
): Promise<Place[]> => {
  try {
    const response = await client.placesNearby({
      params: {
        location,
        radius,
        type,
        key: process.env.GOOGLE_MAPS_API_KEY || '',
      },
      timeout: 1000, // 1 second timeout
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
};