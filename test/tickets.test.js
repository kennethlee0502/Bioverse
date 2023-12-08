const chai = require("chai");
const expect = chai.expect;

describe("Tickets API", () => {
  let fetch;

  before(async () => {
    fetch = (await import("node-fetch")).default;
  });

  // Test for fetching all tickets
  it("should fetch all tickets", async () => {
    const response = await fetch("http://localhost:3000/api/tickets");
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array");
  });

  // Test for creating a new ticket
  it("should create a new ticket", async () => {
    const newTicket = {
      name: "John Doe",
      email: "johndoe@example.com",
      description: "Test ticket description",
    };

    const response = await fetch("http://localhost:3000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });
    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.include.keys(
      "id",
      "name",
      "email",
      "description",
      "status"
    );
    expect(data.name).to.equal(newTicket.name);
    expect(data.email).to.equal(newTicket.email);
    expect(data.description).to.equal(newTicket.description);
  });

  // Test for updating a ticket's status
  it("should update a ticket's status", async () => {
    // Assuming there's a ticket with ID 1 for testing
    const ticketId = 1;
    const newStatus = "Resolved";

    const response = await fetch(
      `http://localhost:3000/api/tickets/${ticketId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("status", newStatus);
  });
});
