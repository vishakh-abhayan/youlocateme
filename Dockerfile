# Use the official Node.js 16 image as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install



# Bundle your app's source code inside the Docker image
COPY . .

# COPY docker-compose.yml /usr/src/app/docker-compose.yml

RUN npm i -g pm2

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Define the command to run your app
CMD [ "pm2-runtime", "ecosystem.config.js" ]
