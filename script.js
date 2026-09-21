// State Management for UI components
let tickets = [];

document.getElementById('ticketForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newTicket = {
    id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
    category: document.getElementById('ticketCategory').value,
    urgency: document.getElementById('ticketUrgency').value,
    description: document.getElementById('ticketDesc').value,
    status: 'New',
    timestamp: new Date().toLocaleTimeString()
  };
  
  tickets.push(newTicket);
  renderTicketsTable();
  this.reset();
});

function renderTicketsTable() {
  // Logic to dynamically generate interactive table rows with status badges
}

