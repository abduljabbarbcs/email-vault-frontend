# Use the official Node.js image as a base
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5173

# Start the development server
CMD ["pnpm", "dev"]
