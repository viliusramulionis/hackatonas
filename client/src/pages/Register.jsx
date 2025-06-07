import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [languages, setLanguages] = useState([]); // available languages from API
  const [selectedLanguages, setSelectedLanguages] = useState([]); // user selections
  const [languagesError, setLanguagesError] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [format, setFormat] = useState('');
  const [slackUsername, setSlackUsername] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('/api/languages')
      .then((res) => {
        const mapped = res.data.map((lang) => ({
          value: lang.title,
          label: lang.title,
        }));
        setLanguages(mapped);
      })
      .catch(() => setLanguages([]));
  }, []);

  const toggleLanguage = (langValue) => {
    if (selectedLanguages.includes(langValue)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== langValue));
    } else {
      setSelectedLanguages([...selectedLanguages, langValue]);
    }
  };

  const validateForm = () => {
    setPasswordError('');
    setLanguagesError('');
    setSubmitError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    if (selectedLanguages.length === 0) {
      setLanguagesError('Please select at least one language');
      return false;
    }
    return true;
  };

  const register = async (data) => {
  try {
    setSubmitting(true);
    const response = await axios.post('/api/users', data);
    console.log('Registration success:', response.data);
    navigate('/');
  } catch (error) {
    if (error.response) {
      // Server responded with status outside 2xx
      console.error('Server error:', error.response.data);
      setSubmitError(error.response.data.message || 'Registration failed. Please try again later.');
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.request);
      setSubmitError('No response from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error', error.message);
      setSubmitError('An error occurred. Please try again later.');
    }
    setSubmitting(false);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      name,
      email,
      password,
      languages: selectedLanguages,
      github,
      linkedin,
      description,
      location,
      reason,
      format,
      slackUsername,
    };

    await register(dataToSend);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Become A Tech Buddy</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {passwordError && <p className="mt-1 text-red-600 text-sm">{passwordError}</p>}
          </div>

          <fieldset>
            <legend className="block mb-2 font-semibold">
              What languages do you work with? <span className="text-red-600">*</span>
            </legend>
            <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto border border-gray-300 rounded p-3 bg-white">
              {languages.length === 0 && <p>Loading languages...</p>}
              {languages.map(({ value, label }) => (
                <label key={value} className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="languages"
                    value={value}
                    checked={selectedLanguages.includes(value)}
                    onChange={() => toggleLanguage(value)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {languagesError && <p className="mt-1 text-red-600 text-sm">{languagesError}</p>}
          </fieldset>

          <div>
            <label htmlFor="github" className="block mb-1 font-semibold">
              GitHub
            </label>
            <input
              id="github"
              type="url"
              required
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="linkedin" className="block mb-1 font-semibold">
              LinkedIn
            </label>
            <input
              id="linkedin"
              type="url"
              required
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-semibold">
              Tell a bit about yourself
            </label>
            <textarea
              id="description"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label htmlFor="location" className="block mb-1 font-semibold">
              Where are you based?
            </label>
            <input
              id="location"
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block mb-1 font-semibold">
              Why would you like to join Tech Buddies?
            </label>
            <select
              id="reason"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select one</option>
              <option value="helping">Help Others</option>
              <option value="learning">Get Help</option>
              <option value="friendships">Make Friends</option>
            </select>
          </div>

          <div>
            <label htmlFor="format" className="block mb-1 font-semibold">
              How would you like to meet?
            </label>
            <select
              id="format"
              required
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select one</option>
              <option value="online">Online</option>
              <option value="inperson">In Person</option>
            </select>
          </div>

          <div>
            <label htmlFor="slackUsername" className="block mb-1 font-semibold">
              Slack Username (if you have one)
            </label>
            <input
              id="slackUsername"
              type="text"
              value={slackUsername}
              onChange={(e) => setSlackUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="@username"
            />
          </div>

          {submitError && <p className="text-red-600 text-center mb-2">{submitError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition ${
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
