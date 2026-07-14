import { useEffect, useState } from "react";
import api from "../api";

function Trips() {
  const [trips, setTrips] = useState([]);
  const [editingTripId, setEditingTripId] = useState(null);
  const [editForm, setEditForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    try {
      const response = await api.get("/trips");
      setTrips(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function createTrip(e) {
    e.preventDefault();

    try {
      await api.post("/trips", form);

      setForm({
        destination: "",
        startDate: "",
        endDate: "",
        notes: "",
      });

      fetchTrips();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTrip(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/trips/${id}`);
      setTrips((currentTrips) =>
        currentTrips.filter((trip) => trip._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  function toInputDate(dateValue) {
    return new Date(dateValue).toISOString().split("T")[0];
  }

  function startEditTrip(trip) {
    setEditingTripId(trip._id);
    setEditForm({
      destination: trip.destination || "",
      startDate: toInputDate(trip.startDate),
      endDate: toInputDate(trip.endDate),
      notes: trip.notes || "",
    });
  }

  function cancelEditTrip() {
    setEditingTripId(null);
    setEditForm({
      destination: "",
      startDate: "",
      endDate: "",
      notes: "",
    });
  }

  async function updateTrip(id) {
    try {
      const response = await api.put(`/trips/${id}`, editForm);
      setTrips((currentTrips) =>
        currentTrips.map((trip) =>
          trip._id === id ? response.data : trip
        )
      );
      cancelEditTrip();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        ✈️ My Trips
      </h1>

      <form
        onSubmit={createTrip}
        className="space-y-4 mb-10"
      >
        <input
          className="border p-2 w-full"
          placeholder="Destination"
          value={form.destination}
          onChange={(e) =>
            setForm({ ...form, destination: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Trip
        </button>

      </form>

      {trips.length === 0 ? (
        <p>No trips planned yet.</p>
      ) : (
        trips.map((trip) => (
          <div
            key={trip._id}
            className="border rounded-lg p-6 mb-4 shadow"
          >
            {editingTripId === trip._id ? (
              <div className="space-y-3">
                <input
                  className="border p-2 w-full"
                  placeholder="Destination"
                  value={editForm.destination}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      destination: e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  className="border p-2 w-full"
                  value={editForm.startDate}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      startDate: e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  className="border p-2 w-full"
                  value={editForm.endDate}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      endDate: e.target.value,
                    })
                  }
                />

                <textarea
                  className="border p-2 w-full"
                  placeholder="Notes"
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      notes: e.target.value,
                    })
                  }
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => updateTrip(trip._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditTrip}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  {trip.destination}
                </h2>

                <p>
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>

                <p className="mt-2">
                  {trip.notes}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => startEditTrip(trip)}
                    className="bg-amber-500 text-white px-4 py-2 rounded"
                  >
                    Edit Trip
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTrip(trip._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete Trip
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}

    </div>
  );
}

export default Trips;
