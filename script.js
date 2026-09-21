/**
 * Tharpe IT Services - Portal Interactivity
 * This script manages the user-friendly review system and modern ticketing dashboard.
 */

document.addEventListener("DOMContentLoaded", function () {
    // Core Data Arrays
    let supportTickets = [];
    let customerReviews = [];

    // DOM Elements Linking to HTML
    const ticketForm = document.getElementById('ticketForm');
    const reviewForm = document.getElementById('reviewForm');
    const ticketList = document.getElementById('ticketList');
    const reviewFeedback = document.getElementById('reviewFeedback');

    // ==========================================
    // 🎫 MODERN TICKETING DASHBOARD MANAGEMENT
    // ==========================================
    if (ticketForm) {
        ticketForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Capture intake fields
            const category = document.getElementById('ticketCategory').value;
            const urgency = document.getElementById('ticketUrgency').value;
            const description = document.getElementById('ticketDesc').value;

            // Generate structured ticket object
            const newTicket = {
                id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
                category: category,
                urgency: urgency,
                description: description,
                status: 'New', // Standard baseline IT state
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            // Push to application state
            supportTickets.push(newTicket);
            
            // Update Dashboard View
            renderTicketsDashboard();
            
            // Clear input fields safely
            ticketForm.reset();
        });
    }

    function renderTicketsDashboard() {
        if (!ticketList) return;
        
        // Reset old layout container
        ticketList.innerHTML = ''; 

        if (supportTickets.length === 0) {
            ticketList.innerHTML = '<li class="no-tickets">No active support items.</li>';
            return;
        }

        // Dynamically loop and build dashboard items
        supportTickets.forEach(ticket => {
            const li = document.createElement('li');
            li.className = `ticket-item priority-${ticket.urgency.toLowerCase()}`;
            
            // Apply priority custom colors inline as fallback structural protection
            let badgeColor = '#28a745'; // Low priority green
            if (ticket.urgency === 'Medium') badgeColor = '#ffc107'; // Medium yellow
            if (ticket.urgency === 'High') badgeColor = '#dc3545'; // High warning red

            li.innerHTML = `
                <div class="ticket-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong>🆔 ${ticket.id}</strong> 
                    <span class="urgency-badge" style="background: ${badgeColor}; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${ticket.urgency}</span>
                </div>
                <div class="ticket-body">
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Category:</strong> ${ticket.category}</p>
                    <p style="margin: 4px 0; color: #555; font-size: 13px;">${ticket.description}</p>
                </div>
                <div class="ticket-footer" style="margin-top: 8px; font-size: 11px; color: #888; display: flex; justify-content: space-between;">
                    <span>⏳ Status: <strong>${ticket.status}</strong></span>
                    <span>🕒 Generated: ${ticket.timestamp}</span>
                </div>
            `;
            
            // Style the list elements visually
            li.style.background = '#f9f9f9';
            li.style.borderLeft = `5px solid ${badgeColor}`;
            li.style.padding = '12px';
            li.style.marginBottom = '10px';
            li.style.borderRadius = '4px';
            li.style.listStyle = 'none';
            li.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';

            ticketList.appendChild(li);
        });
    }

    // ==========================================
    // ⭐ VISUAL CX REVIEW SYSTEM MANAGEMENT
    // ==========================================
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Extract visual star rating input value
            const checkedRating = document.querySelector('input[name="rating"]:checked');
            const ratingValue = checkedRating ? checkedRating.value : 0;
            const reviewComment = document.getElementById('reviewText').value;

            if (ratingValue === 0) {
                alert('Please select a star rating level before submitting.');
                return;
            }

            const newReview = {
                rating: ratingValue,
                comment: reviewComment,
                date: new Date().toLocaleDateString()
            };

            customerReviews.push(newReview);

            // Display an instant visual confirmation alert
            if (reviewFeedback) {
                reviewFeedback.style.display = "block";
                reviewFeedback.style.padding = "10px";
                reviewFeedback.style.marginTop = "15px";
                reviewFeedback.style.background = "#e6f4ea";
                reviewFeedback.style.border = "1px solid #137333";
                reviewFeedback.style.borderRadius = "4px";
                reviewFeedback.innerHTML = `
                    <p style="color: #137333; margin: 0; font-weight: bold;">
                        ✅ Feedback Submitted! Thank you for rating us ${ratingValue} out of 5 stars.
                    </p>
                `;
            }

            // Reset selection layout
            reviewForm.reset();
        });
    }
});
