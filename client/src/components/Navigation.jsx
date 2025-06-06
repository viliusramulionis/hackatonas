import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Homepage", to: "/" },
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="relative w-full bg-white shadow-sm border-b border-gray-200 py-5 px-8 md:px-20"
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-[#3535FF] font-semibold text-3xl tracking-widest uppercase cursor-pointer select-none transition-transform duration-200 ease-in-out hover:scale-101 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3535FF] rounded"
          style={{ textShadow: "0 0 6px rgba(127, 148, 252, 0.9)" }}
          tabIndex={0}
          onClick={handleLinkClick}
        >
          Tech Buddies
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-14 text-gray-700 font-semibold tracking-wide uppercase text-sm">
          {navLinks.map(({ label, to }) => (
            <li key={label} className="relative group">
              <Link
                to={to}
                className="px-2 py-1 transition-colors duration-200 ease-in-out
                  hover:text-[#3535FF] hover:font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3535FF] rounded"
                tabIndex={0}
              >
                {label}
              </Link>
              <span
                className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#3535FF]
                  transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 origin-center"
              />
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-7 h-7 flex flex-col justify-center items-center gap-1.5 p-1 rounded
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
          type="button"
        >
          <span
            className={`block h-0.5 w-7 bg-gray-900 rounded transition-transform duration-300 origin-center
              ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
          />
          <span
            className={`block h-0.5 w-7 bg-gray-900 rounded transition-opacity duration-300
              ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-7 bg-gray-900 rounded transition-transform duration-300 origin-center
              ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${
            menuOpen
              ? "max-h-52 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-y-90"
          }`}
        style={{ transformOrigin: "top" }}
      >
        <ul className="flex flex-col px-6 pt-6 pb-4 space-y-5 text-gray-800 uppercase font-semibold tracking-wide text-base">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-md transition-colors duration-200
                  hover:bg-[#3535FF] hover:text-white hover:font-bold
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3535FF]"
                tabIndex={0}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
