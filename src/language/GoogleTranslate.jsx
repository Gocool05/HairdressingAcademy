import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      // Dynamically load the Google Translate script
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear previous instances
      }

      // Check if Google Translate is available
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en', // Your default language
            includedLanguages: 'en,es,fr,de,hi,ta', // Add more languages if needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element' // Target element for the widget
        );
      } else {
        console.error('Google Translate API is not available.');
      }
    };

    // Check if Google Translate script is already loaded, if not load it
    if (!window.google || !window.google.translate) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => {
        // Initialize the Google Translate widget after the script loads
        window.googleTranslateElementInit = initializeGoogleTranslate;
      };
      script.onerror = () => {
        console.error('Failed to load the Google Translate script.');
      };
      document.body.appendChild(script);
    } else {
      initializeGoogleTranslate(); // If already loaded, initialize directly
    }
  }, []);

  return (
    <div>
      <div
        id="google_translate_element"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: '9999',
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '5px',
        }}
      ></div>

      <h1>Welcome to My Dynamic Website</h1>
      <p>
        This is an example of a dynamically translatable website. Use the Google Translate
        dropdown to translate the content into different languages.
      </p>
    </div>
  );
};

export default GoogleTranslate;
