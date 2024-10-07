/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionDelay: {
        '0': '0s',
        '1': '0.6s',
        '2': '1.2s',
        '3': '1.8s',
        '4': '2.4s',
      },
      boxShadow: {
        "book-shadow": "0 11px 20px rgba(0, 0, 0, 0.7)", // 부드러운 그림자
      },
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
        main: "#5F6F52",
        sub1: "#C0C78C",
        sub2: "#A6B37D",
        sub3: "#FEFAE0",
        sub4: "#B99470",
        sub5: "#EBE3D5",
        sub6: "#B0A695",
        sub7: "#776B5D",
        sub8: "#79AC78",
        sub9: "#D96363",
        "najackdo-background": "#F8F6F3",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #79AC78, 0 0 10px #79AC78" },
          "50%": { boxShadow: "0 0 20px #79AC78, 0 0 30px #79AC78" },
        },
        bounceTwice: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' }, // 시작과 끝은 원래 위치
          '35%': { transform: 'translateX(-5px)' },  // 왼쪽으로 이동
          '65%': { transform: 'translateX(5px)' },   // 오른쪽으로 이동
        },
        swing: {
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        swing: 'swing 1s ease-in-out ',
        swing2: 'swing 1.2s ease-in-out ',
        shake: 'shake 1.5s ease-in-out ', 
        glow: "glow 2s ease-in-out infinite",
        bounceTwice: "bounceTwice 1s ease-in-out",
        bounceTwice2: "bounceTwice 1.8s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        fadeIn2: "fadeIn 3s ease-in-out forwards",
        slideUp: "slideUp 1.5s ease-in-out",
        slideDown: "slideDown 1.5s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
