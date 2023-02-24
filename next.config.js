// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  env: {
    REACT_APP_API: "http://localhost:4000",
  },
  images: {
    domains: [
      "static.vecteezy.com",
      "as1.ftcdn.net",
      "i.pinimg.com",
      "img.freepik.com",
      "s1.1zoom.me",
      "encrypted-tbn0.gstatic.com",
      "previews.123rf.com",
      "fotos.perfil.com",
      "png.pngtree.com",
      "scontent.ftuc1-1.fna.fbcdn.net",
      "scontent.ftuc1-2.fna.fbcdn.net",
    ],
  },
};
