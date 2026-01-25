module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* Backgrounds */
        paper: "#F6FAE8",     // main background (cream)
        surface: "#EAEAEA",   // cards / inputs
        white: "#FFFFFF",

        /* Brand */
        navy: "#0F1E3A",      // headings / strong elements
        accent: "#F5A623",    // highlights / CTA (yellow)

        /* Text */
        textPrimary: "#111111",
        textMuted: "#6B7280",
      },
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["Lora", "serif"],
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};
