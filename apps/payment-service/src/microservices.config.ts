// /apps/payment-service/src/microservices.config.ts
const servicePort = process.env.SERVICE_PORT;
export default {
  port: servicePort ? parseInt(servicePort, 10) : 3002,
  // Add other service-specific settings as needed
};
