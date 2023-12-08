# Bioverse

This project is a basic help desk/support system ticket management application built with Next.js, Express.js, Node.js, and PostgreSQL. It allows users to submit support ticket requests and enables support staff to view, respond, and update the status of tickets.

## Features

- End users can submit ticket requests.
- Admin panel for support staff to view and manage tickets.
- Ability to update ticket statuses (New, In Progress, Resolved).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:

   ```bash
   git clone https://github.com/kennethlee0502/bioverse.git
   

2. Navigate to the project directory:

   ```bash
   cd bioverse

   
3. Install NPM packages:
   ```bash
   npm install
   
4. Create a .env file in the root directory and add the following (update values accordingly):
   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase

5. Start the development server:
   ```bash
   npm run dev
   Navigate to http://localhost:3000 in your browser to view the app.

6. Running the Tests:
   ```bash
   npm test

7. Deployment
https://bioverse-533ee4c82f80.herokuapp.com/
