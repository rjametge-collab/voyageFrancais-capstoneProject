import { useEffect, useState } from "react";
import api from "../api";
import DestinationCard from "../components/DestinationCard";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    try {
      const response = await api.get("/destinations");
      setDestinations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load destinations:", error);
      setDestinations([]);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
        Explore France
      </h1>

      {destinations.length === 0 ? (
        <p className="text-center text-gray-600">No destinations available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Destinations;
