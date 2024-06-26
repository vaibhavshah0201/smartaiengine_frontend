/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "2204", // @@@
      database: "next-js-registration-login-example",
    },
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    // apiUrl: "http://localhost:3000/api", // production api
    apiUrl: "http://localhost:8000", // local api
  },
};


export default nextConfig;
