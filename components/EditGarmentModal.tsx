/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, Trash2Icon } from './icons';
import { WardrobeItem } from '../types';

interface EditGarmentModalProps {
  garment: WardrobeItem | null;
  onClose: () => void;
  onSave: (updatedGarment: WardrobeItem, newGarmentFile?: File) => void;
  onDelete: (garmentId: string) => void;
}

const EditGarmentModal: React.FC<EditGarmentModalProps> = ({ garment, onClose, onSave, onDelete }) => {
  const [name, setName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (garment) {
      setName(garment.name);
      setImagePreviewUrl(garment.url);
      setNewImageFile(null); // Reset file on new garment
    }
  }, [garment]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      
      // Clean up previous blob URL if it exists
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      setImagePreviewUrl(newPreviewUrl);
    }
  };
  
  const handleSave = () => {
    if (!garment || !name.trim()) return;
    const updatedGarment = { ...garment, name: name.trim() };
    onSave(updatedGarment, newImageFile || undefined);
  };
  
  const handleDelete = () => {
    if (garment && window.confirm(`Are you sure you want to delete "${garment.name}"? This action cannot be undone.`)) {
      onDelete(garment.id);
    }
  };

  const handleClose = () => {
    // Clean up blob URL if a new image was selected but not saved
    if (newImageFile && imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {garment && (
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
            className="relative bg-white rounded-2xl w-full max-w-md flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-serif tracking-wider text-gray-800">Edit Garment</h2>
              <button onClick={handleClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                <XIcon className="w-6 h-6"/>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-shrink-0">
                  <img src={imagePreviewUrl || ''} alt="Garment preview" className="w-28 h-28 object-cover rounded-lg border bg-gray-100"/>
                  <button onClick={() => fileInputRef.current?.click()} className="mt-2 w-full text-sm font-medium text-center text-gray-600 hover:text-gray-900 transition-colors">
                    Change Image
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
                <div className="w-full">
                  <label htmlFor="garmentName" className="block text-sm font-medium text-gray-700">Garment Name</label>
                  <input 
                    type="text" 
                    id="garmentName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                aria-label="Delete garment"
              >
                <Trash2Icon className="w-4 h-4"/>
                Delete
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditGarmentModal;
