/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_PRODUCTS: process.env.PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES,
    PLAID_REDIRECT_URI: process.env.PLAID_REDIRECT_URI,
  },
};

module.exports = nextConfig;
