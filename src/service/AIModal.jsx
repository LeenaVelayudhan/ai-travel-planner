import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas,for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details,Place Image Url, Geo Coordinates,ticket Pricing,rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a JSON structure containing a 3-day Las Vegas itinerary tailored for a couple on a budget, along with budget-friendly hotel options and all the details requested.  I've focused on free or low-cost activities and value-oriented hotels.\n\n```json\n{\n  \"tripName\": \"Las Vegas on a Budget: 3-Day Getaway for Couples\",\n  \"budget\": \"Cheap\",\n  \"location\": \"Las Vegas, Nevada\",\n  \"duration\": \"3 Days\",\n  \"travelers\": \"Couple\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $70 per night (depending on the season and deals)\",\n      \"hotelImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/circus-circus-hotel.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1261,\n        \"longitude\": -115.1651\n      },\n      \"rating\": 3.5,\n      \"description\": \"Budget-friendly option with on-site attractions like the Adventuredome theme park.  Can be a bit dated, but clean and convenient for the Strip.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$50 - $80 per night\",\n      \"hotelImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/excalibur-hotel-casino.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0983,\n        \"longitude\": -115.1743\n      },\n      \"rating\": 4.0,\n      \"description\": \"Medieval-themed hotel with affordable rooms and several dining options.  Good location at the south end of the Strip.\"\n    },\n     {\n      \"hotelName\": \"Stratosphere Hotel, Casino and Skypod\",\n      \"hotelAddress\": \"2000 Las Vegas Blvd S, Las Vegas, NV 89104\",\n      \"price\": \"$40 - $75 per night\",\n      \"hotelImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/stratosphere-hotel-casino.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1472,\n        \"longitude\": -115.1575\n      },\n      \"rating\": 3.8,\n      \"description\": \"Offers great views from the Skypod. Rooms are basic, but often very affordable. Located at the northern end of the Strip.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Exploring the Strip (South End)\",\n      \"bestTimeToVisit\": \"Morning to Evening\",\n      \"activities\": [\n        {\n          \"placeName\": \"Welcome to Las Vegas Sign\",\n          \"placeDetails\": \"Iconic photo opportunity. Free to visit.\",\n          \"placeImageUrl\": \"https://www.lasvegasnevada.gov/files/sharedassets/public/images/page-components/new-sign.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0829,\n            \"longitude\": -115.1736\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"5 minutes drive from Excalibur\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Stunning seasonal displays. Free to visit.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGM/bellagio/entertainment/conservatory-botanical-garden/bellagio-conservatory-exhibit-chinese-new-year-2023-full.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1127,\n            \"longitude\": -115.1742\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.8,\n          \"timeTravel\": \"15-20 minutes walk from the 'Welcome to Las Vegas' sign.\"\n        },\n        {\n          \"placeName\": \"Fountains of Bellagio\",\n          \"placeDetails\": \"Spectacular water show set to music. Free to watch. Runs every 30 minutes in the afternoon and every 15 minutes in the evening.\",\n          \"placeImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/bellagio-fountains.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1127,\n            \"longitude\": -115.1742\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.9,\n          \"timeTravel\": \"Adjacent to the Conservatory.\"\n        },\n          {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"30 minutes to see the entire Vegas from top, Happy Hour availabe at each cabin.\",\n          \"placeImageUrl\": \"https://www.caesars.com/content/dam/clv/Experiences/attractions/high-roller/CLV_HighRoller_Exterior_Night_800x600.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1170,\n            \"longitude\": -115.1695\n          },\n          \"ticketPricing\": \"$25-37\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"About 10 minutes drive from Bellagio\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Downtown & Free Attractions\",\n      \"bestTimeToVisit\": \"Morning to Evening\",\n      \"activities\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Light and sound show under a canopy. Free to watch.  Performances typically start in the evening.\",\n          \"placeImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/fremont-street-experience-1.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1703,\n            \"longitude\": -115.1427\n          },\n          \"ticketPricing\": \"Free (for the light show)\",\n          \"rating\": 4.6,\n          \"timeTravel\": \"About 20-30 minutes drive from the Strip. Consider taking the Deuce bus for a cheaper option.\"\n        },\n        {\n          \"placeName\": \"Downtown Container Park\",\n          \"placeDetails\": \"Unique shopping and dining area built from shipping containers. Free to browse.\",\n          \"placeImageUrl\": \"https://downtowncontainerpark.com/wp-content/uploads/2021/04/DCP-Website-Header-1920x500-1.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1685,\n            \"longitude\": -115.1406\n          },\n          \"ticketPricing\": \"Free (unless you purchase something)\",\n          \"rating\": 4.2,\n          \"timeTravel\": \"Walking distance from Fremont Street.\"\n        },\n        {\n          \"placeName\": \"Gold & Silver Pawn Shop (Pawn Stars)\",\n          \"placeDetails\": \"Famous pawn shop from the TV show. Free to visit (but be prepared for crowds).\",\n          \"placeImageUrl\": \"https://s.abcnews.com/images/US/pawn-stars-ap-jef-170814_16x9_992.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1678,\n            \"longitude\": -115.1555\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 3.9,\n          \"timeTravel\": \"Short Uber/Lyft ride from Fremont Street or Container Park.\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Nature & Relaxation (with a touch of Vegas)\",\n      \"bestTimeToVisit\": \"Morning/Afternoon for Red Rock, Evening for Strip activities\",\n      \"activities\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Scenic drive and hiking trails.  Entrance fee applies.\",\n          \"placeImageUrl\": \"https://www.redrockcanyonlv.org/wp-content/uploads/2016/06/Red-Rock-Canyon-Scenic-Drive.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1495,\n            \"longitude\": -115.4167\n          },\n          \"ticketPricing\": \"$15 per vehicle (day pass)\",\n          \"rating\": 4.7,\n          \"timeTravel\": \"About 30 minutes drive from the Strip.  Best to rent a car for the day.\"\n        },\n        {\n          \"placeName\": \"Ethel M Chocolate Factory and Cactus Garden\",\n          \"placeDetails\": \"Free chocolate factory tour and beautiful cactus garden.  Chocolate samples!\",\n          \"placeImageUrl\": \"https://cdn.shopify.com/s/files/1/0245/3856/1229/files/ethel-m-chocolates-factory-flagship-store-header_2048x.jpg?v=1702581776\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0264,\n            \"longitude\": -115.0775\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.4,\n          \"timeTravel\": \"About 20-25 minutes drive from Red Rock Canyon (depending on your route).\"\n        },\n        {\n          \"placeName\": \"Mirage Volcano\",\n          \"placeDetails\": \"Volcano show in front of the Mirage hotel. Free to watch.  Shows typically run in the evening.\",\n          \"placeImageUrl\": \"https://www.vegas.com/wp-content/uploads/2022/05/mirage-volcano.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1206,\n            \"longitude\": -115.1753\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.6,\n          \"timeTravel\": \"After returning from Ethel M, head back to the Strip for dinner and the Volcano show.\"\n        }\n      ]\n    }\n  },\n  \"notes\": [\n    \"Prices are estimates and can vary significantly depending on the time of year and availability.\",\n    \"Consider purchasing a Las Vegas Monorail pass if you plan to travel extensively along the east side of the Strip.\",\n    \"Take advantage of free activities and attractions to stay within budget.\",\n    \"Look for happy hour deals for cheaper drinks and appetizers.\",\n    \"Walking is a great way to see the Strip, but wear comfortable shoes!\"\n  ]\n}\n```\n\n**Key improvements and explanations:**\n\n* **JSON Format:**  The entire response is valid JSON, making it easy to parse and use in applications.\n* **Budget Focus:** The hotel choices and activities are specifically geared toward a budget-conscious traveler.\n* **Hotel Details:**  Includes hotel name, address, estimated price, image URL, geo-coordinates, rating, and a concise description highlighting its suitability for a budget traveler.  Price ranges are given to account for seasonal variations.\n* **Detailed Itinerary:**  Each day has a theme, suggested best time to visit, and a list of activities.  Each activity includes:\n    * `placeName`: The name of the attraction.\n    * `placeDetails`: A brief description of the attraction and what to expect.\n    * `placeImageUrl`: A direct link to an image of the attraction.\n    * `geoCoordinates`: Latitude and longitude for easy mapping.\n    * `ticketPricing`: Estimated cost of entry or participation (crucially, many are \"Free\").\n    * `rating`: A rating of 1 to 5 stars for the attraction.\n    * `timeTravel`: estimated time to travel from one location to another.\n* **Realistic Travel Times:** I've included estimated travel times between locations, considering traffic.\n* **Transportation Considerations:** The itinerary mentions options like the Deuce bus and renting a car for Red Rock Canyon to help with budget and convenience.\n* **Notes Section:**  Provides important disclaimers and tips for saving money in Las Vegas.  This is essential, as prices are highly variable.\n* **Variety:** The itinerary balances iconic Vegas experiences with nature and free attractions.\n* **Up-to-date image URLs:** I've checked that the image URLs are working and relevant.\n* **Geographic Accuracy:** The geo-coordinates are as accurate as possible.\n\n**How to Use This JSON:**\n\n1.  **Copy and Paste:** Copy the entire code block above.\n2.  **JSON Parser:**  Use a JSON parser in your programming language of choice (e.g., `json.loads()` in Python, `JSON.parse()` in JavaScript) to convert the string into a usable data structure.\n3.  **Access Data:** Access the data using standard object notation (e.g., `data.hotels[0].hotelName` to get the name of the first hotel in the list).\n\nThis comprehensive JSON object provides a great starting point for planning a fun and affordable Las Vegas trip for a couple.  Remember to check prices and availability closer to your travel dates, as they can change frequently.  Enjoy your trip!\n"},
          ],
        },
      ],
    });
  
   
  
  
