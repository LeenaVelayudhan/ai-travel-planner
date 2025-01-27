import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    totalDays: "",
    budget: "",
    traveler: "",
  });
  const [loading, setLoading] = useState(false);

  const SelectBudgetOptions = [
    { title: "Economy", icon: "💸", desc: "Budget-friendly and economical options." },
    { title: "Standard", icon: "💰", desc: "Balanced budget for comfort and quality." },
    { title: "Luxury", icon: "💎", desc: "Premium and luxurious options." },
  ];

  const SelectTravelList = [
    { title: "Solo", icon: "🧍", desc: "Traveling alone.", people: "Solo" },
    { title: "Couple", icon: "👫", desc: "Traveling with a partner.", people: "Couple" },
    { title: "Family", icon: "👨‍👩‍👧‍👦", desc: "Traveling with family.", people: "Family" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const OnGenerateTrip = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("Trip generated with data:", formData);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen p-6">
      <div className="max-w-4xl mx-auto p-6 mt-12 bg-white shadow-2xl rounded-xl bg-opacity-80 backdrop-blur-sm">
        <div className="text-center">
          <h2 className="font-extrabold text-4xl text-gray-800">
            Tell us your travel preferences 🌍✈️🌴
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Provide some basic details, and our trip planner will craft a custom itinerary just for you.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {/* Destination Input */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              What is your destination of choice?
            </label>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v.label);
                },
              }}
            />
          </div>

          {/* Number of Days Input */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              How many days are you planning for your trip?
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g., 3"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              onChange={(e) => handleInputChange("totalDays", e.target.value)}
            />
          </div>

          {/* Budget Options */}
          <div>
            <label className="text-xl font-semibold block mb-2">What is your budget?</label>
            <p className="text-gray-500 mb-3 text-sm">
              This budget is exclusively for activities and dining purposes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`cursor-pointer p-4 border rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    formData.budget === item.title ? "shadow-2xl border-cyan-500 bg-cyan-50" : "shadow-md"
                  }`}
                >
                  <h2 className="text-3xl mb-2">{item.icon}</h2>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Options */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Who are you planning to travel with?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {SelectTravelList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`cursor-pointer p-4 border rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    formData.traveler === item.people ? "shadow-2xl border-cyan-500 bg-cyan-50" : "shadow-md"
                  }`}
                >
                  <h2 className="text-3xl mb-2">{item.icon}</h2>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="mt-12 text-right">
          <Button
            onClick={OnGenerateTrip}
            disabled={loading}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-300 transition duration-300"
          >
            {loading ? "Generating..." : "Generate Trip"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
