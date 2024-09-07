# Step 1: Build the React application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Step 2: Serve the React application
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
