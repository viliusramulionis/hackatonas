import './App.css';
import MainPage from './pages/MainPage';
import BuddyCardDetailed from './components/BuddyCardDetailed';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
