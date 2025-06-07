import "./App.css";
import MainPage from "./pages/MainPage";
import BuddyCardDetailed from "./components/BuddyCardDetailed";
import Navigation from "./components/Navigation";
<<<<<<< HEAD
=======
import Register from "./pages/Register";
>>>>>>> 3eb94db0b58fce91cb6759633d463e6c7650cd6f
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budies/:id" element={<BuddyCardDetailed />} />
<<<<<<< HEAD
=======
            <Route path="/register" element={<Register />} />
>>>>>>> 3eb94db0b58fce91cb6759633d463e6c7650cd6f
          </Routes>
      </Router>
    </div>
  );
}

export default App;
