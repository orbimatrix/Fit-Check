/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SparklesIcon } from './icons';
import { generateGarmentImage } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';

interface GenerateGarmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGarmentGenerated: (imageUrl: string, prompt: string) => void;
}

const GenerateGarmentModal: React.FC<GenerateGarmentModalProps> = ({ isOpen, onClose, onGarmentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const imageUrl = await generateGarmentImage(prompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate garment'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGarment = () => {
    if (generatedImageUrl) {
      onGarmentGenerated(generatedImageUrl, prompt);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setPrompt('');
    setIsLoading(false);
    setError(null);
    setGeneratedImageUrl(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-lg flex flex-col shadow-xl"
          >
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-serif tracking-wider text-gray-800">Generate Garment with AI</h2>
              <button onClick={handleClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                <XIcon className="w-6 h-6"/>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="garmentPrompt" className="block text-sm font-medium text-gray-700">Describe the garment you want to create:</label>
                <textarea 
                  id="garmentPrompt"
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., a blue denim jacket with fleece lining"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                />
              </div>

              {(isLoading || generatedImageUrl) && (
                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border">
                  {isLoading && <Spinner />}
                  {generatedImageUrl && !isLoading && (
                    <img src={generatedImageUrl} alt="Generated garment" className="w-full h-full object-contain rounded-lg" />
                  )}
                </div>
              )}
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm" role="alert">
                  <p>{error}</p>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              {generatedImageUrl ? (
                 <button
                    onClick={() => { setGeneratedImageUrl(null); setError(null); }}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Try Again
                </button>
              ) : <div></div>}
              
              {generatedImageUrl ? (
                <button
                  onClick={handleUseGarment}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Use this Garment
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <SparklesIcon className="w-4 h-4" />
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GenerateGarmentModal;