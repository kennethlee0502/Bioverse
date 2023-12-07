const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const { createTicket, getTickets, updateTicketStatus } = require("./db");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // API route for creating a new ticket
  server.post("/api/tickets", async (req, res) => {
    try {
      const newTicket = await createTicket(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      console.error("Error in POST tickets", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route for retrieving all tickets
  server.get("/api/tickets", async (req, res) => {
    try {
      const tickets = await getTickets();
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error in GET tickets", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // API route for updating a ticket's status
  server.put("/api/tickets/:id", async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { status } = req.body;
      const updatedTicket = await updateTicketStatus(ticketId, status);
      res.status(200).json(updatedTicket);
    } catch (error) {
      console.error(`Error in PUT tickets/${ticketId}:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Handling all other requests
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
