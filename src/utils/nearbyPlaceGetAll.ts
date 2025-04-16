export const fetchAllNearbyPlaces = async (initialPageToken) => {
  const results = [];
  let pagetoken = initialPageToken;
  let attempts = 0;
  const maxAttempts = 3; // Maximum number of fetch attempts

  // Helper function to delay execution for a specified number of milliseconds
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (pagetoken && attempts < maxAttempts) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pagetoken}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
      await delay(2000);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      //console.log("🚀 ~ fetchAllNearbyPlaces ~ json:", json)
      results.push(...json.results);

      // Check for next_page_token and break the loop if not present
      if (json.next_page_token) {
        pagetoken = json.next_page_token;
        attempts++;
        //console.log(`Fetched page ${attempts}. Waiting for 2 seconds before next request...`);
         // Delay for 2 seconds between requests
      } else {
        break;
      }

    } catch (error) {
      console.error(error.message);
      break; // Exit the loop in case of an error
    }
  }

  //console.log(`Total places fetched: ${results.length}`);
  return results;
};