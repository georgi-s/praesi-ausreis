/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        hop: {
          "0%, 100%": { transform: "translateY(0)" }, // Start- und Endposition
          "5%": { transform: "translateY(-1px)" },
          "15%": { transform: "translateY(-2px)" },
          "25%": { transform: "translateY(-3px)" },
          "35%": { transform: "translateY(-4px)" },
          "45%": { transform: "translateY(-5px)" },
          "55%": { transform: "translateY(-6px)" },
          "65%": { transform: "translateY(-7px)" },
          "75%": { transform: "translateY(-6px)" },
          "85%": { transform: "translateY(-5px)" },
          "95%": { transform: "translateY(-3px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        dash: {
          to: { strokeDashoffset: "1000" },
        },
        glow: {
          from: { strokeOpacity: "0.6" },
          to: { strokeOpacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        dash: "dash 2s linear infinite",
        glow: "glow 1.5s ease-in-out infinite",
        hop: "hop 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate", "@tailwindcss/aspect-ratio")],
};
