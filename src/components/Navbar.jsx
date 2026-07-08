import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

function Navbar({ email, onMenuClick }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      // Only hide after scrolling down a bit, avoids jitter near the top
      if (scrollingDown && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20 transition-transform duration-200 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle menu"
          className="text-gray-700 hover:bg-gray-100 rounded p-1.5"
        >
          {/* Hamburger icon, plain SVG, no extra library needed */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-800 font-mono">iris archive</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden sm:inline">{email}</span>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm bg-gray-800 text-white rounded px-3 py-1.5 font-medium hover:bg-gray-700"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;