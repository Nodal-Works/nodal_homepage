import type { Config } from "tailwindcss"

export default {
  content: ["./layouts/**/*.{html,js}", 
    "./content/**/*.{md,html}"],
  theme: {
    extend: {
      colors: {
        blog: "#f9a8d4",
        darkblog: "#5eead4",
      },
    },
  },
  plugins: [],
} satisfies Config