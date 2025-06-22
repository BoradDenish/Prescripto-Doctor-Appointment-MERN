/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF'
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
// module.exports = {
//   content: [
//     './src/**/*.{html,js,jsx,ts,tsx}', // Update to match your project file paths
//   ],
//   theme: {
//     extend: {
//       animation: {
//         fadeIn: 'fadeIn 0.5s ease-in-out forwards',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//       },
//     },
//   },
//   plugins: [],
// };



// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'xs': '475px', // Custom small screen breakpoint
//         'sm': '640px', // Existing breakpoint
//         'md': '768px', // Existing breakpoint
//         'lg': '1024px', // Existing breakpoint
//         'xl': '1280px', // Existing breakpoint
//         '2xl': '1536px', // Existing breakpoint
//       },
//       colors: {
//         'primary': '#5F6FFF', // Bright and modern primary color
//         'secondary': '#FF6F61', // A fresh secondary color for contrast
//         'success': '#28a745', // Green for success
//         'danger': '#dc3545',  // Red for danger (cancelled)
//         'warning': '#ffc107', // Yellow for pending or action needed
//         'info': '#17a2b8',    // Blue for information or neutral state
//         'light-gray': '#f8f9fa', // Light background color
//         'dark-gray': '#343a40',  // Darker text and borders
//         'dark-blue': '#2C3E50',  // Rich blue for accent text
//         'soft-green': '#A3D9A5', // Soft green for success states
//         'soft-red': '#F9C2C2', // Soft red for warning or alerts
//         'card-bg': '#F1F5F9', // Light background for cards
//         'button-bg': '#4CAF50', // Fresh button background color
//         'button-hover': '#45a049', // Slightly darker on hover
//       },
//       fontFamily: {
//         'sans': ['Inter', 'Helvetica', 'Arial', 'sans-serif'], // Modern sans-serif font stack
//         'serif': ['Georgia', 'serif'],
//         'mono': ['Courier New', 'monospace'], // A monospace for code or terminal-like fonts
//       },
//       borderRadius: {
//         'xl': '1.25rem', // Larger border-radius for rounded elements
//         '2xl': '1.5rem', // Extra rounded corners for cards or buttons
//       },
//       boxShadow: {
//         'card': '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft card shadow for a light, elevated feel
//         'hover': '0 8px 20px rgba(0, 0, 0, 0.15)', // Stronger shadow on hover for elements
//         'focus': '0 0 0 2px rgba(58, 131, 255, 0.6)', // Focus shadow for form elements or links
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.7s ease-out',
//         'fade-up': 'fadeUp 0.7s ease-out',
//         'slide-in': 'slideIn 0.5s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//         fadeUp: {
//           '0%': { opacity: 0, transform: 'translateY(20px)' },
//           '100%': { opacity: 1, transform: 'translateY(0)' },
//         },
//         slideIn: {
//           '0%': { opacity: 0, transform: 'translateX(-20px)' },
//           '100%': { opacity: 1, transform: 'translateX(0)' },
//         },
//       },
//       transitionProperty: {
//         'height': 'height',
//         'spacing': 'margin, padding',
//         'background': 'background-color',
//         'color': 'color',
//       },
//       transitionDuration: {
//         '300': '300ms',
//         '500': '500ms',
//         '700': '700ms',
//       },
//       transitionTimingFunction: {
//         'ease-out': 'cubic-bezier(0.25, 0.8, 0.25, 1)', 
//         'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
//       },
//       gridTemplateColumns: {
//         'auto': 'repeat(auto-fill, minmax(250px, 1fr))', // Larger min-width for grid items to have more space
//       },
//     },
//   },
//   plugins: [],
// }
