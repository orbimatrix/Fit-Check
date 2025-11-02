/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloudIcon, ImageIcon, SparklesIcon, ShirtIcon, LayersIcon, CameraIcon } from './icons';
import { Compare } from './ui/compare';
import { generateModelImage } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';
import Header from './Header';

interface StartScreenProps {
  onModelFinalized: (modelUrl: string) => void;
}

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    {children}
  </motion.section>
);


const StartScreen: React.FC<StartScreenProps> = ({ onModelFinalized }) => {
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [generatedModelUrl, setGeneratedModelUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // On mount, check if there's a hash and scroll to it.
    // This is for navigating from other pages (like /#about) to a section on the homepage.
    const hash = window.location.hash;
    if (hash && hash !== '#home') {
        const id = hash.substring(1);
        setTimeout(() => { // Timeout to allow DOM to render
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setUserImageUrl(dataUrl);
        setIsGenerating(true);
        setGeneratedModelUrl(null);
        setError(null);
        try {
            const result = await generateModelImage(file);
            setGeneratedModelUrl(result);
        } catch (err) {
            setError(getFriendlyErrorMessage(err, 'Failed to create model'));
            setUserImageUrl(null);
        } finally {
            setIsGenerating(false);
        }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const reset = () => {
    setUserImageUrl(null);
    setGeneratedModelUrl(null);
    setIsGenerating(false);
    setError(null);
  };

  const screenVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const UploadButton = ({ id = "image-upload-start" }: { id?: string }) => (
    <>
      <label htmlFor={id} className="w-full relative flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors">
        <UploadCloudIcon className="w-5 h-5 mr-3" />
        Upload Photo
      </label>
      <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFileChange} />
    </>
  );


  return (
    <AnimatePresence mode="wait">
      {!userImageUrl ? (
        <motion.div
          key="uploader"
          className="w-full flex flex-col items-center"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Header />
          {/* Hero Section */}
          <header id="home" className="w-full min-h-screen flex items-center justify-center p-4 lg:p-8 pt-20">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="max-w-lg">
                  <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Your Style, Your Model. Instantly.
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    Stop guessing. See how clothes actually fit *you*. Upload a photo, and our AI will generate a personal fashion model for a virtual try-on experience like no other.
                  </p>
                  <hr className="my-8 border-gray-200" />
                  <div className="flex flex-col items-center lg:items-start w-full gap-3">
                    <UploadButton />
                    <p className="text-gray-500 text-sm">Select a clear, full-body photo. Face-only photos also work, but full-body is preferred for best results.</p>
                    <p className="text-gray-500 text-xs mt-1">By uploading, you agree not to create harmful, explicit, or unlawful content. This service is for creative and responsible use only.</p>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                <Compare
                  firstImage="https://storage.googleapis.com/gemini-95-icons/asr-tryon.jpg"
                  secondImage="https://storage.googleapis.com/gemini-95-icons/asr-tryon-model.png"
                  slideMode="drag"
                  className="w-full max-w-sm aspect-[2/3] rounded-2xl bg-gray-200"
                />
              </div>
            </div>
          </header>

          {/* How It Works Section */}
          <Section id="how-it-works" className="py-20 lg:py-28 w-full bg-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-serif text-gray-800">How It Works</h2>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Transform your shopping experience in three simple steps.</p>
              <div className="grid md:grid-cols-3 gap-12 mt-16">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-600"/>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-800">1. Upload Your Photo</h3>
                  <p className="mt-2 text-gray-500">Start with any clear photo of yourself. A full-body shot gives the best results.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-8 h-8 text-gray-600"/>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-800">2. AI Creates Your Model</h3>
                  <p className="mt-2 text-gray-500">Our advanced AI generates a realistic, stylable model while preserving your unique look.</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShirtIcon className="w-8 h-8 text-gray-600"/>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-gray-800">3. Style Your Look</h3>
                  <p className="mt-2 text-gray-500">Virtually try on clothes from our wardrobe or even upload your own items to see how they fit.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* Features Section */}
          <Section id="features" className="py-20 lg:py-28 w-full">
             <div className="max-w-7xl mx-auto px-4">
               <div className="text-center">
                  <h2 className="text-4xl font-serif text-gray-800">A New Era of Fashion</h2>
                  <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Explore features designed to give you confidence in every style choice.</p>
               </div>
               <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-8 rounded-lg border border-gray-200/80">
                      <LayersIcon className="w-8 h-8 text-gray-700 mb-4"/>
                      <h3 className="text-xl font-semibold text-gray-800">Mix & Match</h3>
                      <p className="mt-2 text-gray-500">Stack multiple layers to create complete outfits. Unleash your inner stylist.</p>
                  </div>
                   <div className="bg-white p-8 rounded-lg border border-gray-200/80">
                      <CameraIcon className="w-8 h-8 text-gray-700 mb-4"/>
                      <h3 className="text-xl font-semibold text-gray-800">Dynamic Poses</h3>
                      <p className="mt-2 text-gray-500">View your outfit from various angles for a complete 360-degree perspective.</p>
                  </div>
                   <div className="bg-white p-8 rounded-lg border border-gray-200/80">
                      <UploadCloudIcon className="w-8 h-8 text-gray-700 mb-4"/>
                      <h3 className="text-xl font-semibold text-gray-800">Upload Your Own</h3>
                      <p className="mt-2 text-gray-500">Found an item online? Upload its photo and try it on in your virtual dressing room.</p>
                  </div>
                  <div className="bg-white p-8 rounded-lg border border-gray-200/80">
                      <SparklesIcon className="w-8 h-8 text-gray-700 mb-4"/>
                      <h3 className="text-xl font-semibold text-gray-800">Hyper-Realistic</h3>
                      <p className="mt-2 text-gray-500">Powered by Gemini, see realistic fabric drapes, shadows, and fit on your body type.</p>
                  </div>
               </div>
             </div>
          </Section>

          {/* Testimonials Section */}
          <Section id="testimonials" className="py-20 lg:py-28 w-full bg-white">
              <div className="max-w-5xl mx-auto px-4 text-center">
                  <h2 className="text-4xl font-serif text-gray-800">Loved by Fashion Explorers</h2>
                  <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
                      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200/60">
                          <p className="text-gray-700">"This is a game-changer for online shopping! I can finally see how things will look on me before I buy. My confidence in purchasing has skyrocketed."</p>
                          <p className="font-semibold text-gray-900 mt-4">- Alex Johnson</p>
                          <p className="text-sm text-gray-500">Style Maven</p>
                      </div>
                      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200/60">
                          <p className="text-gray-700">"So much fun to play with! I tried on styles I would never have picked in-store and discovered a whole new side of my fashion personality."</p>
                          <p className="font-semibold text-gray-900 mt-4">- Samantha Lee</p>
                          <p className="text-sm text-gray-500">Fashion Explorer</p>
                      </div>
                  </div>
              </div>
          </Section>

          {/* Final CTA Section */}
          <Section className="py-20 lg:py-28 w-full">
              <div className="max-w-xl mx-auto px-4 text-center">
                  <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Ready to Find Your Perfect Fit?</h2>
                  <p className="mt-4 text-lg text-gray-600">Your virtual dressing room awaits. Upload a photo and start your style journey now.</p>
                  <div className="mt-8 max-w-sm mx-auto">
                    <UploadButton id="image-upload-final" />
                  </div>
              </div>
          </Section>

        </motion.div>
      ) : (
        <motion.div
          key="compare"
          className="w-full min-h-screen mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-4"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="md:w-1/2 flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                The New You
              </h1>
              <p className="mt-2 text-md text-gray-600">
                Drag the slider to see your transformation.
              </p>
            </div>
            
            {isGenerating && (
              <div className="flex items-center gap-3 text-lg text-gray-700 font-serif mt-6">
                <Spinner />
                <span>Generating your model...</span>
              </div>
            )}

            {error && 
              <div className="text-center md:text-left text-red-600 max-w-md mt-6">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-sm mb-4">{error}</p>
                <button onClick={reset} className="text-sm font-semibold text-gray-700 hover:underline">Try Again</button>
              </div>
            }
            
            <AnimatePresence>
              {generatedModelUrl && !isGenerating && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                >
                  <button 
                    onClick={reset}
                    className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                    Use Different Photo
                  </button>
                  <button 
                    onClick={() => onModelFinalized(generatedModelUrl)}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
                  >
                    Proceed to Styling &rarr;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <div 
              className={`relative rounded-[1.25rem] transition-all duration-700 ease-in-out ${isGenerating ? 'border border-gray-300 animate-pulse' : 'border border-transparent'}`}
            >
              <Compare
                firstImage={userImageUrl}
                secondImage={generatedModelUrl ?? userImageUrl}
                slideMode="drag"
                className="w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] lg:w-[400px] lg:h-[600px] rounded-2xl bg-gray-200"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartScreen;
