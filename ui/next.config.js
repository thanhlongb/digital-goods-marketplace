/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_PRODUCT_SERVICE:        process.env.API_PRODUCT_SERVICE,
    API_PRODUCT_UPLOAD_SERVICE: process.env.API_PRODUCT_UPLOAD_SERVICE,
    API_PRODUCT_CDN:            process.env.API_PRODUCT_CDN,
    API_USER_SERVICE:           process.env.API_USER_SERVICE
  },
}
