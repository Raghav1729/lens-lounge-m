version: '3'
services:
  api-gateway:
    build: ./apps/api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - AUTH_SECRET_KEY=supersecret
    depends_on:
      - backend
      - payment-service
      - frontend

  backend:
    build: ./apps/backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development

  payment-service:
    build: ./apps/payment-service
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=development

  frontend:
    build: ./apps/frontend
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=development
    stdin_open: true # keep the container running
    tty: true # allocate a pseudo-TTY
