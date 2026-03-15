# Use Node.js LTS version (Prisma 7.5.0+ requires Node 20.19+, 22.12+, or 24+)
FROM node:22-alpine

# Install build dependencies for Prisma and other native packages
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using --frozen-lockfile if lockfile exists is better, but here we just install)
RUN npm install

# Copy project files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
