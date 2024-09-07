// gateway.config.ts
export default {
  port: parseInt(process.env.GATEWAY_PORT, 10) || 3000,
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  // Add other configuration settings as needed
};
