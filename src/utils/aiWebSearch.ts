import "dotenv/config";
import OpenAI from "openai";

export async function fetchResponse(restaurantsData, userInputPrompt,location) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set or is empty.");
    }

    var restaurantsDataJSON = JSON.stringify(restaurantsData);

    const response = await client.responses.create({
      model: "gpt-4o",
      tools: [{ type: "web_search_preview", search_context_size: "low" }],
      // input: `${userInputPrompt} in location 44.64010630198017, -63.5768 9073273051`,
      input: `Find Restaurants Based on User Input

You are an AI with the ability to perform web searches to find restaurants based on their names or related food items, 
and match them with a given search input from the user. 
Your task is to analyze the input and find relevant matches using web search capabilities.

Location: ${location.lat}, ${location.lng},
Provided Restaurants Data:${restaurantsDataJSON},

2. User Search Input:${userInputPrompt}

Instructions:
- Conduct a web search to find restaurants whose userInputPrompt names match or that restaurants serves.
- Analyze the web search results to determine if a related userInputPrompt is commonly associated with a particular restaurant.
- Ensure the search is case-insensitive and supports partial matches.

Output:
-Only select from the provided restaurants data.
- If a match is found based on the restaurant name or a related food item, return the id only.
- Always give only one id from the given info.
- Do not explain or provide additional information about the restaurant or the search process.
- Avoid providing any links or references to external sources.
- Avoid using markdown or HTML tags in the output.
- If no match is found, return "Not Found.""

`,
    });

    var searchDataSample = [
      "The Bicycle Thief",
      "Café Lunette",
      "Tribute",
      "Daryâ",
      "Henry House",
      "Tony's Donair",
      "East Side Mario's",
      "Lou Pécou Pizzeria",
      "YiLan Chinese Halal Restaurant",
      "The Narrows Public House",
      "The Auction House",
      "The Press Gang",
      "Shuck Seafood + Raw Bar",
      "Salty's",
      "The Wooden Monkey",
      "Bistro le Coq",
      "Gio Restaurant",
      "2 Doors Down",
      "Field Guide",
      "The Old Triangle Irish Alehouse",
    ];

    //   const completion = await client.chat.completions.create({
    //     model: "gpt-4o-mini-search-preview",
    //     web_search_options: {},
    //     messages: [
    //       {
    //         "role": "system",
    //         "content": `okay here is the user prompt: ${userInputPrompt}, could you do a web search for me? and find out the best restaurant where they can find?
    //         also here is the lngitude and latitude of the location: 44.64010630198017, -63.57689073273051`,
    //       },
    //       // {
    //       //   "role": "system",
    //       //   "content": [
    //       //     {
    //       //       "type": "text",
    //       //       "text": `
    //       //         Please provide information exclusively related to food specific to the given location.
    //       //         Here is the list of restaurants and use this as search context: ${restaurantsData}.
    //       //         Here is the user prompt: ${userInputPrompt},
    //       //         if the prompt is not related to food, or the provided search context then please respond with "please try again".
    //       //         otherwise, respond with the name of a restaurant from the search context.
    //       //         Avoid answering off-topic questions and do not provide justifications, explanations, links for your responses just return the name of the restaurant in simple text and nothing else.
    //       //       `
    //       //     }
    //       //   ]
    //       // },
    //       {
    //         "role": "user",
    //         "content": [
    //           {
    //             "type": "text",
    //             "text": `${userInputPrompt}`
    //           }
    //         ]
    //       }
    //     ],

    // });

    response.output_text = response.output_text.replace("- ",""); // Remove HTML tags from the output text
    response.output_text = response.output_text.replace(" ",""); // Remove HTML tags from the output text
    return await response.output_text; // Return the text of the first choice
    // return await response; // Return the text of the first choice
  } catch (error) {
    console.error("Error in fetchResponse:", error);
  }
}
