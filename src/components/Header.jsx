import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'mytheme-light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'mytheme-light' ? 'mytheme-dark' : 'mytheme-light');
  };

  return (
    <header className="fixed w-full z-50 bg-base-100/80 backdrop-blur-sm border-b border-base-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <svg width="50" height="24" viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.28809 24H0.360352L14.2168 0H21.1445L7.28809 24ZM17.6797 24H10.752L24.6084 0H31.5361L17.6797 24ZM38.4639 6L31.5361 18H38.4639L36.7314 15L40.1963 9L48.8564 24H21.1436L29.8037 9L35 0L38.4639 6Z" fill="#1c1917"/>
          </svg>
          <span className="text-xl text-base-content">Шведов Дмитрий</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-base-content hover:text-orange-500 transition-colors">Проекты</Link>
          <Link to="/research-methods" className="text-base-content hover:text-orange-500 transition-colors">UX Сервис</Link>
          <Link to="/about" className="text-base-content hover:text-orange-500 transition-colors">Обо мне</Link>
          <button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === 'mytheme-light' ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2" />
                </svg>
                <span className="text-sm">Тёмная</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span className="text-sm">Светлая</span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden btn btn-square btn-ghost text-base-content"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
         <Link to="/" className="text-base-content hover:text-orange-500 transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Проекты</Link>
         <Link to="/research-methods" className="text-base-content hover:text-orange-500 transition-colors py-1" onClick={() => setIsMenuOpen(false)}>UX Сервис</Link>
         <Link to="/about" className="text-base-content hover:text-orange-500 transition-colors py-1" onClick={() => setIsMenuOpen(false)}>Обо мне</Link>
          <button onClick={toggleTheme} className="flex items-center gap-2">
            {theme === 'mytheme-light' ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2" />
                </svg>
                <span className="text-sm">Тёмная</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span className="text-sm">Светлая</span>
              </>
            )}
          </button>
      </div>
        </div>
      )}
    </header>
  );
};

export default Header;

