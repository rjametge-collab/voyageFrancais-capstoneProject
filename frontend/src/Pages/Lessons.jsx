import { useEffect, useState } from "react";

console.log("LESSONS COMPONENT LOADED");

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      setLoading(true);
      setError("");

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${baseUrl}/lessons`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched lessons:", data);
      setLessons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
      setError("Unable to load lessons right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl border border-blue-100 bg-white/80 p-8 shadow-sm backdrop-blur">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Learn with confidence
          </p>
          <h1 className="text-4xl font-bold text-slate-800">📚 French Lessons</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore practical lessons with vocabulary, grammar, and pronunciation tips.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Loading lessons...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
            {error}
          </div>
        ) : lessons.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            No lessons found.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {lessons.map((lesson) => (
              <article
                key={lesson._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {lesson.level}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    {lesson.category}
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-bold text-slate-800">
                  {lesson.title}
                </h2>

                <section className="mb-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-700">Vocabulary</h3>
                  <ul className="space-y-2">
                    {lesson.vocabulary.map((word, index) => (
                      <li key={index} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <strong className="text-slate-900">{word.french}</strong> — {word.english}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mb-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-700">Grammar</h3>
                  <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-slate-700">
                    {lesson.grammar}
                  </p>
                </section>

                <section>
                  <h3 className="mb-2 text-lg font-semibold text-slate-700">Pronunciation Tip</h3>
                  <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-slate-700">
                    {lesson.pronunciationTip}
                  </p>
                </section>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lessons;