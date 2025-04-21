module.exports = {
               theme: {
                 extend: {
                   animation: {
                     blink: 'blink 1s step-end infinite',
                     typing: 'typing 2s steps(20, end)'
                   },
                   keyframes: {
                     blink: {
                       '0%, 100%': { opacity: '1' },
                       '50%': { opacity: '0' }
                     },
                     typing: {
                       '0%': { width: '0' },
                       '100%': { width: '100%' }
                     }
                   }
                 }
               }
             }