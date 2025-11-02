/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, DownloadIcon, CopyIcon, CheckCircleIcon } from './icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'fit-check-outfit.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    if (!imageUrl || copyStatus !== 'idle') return;
    
    setCopyStatus('copying');
    try {
      // The Clipboard API for images works with blobs.
      // We need to convert the data URL to a blob.
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopyStatus('copied');
    } catch (error) {
      console.error('Failed to copy image:', error);
      alert('Failed to copy image. Your browser may not support this feature.');
      setCopyStatus('idle');
    } finally {
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-md flex flex-col shadow-xl max-h-[95vh] sm:max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-serif tracking-wider text-gray-800">Share Your Outfit</h2>
              <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                <XIcon className="w-6 h-6"/>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 overflow-y-auto">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Outfit to share"
                  className="w-full max-w-[280px] sm:max-w-xs aspect-[2/3] object-contain rounded-lg bg-gray-100 border"
                />
              ) : (
                <div className="w-full max-w-[280px] sm:max-w-xs aspect-[2/3] bg-gray-200 rounded-lg animate-pulse" />
              )}
              
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  disabled={!imageUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <DownloadIcon className="w-5 h-5"/>
                  Download Image
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!imageUrl || copyStatus !== 'idle'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-white bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  {copyStatus === 'copied' ? <CheckCircleIcon className="w-5 h-5"/> : <CopyIcon className="w-5 h-5"/>}
                  {copyStatus === 'copied' ? 'Copied!' : 'Copy Image'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
