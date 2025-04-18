const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  {
    sentry: {
      hideSourceMaps: true,
    },
  },
  {
    silent: true,
    org: 'saude-conectada',
    project: 'backend',
  }
); 