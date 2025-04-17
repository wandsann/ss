const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: 'saude-conectada',
  project: 'frontend',
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions
); 