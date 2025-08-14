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
                        'nav': '24px',
                    },
                    spacing: {
                        'spacing': '1rem',
                    },
                    boxShadow: {
                        'nav': '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }
                }
            }
        }
    
module.exports = {
  prefix: 'tw-', // Ahora todas las clases serán tw-bg-gray-100, tw-rounded-[24px], etc.
}
