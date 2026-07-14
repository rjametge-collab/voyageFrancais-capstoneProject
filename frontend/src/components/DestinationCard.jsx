function DestinationCard({ destination }) {
  const imageSrc = destination.image || "/logo.png";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">

      <img
        src={imageSrc}
        alt={destination.city}
        className="w-full h-48 object-cover"
        onError={(event) => {
          event.currentTarget.src = "/logo.png";
        }}
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold text-blue-900">
          {destination.city}
        </h3>

        <p className="text-gray-500 mb-3">
          {destination.region}, {destination.country}
        </p>

        <p className="text-gray-600">
          {destination.description}
        </p>

      </div>

    </div>
  );
}

export default DestinationCard;