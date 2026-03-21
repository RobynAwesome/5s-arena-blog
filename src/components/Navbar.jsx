import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "./image.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between px-4 bg-green-900 text-white">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="5's Arena Logo" w={32} h={32} />
        <span>5s Arena Blog</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>

        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg fixed top-16 left-0 bg-green-700 text-white z-40 transition-transform ease-in-out duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            <button className="py-2 px-4 rounded-3xl bg-green-800 text-white shadow-md">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="hover:text-green-300 transition-colors">Home</Link>
        <Link to="/posts?sort=trending" className="hover:text-green-300 transition-colors">Trending</Link>
        <Link to="/posts?sort=popular" className="hover:text-green-300 transition-colors">Most Popular</Link>
        <Link to="/about" className="hover:text-green-300 transition-colors">About</Link>
        <Link to="/login">
          <button className="py-2 px-4 rounded-3xl bg-green-600 hover:bg-green-500 text-white shadow-md transition-colors">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;