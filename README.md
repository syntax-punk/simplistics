# Simplistics

Simplistics is a simple web statistics solution designed to provide basic analytics for web applications. This project offers an easy-to-deploy, lightweight alternative for tracking and visualizing web traffic and user interactions.

## Features

- Track basic web statistics
- Store data in SQLite database
- Dockerized setup for easy deployment
- Simple API for accessing statistics

## Prerequisites

- Node.js
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/syntax-punk/simplistics.git
    cd simplistics
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

### Using Node.js

1. Start the application:

    ```bash
    npm start  # Start the production server
    ```

    ```bash
    npm run start:server  # Start the development server
    ```

2. Access the application at `http://localhost:5055`.

### Using Docker

1. Build and run the Docker container:

    ```bash
    docker-compose up --build
    ```

2. Access the application at `http://localhost:5055`.

### Docker Hub


The application is also available on Docker Hub [here](https://hub.docker.com/r/monollect/simplistics) and you can pull the image and run the container using the following commands:

    ```bash
    docker pull monollect/simplistics
    docker run -p 5055:5055 monollect/simplistics
    ```

## Configuration

The application can be configured using environment variables. Create a `.env` file in the root directory and add the following variables:
  - `PORT=3000`
  - `DB=store.db`
