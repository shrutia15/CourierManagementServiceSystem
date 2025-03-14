# Use Node.js as the build stage
FROM node:22-alpine AS build

# Set the working directory to the frontend folder
WORKDIR /app/frontend

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . . 

# Build the React app
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Set working directory to Nginx serving folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy the build output from the previous stage
COPY --from=build /app/frontend/build .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
