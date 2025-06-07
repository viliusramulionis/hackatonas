import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BuddyCardDetailed = () => {
  const { id } = useParams();
  const [buddy, setBuddy] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => setBuddy(res.data))
      .catch(() => setError("User not found."));
  }, [id]);

  if (error) {
    return (
      <p className="text-center text-red-600 mt-20 text-xl font-semibold">
        {error}
      </p>
    );
  }

  if (!buddy) {
    return (
      <p className="text-center text-gray-500 mt-20 text-xl animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-14">
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-12 rounded-3xl shadow-xl border border-gray-200 text-center">
        <img
          src={buddy.photo}
          alt={buddy.name}
          className="w-36 h-36 mx-auto rounded-full mb-10 object-cover border-4 border-gray-300 shadow-md transition-transform hover:scale-105"
        />
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {buddy.name}
        </h2>
        <p className="text-indigo-600 font-semibold mb-10 text-lg max-w-md mx-auto italic">
          {buddy.description || "No description provided."}
        </p>

        <div className="max-w-md mx-auto text-left text-gray-700 space-y-6 font-sans">
          {buddy.location && (
            <div className="flex items-center border-b border-gray-300 pb-3 gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-600">{buddy.location}</p>
              </div>
            </div>
          )}

          {buddy.created_at && (
            <div className="flex items-center border-b border-gray-300 pb-3 gap-3">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-semibold text-gray-900">Joined</p>
                <p className="text-gray-600">{buddy.created_at}</p>
              </div>
            </div>
          )}

          {buddy.slack_userid && (
            <div className="flex items-center border-b border-gray-300 pb-3 gap-3">
              <span className="text-xl">💬</span>
              <div>
                <p className="font-semibold text-gray-900">Slack ID</p>
                <p className="text-gray-600">{buddy.slack_userid}</p>
              </div>
            </div>
          )}

          {buddy.linkedin_url && (
            <div className="flex items-center border-b border-gray-300 pb-3 gap-3">
              <span className="text-xl">🔗</span>
              <a
                href={buddy.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 5 3.9 6 2.49 6c-1.38 0-2.49-1-2.49-2.5S1.1 1 2.49 1c1.41 0 2.49 1 2.49 2.5zM0 7h5v17H0V7zm7 0h5v2.5h.1c.7-1.3 2.5-2.5 5.15-2.5 5.5 0 6.5 3.6 6.5 8.3V24h-5v-7.5c0-1.8 0-4-2.5-4s-2.9 2-2.9 4V24H7V7z" />
                </svg>
                LinkedIn Profile
              </a>
            </div>
          )}

          {buddy.github_url && (
            <div className="flex items-center border-b border-gray-300 pb-3 gap-3">
              <span className="text-xl">🐱</span>
              <a
                href={buddy.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6a3.14 3.14 0 00-1.3-1.7c-1-.7.1-.7.1-.7a2.5 2.5 0 011.8 1.2 2.56 2.56 0 003.5 1 2.5 2.5 0 01.7-1.6c-2.7-.3-5.5-1.3-5.5-5.8a4.55 4.55 0 011.2-3.1 4.22 4.22 0 01.1-3s1-.3 3.3 1.2a11.4 11.4 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2a4.22 4.22 0 01.1 3 4.55 4.55 0 011.2 3.1c0 4.5-2.8 5.5-5.5 5.8a2.8 2.8 0 01.8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0012 0z" />
                </svg>
                GitHub Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuddyCardDetailed;
