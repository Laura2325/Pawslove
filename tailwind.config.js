tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#6c40d1',
        secondary: '#fc6dab',
        accent: '#17b890',
        light: '#ecf0f1',
        dark: '#34252f',
      },
      borderRadius: {
        nav: '24px',
      },
      spacing: {
        spacing: '1rem',
      },
      boxShadow: {
        nav: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        fredoka: ['Fredoka One', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'custom': '24px'
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards"
      }
    }
  }
};
