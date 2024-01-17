# Backend for My Portfolio Projects

This repository contains the backend code for my portfolio projects website. The backend is responsible for serving data and handling requests for the integrated applications - the Book Store App and the Food Ordering App.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Introduction

The backend is built using Node.js, Express, MongoDB, and TypeScript. It provides RESTful APIs to interact with the Book Store App and the Food Ordering App.

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-backend.git

# Navigate to the project directory
cd your-backend

# Install dependencies
npm install
```

## Usage

```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

The server will run on the specified port, and you can access it at `http://localhost:5555` by default.

## Endpoints

### `/`

- **Method:** GET
- **Description:** Root endpoint to check if the server is running.
- **Example:** `http://localhost:5555/`

### `/books`

- **Method:** GET
- **Description:** Get a list of books.
- **Example:** `http://localhost:5555/books`

### `/food`

- **Method:** GET
- **Description:** Get information about food orders.
- **Example:** `http://localhost:5555/food`

## Environment Variables

Make sure to create a `.env` file in the root directory with the following variables:

```env
PORT=5555
MANGO=mongodb://your-mongodb-url
```

Replace `your-mongodb-url` with the actual MongoDB connection URL.

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Your feedback and suggestions are highly appreciated.
