const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "bioverse",
  port: 5432,
});

// Function to create a new ticket
const createTicket = async ({ name, email, description }) => {
  const result = await pool.query(
    "INSERT INTO tickets (name, email, description) VALUES ($1, $2, $3) RETURNING *",
    [name, email, description]
  );
  return result.rows[0];
};

// Function to get all tickets
const getTickets = async () => {
  const result = await pool.query("SELECT * FROM tickets");
  return result.rows;
};

// Function to update a ticket's status
const updateTicketStatus = async (ticketId, newStatus) => {
  const result = await pool.query(
    "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
    [newStatus, ticketId]
  );
  return result.rows[0];
};

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        description TEXT,
        status VARCHAR(50) DEFAULT 'New'
      );
    `;

    await pool.query(createTableQuery);
    console.log("Table 'tickets' is set up.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

module.exports = {
  pool,
  createTicket,
  getTickets,
  updateTicketStatus,
  initializeDatabase,
};

// Call the initialize function
initializeDatabase();
