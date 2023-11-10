# Use the cypress included image as the base
FROM cypress/included:latest

# Set the working directory
WORKDIR /e2e

# Copy the current directory contents into the container at /e2e
COPY . /e2e

# Run the command
CMD ["npm", "run", "cypress:run"]