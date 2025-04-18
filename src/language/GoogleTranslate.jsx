// import { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Avoid adding multiple instances
//     if (document.getElementById("google_translate_element")) return;

//     // Create the container div
//     const div = document.createElement("div");
//     div.id = "google_translate_element";
//     div.style.position = "fixed";
//     div.style.bottom = "10px";
//     div.style.right = "10px";
//     div.style.zIndex = "9999";
//     document.body.appendChild(div);

//     // Add the Google Translate init function
//     window.googleTranslateElementInit = () => {
//       if (!window.google || !window.google.translate) return;
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi,ta,fr", // Add your required languages
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };

//     // Check if the script already exists
//     const existingScript = document.querySelector("script[src*='translate_a/element.js']");
//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//       script.async = true;
//       document.body.appendChild(script);
//     } else {
//       // If already loaded, manually init (for route changes)
//       window.googleTranslateElementInit?.();
//     }

//     // No need to remove the div on unmount — keep it consistent across routes
//   }, []);

//   return null;
// };

// export default GoogleTranslate;
