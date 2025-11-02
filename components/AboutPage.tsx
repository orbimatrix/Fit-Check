/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import { ShirtIcon, SparklesIcon } from './icons';

const AboutPage: React.FC = () => {
  return (
    <motion.div
      key="about-page"
      className="w-full min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShirtIcon className="mx-auto h-12 w-12 text-gray-700" />
            <h1 className="mt-4 text-4xl font-serif font-bold text-gray-900 sm:text-5xl">
              About Fit Check
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Reimagining the way you shop for clothes online.
            </p>
          </div>

          <div className="mt-16 text-lg text-gray-700 mx-auto space-y-8 max-w-3xl">
            <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Our Mission</h2>
                <p>
                Fit Check was born from a simple idea: online shopping should be confident, not a guessing game. We've all been there—ordering an outfit we love online, only to find it doesn't fit or look the way we imagined. Our mission is to eliminate that uncertainty. By leveraging cutting-edge AI, we provide a virtual dressing room that lets you see how clothes look on *your* body, from the comfort of your home.
                </p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">The Technology</h2>
                <p>
                At the heart of Fit Check is Google's powerful Gemini model. Here's a glimpse into how it works:
                </p>
                <ul className="list-disc list-outside space-y-3 pl-5">
                <li><span className="font-semibold">Personal Model Creation:</span> When you upload your photo, Gemini analyzes your unique features and body type to create a realistic, stylable AI model. It's you, ready for a fashion shoot.</li>
                <li><span className="font-semibold">Virtual Try-On:</span> Our AI understands the physics of fabric. It drapes, folds, and fits garments onto your model with incredible realism, accounting for your pose and body shape to show you a true-to-life preview.</li>
                <li><span className="font-semibold">Dynamic Poses:</span> See your outfit from every angle. The AI can regenerate your model in various poses, giving you a complete 360-degree view of your new look.</li>
                </ul>
            </div>
            
            <div className="text-center pt-8">
              <a 
                href="#home" 
                className="inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <SparklesIcon className="w-5 h-5 mr-3" />
                Try It Now
              </a>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default AboutPage;