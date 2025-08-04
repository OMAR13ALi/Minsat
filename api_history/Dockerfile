# Use an official Python runtime as a parent image
FROM python:3.9-alpine

# Set the working directory in the container
WORKDIR /app

COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app


# Make port 5000 available to the world outside this container
EXPOSE 5000


# Command to run the database creation script and then start the flask app
CMD ["python","app.py"]
