import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navigation */}
      <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          🇫🇷 Voyage Français
        </h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/lessons">Lessons</Link>
          <Link to="/trips">Trips</Link>
          <Link to="/login">Login</Link>
        </div>

      </nav>

      {/* Hero */}
      <section className="text-center py-24 px-6">

        <h2 className="text-6xl font-bold text-blue-900 mb-6">
          Learn French Through Travel
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover beautiful destinations across France while learning practical
          French for real-life conversations.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            to="/destinations"
            className="bg-blue-900 text-white px-8 py-4 rounded-lg"
          >
            Explore Destinations
          </Link>

          <Link
            to="/lessons"
            className="bg-red-600 text-white px-8 py-4 rounded-lg"
          >
            Start Learning
          </Link>

        </div>

      </section>

      {/* Featured Destinations */}
      <section className="max-w-6xl mx-auto py-12">

        <h3 className="text-4xl font-bold text-center mb-10">
          Featured Destinations
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-2xl font-bold">🗼 Paris</h4>
            <p>The City of Light.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-2xl font-bold">🌊 Nice</h4>
            <p>The French Riviera.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-2xl font-bold">🍷 Bordeaux</h4>
            <p>World-famous vineyards.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;