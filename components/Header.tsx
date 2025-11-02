/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { ShirtIcon, MenuIcon, XIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex-shrink-0 flex items-center gap-2">
              <ShirtIcon className="w-7 h-7 text-gray-800" />
              <span className="text-xl font-serif font-bold text-gray-900 tracking-wider">Fit Check</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} className="font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="hidden md:block">
              <a href="#home" className="px-5 py-2 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} aria-label="Open menu">
                <MenuIcon className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-5">
                <button onClick={toggleMenu} aria-label="Close menu">
                  <XIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>
              <nav className="flex flex-col items-center space-y-8 mt-10">
                {NAV_LINKS.map(link => (
                  <a key={link.name} href={link.href} onClick={toggleMenu} className="text-2xl font-serif text-gray-700 hover:text-gray-900">
                    {link.name}
                  </a>
                ))}
                <hr className="w-3/4 border-gray-200" />
                <a href="#home" onClick={toggleMenu} className="px-8 py-3 text-lg font-semibold text-white bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                  Get Started
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
