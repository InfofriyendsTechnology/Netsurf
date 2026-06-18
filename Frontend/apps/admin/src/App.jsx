import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  useEffect(() => {
    // Load saved theme on app startup
    const savedColor = localStorage.getItem('themeColor') || 'silver';
    const savedDarkMode = localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true';

    // Set data-theme attribute for CSS selectors to handle colors
    document.documentElement.setAttribute('data-theme', savedColor);

    // Always clear inline styles to let CSS [data-theme] selectors work
    document.documentElement.style.removeProperty('--color-accent');
    document.documentElement.style.removeProperty('--color-accent-gradient');

    // Apply dark/light mode classes
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }

    // Load saved font on app startup
    const savedFont = localStorage.getItem('selectedFont') || 'khand';
    const fonts = {
      'khand': '"Khand", sans-serif',
      'system-ui': '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      'sf-pro': '-apple-system, "SF Pro Display", system-ui, sans-serif',
      'inter': '"Inter", sans-serif',
      'poppins': '"Poppins", sans-serif',
      'roboto': '"Roboto", sans-serif',
      'nunito': '"Nunito", sans-serif',
      'open-sans': '"Open Sans", sans-serif',
      'lato': '"Lato", sans-serif',
      'montserrat': '"Montserrat", sans-serif',
      'raleway': '"Raleway", sans-serif',
      'work-sans': '"Work Sans", sans-serif',
      'dm-sans': '"DM Sans", sans-serif',
      'space-grotesk': '"Space Grotesk", sans-serif',
      'noto-sans': '"Noto Sans", "Noto Sans Gujarati", sans-serif'
    };

    const fontImports = {
      'khand': 'https://fonts.googleapis.com/css2?family=Khand:wght@300;400;500;600;700&display=swap',
      'inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
      'roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      'nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap',
      'open-sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
      'lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
      'montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
      'raleway': 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap',
      'work-sans': 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap',
      'dm-sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
      'space-grotesk': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      'noto-sans': 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Noto+Sans+Gujarati:wght@300;400;500;600;700&display=swap'
    };

    if (fonts[savedFont]) {
      document.documentElement.style.setProperty('--font-primary', fonts[savedFont]);
      document.body.style.fontFamily = fonts[savedFont];

      // Load Google Font if needed
      if (fontImports[savedFont]) {
        let link = document.getElementById('google-font-link');
        if (!link) {
          link = document.createElement('link');
          link.id = 'google-font-link';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
        link.href = fontImports[savedFont];
      }
    }
  }, []);

  return <RouterProvider router={router} />;
}
export default App;
