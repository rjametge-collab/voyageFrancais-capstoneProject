import { useEffect, useState } from "react";
import api from "../api";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    try {
      const response = await api.get("/destinations");
      setDestinations(response.data);
    } catch (error) {
      console.error("Error loading destinations:", error);
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        🌍 Destinations
      </h1>

      {destinations.length === 0 ? (
        <p>No destinations found.</p>
      ) : (

        <div className="space-y-4">

          {destinations.map((destination) => (

            <div
              key={destination._id}
              className="border rounded-lg p-6 shadow"
            >

              <h2 className="text-2xl font-bold">
                {destination.city}
              </h2>

              <p className="text-gray-600">
                {destination.region}, {destination.country}
              </p>

              <p className="mt-3">
                {destination.description}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Destinations;