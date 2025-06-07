import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { API_URL } from '../../../constants/global';
import axios from 'axios';

export const EditProfile = ({ onModalClose, onSubmit, selectEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [languages, setLanguages] = useState([]);
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [format, setFormat] = useState('');
  const [slackUsername, setSlackUsername] = useState('');
  const [error, setError] = useState(null);
  
  const { access_token } = useContext(AuthContext);

  useEffect(() => {
    if (selectEdit) {
      setName(selectEdit.name || '');
      setEmail(selectEdit.email || '');
      setLanguages(selectEdit.languages || []);
      setGithub(selectEdit.github || '');
      setLinkedin(selectEdit.linkedin || '');
      setDescription(selectEdit.description || '');
      setLocation(selectEdit.location || '');
      setReason(selectEdit.reason || '');
      setFormat(selectEdit.format || '');
      setSlackUsername(selectEdit.slackUsername || '');
    }
  }, [selectEdit]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.patch(
        `${API_URL}/users/${selectEdit.id}`,
        {
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
        },
        config
      );
      onModalClose();
      onSubmit();

      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Error happened';
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="modal-content">
      <span className="close" onClick={onModalClose}>
        X
      </span>
      <h2>Edit My Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">How do you want to edit your Full Name?</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">How do you want to edit your Email?</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="languages">What languages do you work with?</label>
          <select
            multiple
            value={languages}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(
                (option) => option.value
              );
              setLanguages(selectedOptions);
            }}
            required
          >
            {languagesData.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="github">What is your GitHub?</label>
          <input
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">What is your LinkedIn?</label>
          <input
            type="text"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Tell a bit about yourself:</label>
          <textarea
            id="description"
            rows={3}
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Where are you based?</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="format">
            Why would you like to join Tech Buddies?
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="helping">Help Others</option>
            <option value="learning">Get Help</option>
            <option value="friendships">Make Friends</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="format">How would you like to meet?</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          >
            <option value="online">Online</option>
            <option value="inperson">In Person</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="slack">
            What is your slack username (if you have one)?
          </label>
          <input
            type="text"
            id="slack"
            value={slackUsername}
            onChange={(e) => setSlackUsername(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-actions">
          <button onClick={onPopupClose}>Cancel</button>

          <button type="submit">Update My Info</button>
        </div>
      </form>
    </div>
  );
};
