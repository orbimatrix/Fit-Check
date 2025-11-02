# Fit Check: AI-Powered Virtual Try-On

An interactive web application that allows you to become your own fashion model. Upload a photo of yourself and virtually try on different clothing items to see how they fit your style, all powered by the Google Gemini API.

<img width="1920" height="978" alt="image" src="https://github.com/user-attachments/assets/8bed7c91-f411-4256-a15e-00a6d41ee1ea" />


## ✨ Features

- **Personal AI Model Creation:** Transform a personal photo into a realistic, full-body fashion model ready for styling.
- **Virtual Wardrobe:** Select from a default set of garments or upload your own clothing images.
- **Outfit Stacking:** Layer multiple garments to create and visualize complete outfits.
- **Dynamic Poses:** Change the model's pose to view your outfit from various angles and perspectives.
- **Interactive UI:** A smooth, responsive interface with animations, designed for both desktop and mobile use.
- **Before & After Comparison:** An interactive slider to compare your original photo with the generated AI model.

## 🚀 How It Works

This application leverages the multi-modal capabilities of the Gemini `gemini-2.5-flash-image` model to perform sophisticated image editing and generation tasks.

1.  **Model Generation:** When a user uploads a photo, it's sent to the Gemini API with a detailed prompt instructing it to create a photorealistic fashion model. The prompt emphasizes preserving the user's identity and body type while standardizing the pose and background for a professional look.
2.  **Virtual Try-On:** To "wear" a garment, the application sends the current model image and a garment image to the API. The prompt acts as a set of crucial rules: completely replace the original clothing, preserve the model and background, and realistically adapt the new garment to the model's pose with proper lighting and shadows.
3.  **Pose Variation:** When a new pose is requested, the current image of the model wearing the outfit is sent back to the API with a simple instruction to regenerate it from a different perspective (e.g., "Side profile view"), while keeping the person, clothing, and style identical.

   <img width="1914" height="980" alt="image" src="https://github.com/user-attachments/assets/d77067f1-1a74-42d2-a6f5-c4f4264c26de" />
   <img width="1213" height="640" alt="image" src="https://github.com/user-attachments/assets/d968be86-5e02-4787-8217-012496039be5" />



## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **AI/ML:** [Google Gemini API](https://ai.google.dev/gemini-api) (`gemini-2.5-flash-image` model)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** Includes a custom interactive image comparison slider and particle effects with [tsParticles](https://particles.js.org/).

## 📦 Project Structure

```
.
├── components/         # Reusable React components
│   ├── StartScreen.tsx # Initial photo upload screen
│   ├── Canvas.tsx      # Main view with model and pose controls
│   ├── OutfitStack.tsx # UI for layered garments
│   └── WardrobeModal.tsx # Panel for selecting/uploading clothes
├── lib/                # Utility functions
│   └── utils.ts
├── services/           # API communication layer
│   └── geminiService.ts# Logic for all Gemini API calls
├── App.tsx             # Main application component
├── index.html          # Entry point
└── wardrobe.ts         # Default wardrobe data
```

## 🏃‍♀️ Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This project uses ES modules imported via an `importmap` in `index.html`, so there are no traditional `npm` dependencies to install for the base libraries. If you were to build this with a bundler, you would run:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up your API Key:**
    The application requires a Google Gemini API key.
    - Get your key from [Google AI Studio](https://makersuite.google.com/).
    - The application expects the key to be available as an environment variable `API_KEY`. You will need to set this up in your local development environment (e.g., using a `.env` file with a tool like Vite or Create React App).

4.  **Run the development server:**
    Open `index.html` in your browser, preferably using a live server extension to handle module loading correctly.

## 💡 Remix & Extension Ideas

The application is built to be easily extendable. Here are a few ideas (some from the app's footer!):

- **E-commerce Integration:** Use the Gemini API to find real-world clothing items that look similar to the ones being tried on.
- **Accessorize:** Expand the wardrobe to include accessories like hats, sunglasses, bags, and shoes.
- **Style Recommendations:** Implement a "style score" or a recommendation engine that suggests complementary items.
- **Save & Share:** Allow users to save their favorite created outfits to a personal lookbook and share them on social media.
- **Color Variations:** Add a feature to change the color of a garment dynamically using an AI prompt.

## 📄 License

This project is licensed under the Apache License, Version 2.0. All code files should include the SPDX license identifier.
