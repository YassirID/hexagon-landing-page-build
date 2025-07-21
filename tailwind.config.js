import animate from "tailwindcss-animate";

export default {
  darkMode: "class",
  safelist: ["dark"],
  prefix: "",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js"
  ],
  flyonui: {
    themes: ["light", "dark", "gourmet"],
  },
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(-55%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite", 
      },
      height: {
        100: "400px",
      },
      width: {
        25: "100px",
      },
      colors: {
        "light-primary": "#0A58CA",
        "light-primary-2": "#084CAD",
        "light-secondary": "#02B5FF",
        "light-bg": "#F5F6FA",
        "gray-100": "#F2F4F7",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-800": "#1D2939",
        "light-blue-100": "#E0F2FE",
        "blue-gradient-1": "#0C57C3",
        "blue-gradient-2": "#2F84FF",
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
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
    require("@tailwindcss/typography"),
    animate,
  ],
};
