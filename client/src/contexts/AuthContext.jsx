import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  user: null,
  access_token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          setIsLoading(true);

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(`api/auth/user`, config);

          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error);
          localStorage.removeItem('access_token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          setError('Authentication failed. Please log in again.');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // REGISTER
  const register = async (formData) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`api/auth/register`, {
        formData,
      });

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/budies/:id');
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post(`api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);
      setToken(response.data.access_token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/budies/:id');
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access_token: token,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
