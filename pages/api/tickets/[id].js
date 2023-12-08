import { updateTicketStatus } from "../../../db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedTicket = await updateTicketStatus(id, req.body.status);
      res.status(200).json(updatedTicket);
    } catch (error) {
      console.error(`Error in PUT tickets/${id}:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
