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
        // Default container configuration for centering and padding
        container: {
            center: true,
            padding: '2rem', // Default padding for containers
            screens: {
                '2xl': '1400px' // Max width for the container on 2xl screens
            }
        },

        // --- Theme Extensions ---
        // Use 'extend' to add customizations without overwriting Tailwind defaults
        extend: {
            // --- START: Project-Specific Font Families ---
            // Define custom font families. Ensure the fonts are imported/linked in your project.
            fontFamily: {
                sans: ['Poppins', 'Inter', 'sans-serif'], // Default sans-serif stack from --font-family-base
                heading: ['Poppins', 'Inter', 'sans-serif'], // Heading font stack from --font-family-heading
                mono: ['ui-monospace', 'Menlo', 'Monaco', 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace'], // Mono font stack from --font-family-mono
            },
            // --- END: Project-Specific Font Families ---

            // --- Color Palette ---
            colors: {
                // Base colors (typically controlled by CSS variables for theming)
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))', // Used for focus rings, etc.
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))' // Text color on primary background
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
                    foreground: 'hsl(var(--muted-foreground))' // Often used for subtle text or backgrounds
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
                // Sidebar specific colors (if using a distinct sidebar theme)
                // sidebar: {
                //  DEFAULT: 'hsl(var(--sidebar-background))',
                //  foreground: 'hsl(var(--sidebar-foreground))',
                //  primary: 'hsl(var(--sidebar-primary))',
                //  'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                //  accent: 'hsl(var(--sidebar-accent))',
                //  'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                //  border: 'hsl(var(--sidebar-border))',
                //  ring: 'hsl(var(--sidebar-ring))'
                // },

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
            // Uses CSS variable for easy global adjustment
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },

            // --- Keyframes for Animations ---
            keyframes: {
                // Common animations (e.g., for Accordion components)
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },

                // --- START: Project-Specific Keyframes ---
                // Added based on @keyframes found in index.css
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
                // Added based on animation utilities found in index.css
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                // --- END: Project-Specific Animations ---
            },

            // --- START: Project-Specific Box Shadows ---
            boxShadow: {
                // Add custom shadows if needed based on project design
            },
            // --- END: Project-Specific Box Shadows ---

            // --- START: Project-Specific Background Images ---
            backgroundImage: {
                // Add custom background images or gradients if needed
            },
            // --- END: Project-Specific Background Images ---
        }
    },

    // --- Tailwind CSS Plugins ---
    plugins: [
        require("tailwindcss-animate"), // Essential for the keyframes/animations defined above
        require('@tailwindcss/forms'),     // Required for form styling based on project description
        require('@tailwindcss/typography'), // Recommended for content-rich pages like destination details
        // DO NOT ADD ANY OTHER PLUGINS.
    ],
} satisfies Config;