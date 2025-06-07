import './App.css';
import MainPage from './pages/MainPage';
import BuddyCardDetailed from './components/BuddyCardDetailed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/users/:id" element={<BuddyCardDetailed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
