/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface FooterProps {
  isOnDressingScreen?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isOnDressingScreen = false }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200/60 p-3 z-50 ${isOnDressingScreen ? 'hidden sm:block' : ''}`}>
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 max-w-7xl px-4">
        <p>
          Created by{' '}
          <a 
            href="https://x.com/neuro_crypt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 hover:underline"
          >
            @neuro_crypt
          </a>
        </p>
        <nav className="flex items-center gap-x-4 gap-y-1 flex-wrap justify-center mt-1 sm:mt-0">
          <a href="#about" className="font-semibold text-gray-700 hover:text-gray-900 hover:underline">About</a>
          <a href="#privacy" className="font-semibold text-gray-700 hover:text-gray-900 hover:underline">Privacy Policy</a>
          <a href="#contact" className="font-semibold text-gray-700 hover:text-gray-900 hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;