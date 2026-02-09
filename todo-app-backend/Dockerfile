# Base image
FROM node:24.13-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose backend port
EXPOSE 3000

# Run app
CMD ["npm", "run", "dev"]
