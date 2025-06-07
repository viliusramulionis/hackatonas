import { useEffect, useState } from "react";
import axios from "axios";
import MainList from "../components/MainList";

const MainPage = () => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/budies")
      .then((res) => {
        setBuddies(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch buddies.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen px-4 md:px-8 py-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Meet the Community
          </h1>
          <p className="text-lg text-neutral-400">
            Passionate people building amazing things together
          </p>
        </header>

        {loading && (
          <div className="text-center py-10 text-neutral-400 animate-pulse">
            Loading buddies...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-400 font-medium">
            {error}
          </div>
        )}

        {!loading && !error && <MainList buddies={buddies} />}
      </div>
    </main>
  );
};

export default MainPage;
