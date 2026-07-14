import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import DestinationCard from "../components/DestinationCard";

function Home() {

    const [destinations, setDestinations] = useState([]);

useEffect(() => {
  api.get("/destinations")
    .then((res) => {
      setDestinations(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


const featuredDestinations = destinations.filter(
  (destination) =>
    ["Paris", "Bordeaux", "Provence"].includes(destination.city)
);

{/* Featured Destinations */}

<section className="bg-gray-50 py-20 px-6">

  <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
    Explore France 🇫🇷
  </h2>


  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

    {featuredDestinations.map((destination) => (

      <DestinationCard
        key={destination._id}
        destination={destination}
      />

    ))}

  </div>


</section>
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <div className="mb-8 flex flex-col items-center gap-5">

            <img
              src="/logo.png"
              alt="Voyage Francais logo"
              className="h-28 w-28 rounded-xl object-contain bg-white p-2"
            />

            <h1 className="text-5xl md:text-6xl font-bold">
              Voyage Français
            </h1>

          </div>


          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Discover France.
            <br />
            Learn French.
            <br />
            Create unforgettable journeys.
          </h2>


          <p className="text-xl max-w-3xl mx-auto mb-10 text-blue-100">
            Your digital companion for exploring France,
            learning practical French, and creating your perfect adventure.
          </p>


          <div className="flex flex-col md:flex-row justify-center gap-4">

            <Link
              to="/lessons"
              className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Start Learning 🇫🇷
            </Link>


            <Link
              to="/trips"
              className="bg-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Plan Your Trip ✈️
            </Link>

          </div>


        </div>

      </section>



      {/* Features */}
      <section className="max-w-6xl mx-auto py-20 px-6">


        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Everything You Need For Your French Adventure
        </h2>


        <div className="grid md:grid-cols-3 gap-8">


          <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

            <h3 className="text-2xl font-bold mb-4">
              📚 Learn French
            </h3>

            <p className="text-gray-600">
              Master useful vocabulary, phrases, and expressions
              designed for real travel situations.
            </p>

          </div>



          <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

            <h3 className="text-2xl font-bold mb-4">
              🗼 Discover France
            </h3>

            <p className="text-gray-600">
              Explore French cities, regions, attractions,
              and cultural experiences.
            </p>

          </div>



          <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

            <h3 className="text-2xl font-bold mb-4">
              ✈️ Plan Your Trip
            </h3>

            <p className="text-gray-600">
              Create your itinerary and organize your dream
              French vacation.
            </p>

          </div>


        </div>


      </section>



      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6">


        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          How Voyage Français Works
        </h2>


        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">


          <div>
            <div className="text-5xl mb-4">1️⃣</div>
            <h3 className="font-bold text-xl">
              Choose Your Destination
            </h3>
          </div>


          <div>
            <div className="text-5xl mb-4">2️⃣</div>
            <h3 className="font-bold text-xl">
              Learn French Essentials
            </h3>
          </div>


          <div>
            <div className="text-5xl mb-4">3️⃣</div>
            <h3 className="font-bold text-xl">
              Create Your Journey
            </h3>
          </div>


        </div>


      </section>



      {/* Future Vision */}
      <section className="py-20 px-6 text-center">


        <h2 className="text-4xl font-bold text-blue-900 mb-6">
          The Future of Voyage Français
        </h2>


        <p className="max-w-3xl mx-auto text-gray-600 mb-10">
          Our mission is to combine travel planning and French education
          into one complete cultural experience.
        </p>


        <div className="flex flex-wrap justify-center gap-4">

          <span className="bg-blue-100 px-5 py-3 rounded-full">
            📘 Travel Guides
          </span>

          <span className="bg-blue-100 px-5 py-3 rounded-full">
            🎓 Online French Classes
          </span>

          <span className="bg-blue-100 px-5 py-3 rounded-full">
            🗺️ Premium Itineraries
          </span>

          <span className="bg-blue-100 px-5 py-3 rounded-full">
            👨‍🏫 French Coaching
          </span>

        </div>


      </section>


    </div>
  );
}

export default Home;