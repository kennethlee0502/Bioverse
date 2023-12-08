import { createTicket, getTickets } from "../../../db"; // Adjust the path to your db file

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tickets = await getTickets();
      res.status(200).json(tickets);
    } catch (error) {
      console.error("Error in GET tickets", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const newTicket = await createTicket(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      console.error("Error in POST tickets", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
