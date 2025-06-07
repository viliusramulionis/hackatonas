import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BuddyCardDetailed = () => {
  const { id } = useParams();
  const [buddy, setBuddy] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/budies/${id}`)
      .then((res) => setBuddy(res.data))
      .catch(() => setError("Buddy not found."));
  }, [id]);

  if (error) {
    return (
      <p className="text-center text-red-600 mt-20 text-2xl font-semibold">
        {error}
      </p>
    );
  }

  if (!buddy) {
    return (
      <p className="text-center text-gray-400 mt-20 text-2xl animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-12 py-24">
      <div className="max-w-7xl w-full bg-white rounded-4xl shadow-2xl flex flex-col md:flex-row gap-16 p-16 md:p-24">
        <div className="flex-shrink-0 flex justify-center items-center md:items-center">
          <img
            src={buddy.photo}
            alt={buddy.name}
            className="w-56 h-56 rounded-full object-cover border-8 border-indigo-200 shadow-xl transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-12">
          <div>
            <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {buddy.name}
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-600 italic leading-relaxed">
              {buddy.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-16 text-gray-700">
            {buddy.location && (
              <LabeledInfo icon="📍" label="Location" value={buddy.location} />
            )}
            {buddy.created_at && (
              <LabeledInfo icon="📅" label="Joined" value={buddy.created_at} />
            )}
            {buddy.slack_userid && (
              <LabeledInfo
                icon="💬"
                label="Slack"
                value={
                  <a
                    href={`https://slack.com/app_redirect?channel=${buddy.slack_userid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Message on Slack
                  </a>
                }
              />
            )}
          </div>

          <div className="flex flex-wrap gap-8">
            {buddy.linkedin_url && (
              <BigButton text="LinkedIn" url={buddy.linkedin_url} />
            )}
            {buddy.github_url && (
              <BigButton text="GitHub" url={buddy.github_url} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LabeledInfo = ({ icon, label, value }) => (
  <div className="flex flex-col items-start">
    <div className="text-4xl">{icon}</div>
    <p className="mt-2 text-gray-400 uppercase tracking-wide font-semibold text-sm">
      {label}
    </p>
    <div className="mt-1 text-xl font-semibold">{value}</div>
  </div>
);

const BigButton = ({ text, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-indigo-600 text-white text-xl font-semibold px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
  >
    {text}
  </a>
);

export default BuddyCardDetailed;
