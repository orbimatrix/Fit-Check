/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import { ShirtIcon } from './icons';

const ContactPage: React.FC = () => {
  return (
    <motion.div
      key="contact-page"
      className="w-full min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShirtIcon className="mx-auto h-12 w-12 text-gray-700" />
            <h1 className="mt-4 text-4xl font-serif font-bold text-gray-900 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-xl text-gray-600">
                Have questions, feedback, or want to connect?
            </p>

            <div className="mt-12 text-lg text-gray-700">
                <p>
                    This project was created by <a href="https://x.com/neuro_crypt" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 underline hover:text-gray-700">@neuro_crypt</a>.
                </p>
                <p className="mt-2">
                    The best way to reach out is via X (formerly Twitter).
                </p>
            </div>
             <div className="text-center pt-10">
              <a 
                href="https://x.com/neuro_crypt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
              >
                Connect on X
              </a>
            </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ContactPage;
