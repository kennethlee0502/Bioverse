import React, { useState, useEffect } from "react";
import "../styles/home.css";

const IndexPage = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState(""); // State to handle errors as a string

  // Function to fetch tickets from the server
  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        setError(""); // Clear error if any
      } else {
        throw new Error("Failed to fetch tickets");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (response.ok) {
        setNewTicket({ name: "", email: "", description: "" });
        await fetchTickets();
        setError(""); // Clear error if any
      } else {
        throw new Error("Failed to create a ticket");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setTickets(
          tickets.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
          )
        );
        setError(""); // Clear error if any
      } else {
        throw new Error("Failed to update ticket status");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <h1>Help Desk Ticket System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTicket.name}
          onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={newTicket.email}
          onChange={(e) =>
            setNewTicket({ ...newTicket, email: e.target.value })
          }
          placeholder="Email"
          required
        />
        <textarea
          value={newTicket.description}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
          placeholder="Description"
          required
        />
        <button type="submit">Submit Ticket</button>
      </form>

      <h2>Existing Tickets</h2>
      <div className="tickets-container">
        {tickets.map((ticket) => (
          <div className="ticket" key={ticket.id}>
            <h3>Name: {ticket.name}</h3>
            <p>Email: {ticket.email}</p>
            <p>Description: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <select
              value={ticket.status}
              onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>{" "}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
