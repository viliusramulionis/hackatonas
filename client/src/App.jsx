import "./App.css";
import MainPage from "./pages/MainPage";
import BuddyCardDetailed from "./components/BuddyCardDetailed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/budies/:id" element={<BuddyCardDetailed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
