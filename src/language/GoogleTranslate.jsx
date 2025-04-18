import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Prevent multiple containers
    if (!document.getElementById("google_translate_element")) {
      const container = document.createElement("div");
      container.id = "google_translate_element";
      container.style.position = "fixed";
      container.style.bottom = "10px";
      container.style.right = "10px";
      container.style.zIndex = "9999";
      document.body.appendChild(container);

      // Load the script only if it’s not already present
      if (!document.querySelector("script[src*='translate_a/element.js']")) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Init function MUST be globally defined
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,ta,fr",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        };
      }
    }
  }, []);

  return null;
};

export default GoogleTranslate;
