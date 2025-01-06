# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application to the container
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Use a lightweight Node.js image for the final container
FROM node:18-alpine

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy the built files from the builder stage
COPY --from=builder /app ./

# Step 10: Install only production dependencies
RUN npm install --production

# Step 11: Expose the port used by Next.js
EXPOSE 3000

# Step 12: Start the application
CMD ["npm", "start"]
