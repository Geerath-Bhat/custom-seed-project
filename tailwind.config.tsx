import type { Config } from "tailwindcss"; 
export default {
    darkMode: ["class"], // Enables dark mode based on the 'class' attribute
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}", // Common path for Next.js App Router
        "./src/**/*.{ts,tsx}",  // Common path for source files
        // Add any other paths where Tailwind classes might be used
    ],
    prefix: "", // No prefix for utility classes (e.g., 'text-primary' instead of 'tw-text-primary')
    theme: {
        // --- Container Settings ---
        container: {
            center: true,
            padding: '2rem', // Default padding for containers
            screens: {
                '2xl': '1400px' // Max width for the container on 2xl screens
            }
        },

        // --- Theme Extensions ---
        extend: {
            // --- Project-Specific Font Families ---
            fontFamily: {
                sans: ['Nunito', 'Helvetica Neue', 'Arial', 'sans-serif'], // From --font-family-base
                heading: ['Poppins', 'Georgia', 'serif'],               // From --font-family-heading
                mono: ['Fira Code', 'monospace'],                    // From --font-family-mono
            },
            // --- END: Project-Specific Font Families ---

            // --- Color Palette ---
            colors: {
                // Base colors (controlled by CSS variables)
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                // Sidebar specific colors (enabled based on CSS vars and prompt)
                sidebar: {
                 DEFAULT: 'hsl(var(--sidebar-background))',
                 foreground: 'hsl(var(--sidebar-foreground))',
                 primary: 'hsl(var(--sidebar-primary))',
                 'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                 accent: 'hsl(var(--sidebar-accent))',
                 'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                 border: 'hsl(var(--sidebar-border))',
                 ring: 'hsl(var(--sidebar-ring))'
                },

                // --- START: Project-Specific Colors ---
                // Added based on CSS variables found in index.css
                success: {
                  DEFAULT: 'hsl(var(--success))',
                  foreground: 'hsl(var(--success-foreground))'
                },
                warning: {
                  DEFAULT: 'hsl(var(--warning))',
                  foreground: 'hsl(var(--warning-foreground))'
                },
                // --- END: Project-Specific Colors ---
            },

            // --- Border Radius ---
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },

            // --- Keyframes for Animations ---
            keyframes: {
                // Common animations
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },

                // --- START: Project-Specific Keyframes ---
                // Added from index.css
                fadeIn: { 
                    from: { opacity: '0' }, 
                    to: { opacity: '1' } 
                },
                slideUp: { 
                    from: { opacity: '0', transform: 'translateY(20px)' }, 
                    to: { opacity: '1', transform: 'translateY(0)' } 
                },
                scaleIn: { 
                    from: { opacity: '0', transform: 'scale(0.95)' }, 
                    to: { opacity: '1', transform: 'scale(1)' } 
                },
                pulse: { 
                    '0%, 100%': { opacity: '1' }, 
                    '50%': { opacity: '.5' } 
                },
                // --- END: Project-Specific Keyframes ---
            },

            // --- Animation Utilities ---
            animation: {
                // Common animations
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',

                // --- START: Project-Specific Animations ---
                // Added from index.css
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                // --- END: Project-Specific Animations ---
            },

            // --- START: Project-Specific Box Shadows ---
            // Added based on "neomorphic" and "soft shadows" prompt
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card-neumorphic': '4px 4px 10px hsl(var(--border) / 0.6), -4px -4px 10px hsl(var(--card))',
                // Add 'card-neumorphic-dark' variations if needed for dark mode
            },
            // --- END: Project-Specific Box Shadows ---

            // --- START: Project-Specific Background Images ---
            // No specific background images requested or found
            // --- END: Project-Specific Background Images ---
        }
    },

    // --- Tailwind CSS Plugins ---
    plugins: [
        require("tailwindcss-animate"), // Essential for keyframes/animations
        require("tailwind-scrollbar"), // Added based on scrollbar styling in index.css
        require('@tailwindcss/forms'), // Added based on prompt mentioning forms/inputs
        // require('@tailwindcss/typography'), // Keep commented unless needed for blog/prose content
    ],
} satisfies Config;
