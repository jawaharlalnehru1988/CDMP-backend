# Use Node.js as the base image
FROM node:18
# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files and package-lock.json first (for efficient caching)
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

# Expose the port the Express server will run on
EXPOSE 3000

# Compile TypeScript to JavaScript
RUN npm run build

# Run the command to start the server when the container launches
CMD ["node", "dist/server.js"]
