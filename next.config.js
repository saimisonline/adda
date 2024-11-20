const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA({
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "adda-cws.vercel.app",
    ],
  },
});
