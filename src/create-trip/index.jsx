import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    totalDays: "",
    budget: "",
    traveler: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login success:", codeResp);
      GetUserProfile(codeResp); // Fetch user profile after successful login
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setOpenDialog(false); // Close dialog on error
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // Open dialog if user is not logged in
      return;
    }
    if (!formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details!");
      return;
    }
    toast("Form generated.");
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.totalDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("AI Response:", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: typeof TripData === "string" ? JSON.parse(TripData) : TripData,
        userEmail: user?.email || "unknown",
        id: docId,
      });

      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      setLoading(false);
      alert("Failed to save trip. Please try again.");
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        console.log("User profile fetched:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false); // Close dialog after successful login
        OnGenerateTrip(); // Proceed to generate the trip
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setOpenDialog(false); // Close dialog on error
      });
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
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;