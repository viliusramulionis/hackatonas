import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const BuddyCardDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buddy, setBuddy] = useState(null);
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/api/budies/${id}`)
      .then((res) => setBuddy(res.data))
      .catch(() => setError('Buddy not found.'));
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

  // Check if logged-in user matches buddy's id to show Edit button
  const showEditButton = user && user.id === buddy.id;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 sm:px-12 sm:py-24">
      <div className="max-w-4xl w-full bg-[#f3f4f6] rounded-3xl shadow-2xl flex flex-col md:flex-row gap-10 sm:gap-16 p-8 sm:p-16">
        <div className="flex-shrink-0 flex justify-center items-center md:items-center">
          <img
            src={buddy.photo}
            alt={buddy.name}
            className="w-36 h-36 sm:w-56 sm:h-56 rounded-full object-cover border-8 border-indigo-200 shadow-xl transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8 sm:space-y-12">
          <div>
            <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {buddy.name}
            </h1>
            <p className="mt-4 sm:mt-6 max-w-3xl text-md sm:text-xl text-indigo-600 italic leading-relaxed">
              {buddy.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-16 text-gray-700">
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

          <div className="flex flex-wrap gap-6 sm:gap-8 justify-center sm:justify-start">
            {buddy.linkedin_url && (
              <BigButton text="LinkedIn" url={buddy.linkedin_url} />
            )}
            {buddy.github_url && (
              <BigButton text="GitHub" url={buddy.github_url} />
            )}
          </div>

          {/* Edit Profile Button: Only if user logged in and id matches */}
          {showEditButton && (
            <button
              onClick={() => navigate('/edit/profile')}
              className="mt-8 inline-block bg-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const LabeledInfo = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4">
    <div className="text-3xl sm:text-4xl flex-shrink-0">{icon}</div>
    <div className="flex flex-col">
      <p className="text-gray-400 uppercase tracking-wide font-semibold text-xs sm:text-sm">
        {label}
      </p>
      <div className="text-lg sm:text-xl font-semibold">{value}</div>
    </div>
  </div>
);

const BigButton = ({ text, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-indigo-600 text-white text-base sm:text-xl font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
  >
    {text}
  </a>
);

export default BuddyCardDetailed;
