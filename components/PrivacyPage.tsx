/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

const PrivacyPage: React.FC = () => {
  return (
    <motion.div
      key="privacy-page"
      className="w-full min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-lg text-gray-500">Last Updated: [Date]</p>
          </div>

          <div className="text-base text-gray-700 space-y-8">
            <p>
              Welcome to Fit Check. This Privacy Policy explains how we handle your information when you use our virtual try-on service. Your privacy and trust are important to us.
            </p>

            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">1. Information We Collect</h2>
                <p>
                    <strong>Images You Provide:</strong> When you upload a photo to create a model or try on a garment, we process these images to provide the service. These images are sent to the Google Gemini API for processing. We do not store your uploaded images on our servers after the generation process is complete.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">2. How We Use Your Information</h2>
                <p>
                    Your images are used solely for the purpose of generating the AI model and virtual try-on results you request. We do not use your images for any other purpose, such as training AI models or marketing.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">3. Data Sharing and Third Parties</h2>
                <p>
                    We use the Google Gemini API to power our service. Your images are sent to Google for processing. We encourage you to review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 underline hover:text-gray-700">Google's Privacy Policy</a> to understand how they handle data. We do not share your data with any other third parties.
                </p>
            </div>
             <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">4. Content Policy</h2>
                <p>
                    Users must not upload images that are unlawful, harmful, explicit, or otherwise objectionable. We reserve the right to block users who violate this policy. This service is intended for creative and responsible use only.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">5. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-gray-900">6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please <a href="#contact" className="font-semibold text-gray-900 underline hover:text-gray-700">contact us</a>.
                </p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default PrivacyPage;