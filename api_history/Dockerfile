# Use a lightweight Python base image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy and install dependencies first (for caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port your Flask app runs on
EXPOSE 5002

# Command to run the app (assumes your entry file is app.py; adjust if needed)
CMD ["python", "app.py"]