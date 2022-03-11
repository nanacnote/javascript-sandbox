# Use the official image as a parent image.
FROM node:current-slim

# Adds meta data to image
LABEL maintainer="Owusu K <adjeibohyen@hotmail.co.uk>" \
    description="this container is setup to provide a consistent dev environment"

# Set the working directory.
WORKDIR /usr/src/app

# Install git in container
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 9001

# Run the specified command within the container.
# CMD [ "npm", "run", "dev" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .