import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "/api/users";

export const EditProfile = ({ userId, onModalClose, onSubmit }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [format, setFormat] = useState("");
  const [slackUsername, setSlackUsername] = useState("");

  useEffect(() => {
    // Fetch user data on mount
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/${userId}`);
        const data = res.data;

        setName(data.name || "");
        setEmail(data.email || "");
        setLanguages(data.languages || []);
        setGithub(data.github || "");
        setLinkedin(data.linkedin || "");
        setDescription(data.description || "");
        setLocation(data.location || "");
        setReason(data.reason || "");
        setFormat(data.format || "");
        setSlackUsername(data.slackUsername || "");

        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.patch(`${API_URL}/${userId}`, {
        name,
        email,
        languages,
        github,
        linkedin,
        description,
        location,
        reason,
        format,
        slackUsername,
      });
      onModalClose();
      onSubmit();
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while updating."
      );
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Languages (comma separated):
          <input
            type="text"
            value={languages.join(", ")}
            onChange={(e) =>
              setLanguages(
                e.target.value.split(",").map((lang) => lang.trim())
              )
            }
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          GitHub URL:
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          LinkedIn URL:
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        </label>

        <label className="block">
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Format:
          <input
            type="text"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Slack Username:
          <input
            type="text"
            value={slackUsername}
            onChange={(e) => setSlackUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onModalClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};
