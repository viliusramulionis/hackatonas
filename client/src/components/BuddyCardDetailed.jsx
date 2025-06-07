import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const BuddyCardDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buddy, setBuddy] = useState(null);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/api/budies/${id}`)
      .then((res) => setBuddy(res.data))
      .catch(() => setError("Buddy not found."));
  }, [id]);

  if (error) {
    return (
      <p className="text-center text-red-500 mt-20 text-2xl font-semibold">
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

  const showEditButton = user && user.id === buddy.id;

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#111827] px-4 py-12">
      <div className="max-w-5xl w-full bg-white text-gray-900 rounded-3xl shadow-2xl p-6 sm:p-12 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={buddy.photo}
            alt={`${buddy.name}'s profile`}
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover border-8 border-[#bfc0ff] shadow-lg transition-transform hover:scale-110 duration-300"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 justify-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {buddy.name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-[#3535FF] italic">
              {buddy.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base">
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
                    className="text-[#3535FF] font-semibold underline hover:text-[#1e1ebf] transition-colors"
                  >
                    Message on Slack
                  </a>
                }
              />
            )}
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4">
            {buddy.linkedin_url && (
              <BigButton text="LinkedIn" url={buddy.linkedin_url} />
            )}
            {buddy.github_url && (
              <BigButton text="GitHub" url={buddy.github_url} />
            )}
          </div>

          {showEditButton && (
            <button
              onClick={() => navigate("/edit/profile")}
              className="mt-6 self-start bg-[#3535FF] text-white font-medium px-6 py-2 rounded-full hover:bg-[#1e1ebf] transition-colors duration-300 shadow-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper: Icon + Label + Value
const LabeledInfo = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 uppercase text-xs font-bold tracking-wide">
        {label}
      </p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const BigButton = ({ text, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-[#3535FF] text-white px-6 py-3 rounded-full font-semibold text-base shadow-md hover:bg-[#1e1ebf] transition-colors duration-300 hover:scale-105"
  >
    {text}
  </a>
);

export default BuddyCardDetailed;
