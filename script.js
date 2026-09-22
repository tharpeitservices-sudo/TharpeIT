document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. UNTOUCHED SUPPORT TICKET HANDLING
    // ==========================================
    const supportForm = document.getElementById("support-ticket-form");
    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Collects your existing form values securely
            const category = document.getElementById("ticket-category").value;
            const urgency = document.getElementById("ticket-urgency").value;
            const description = document.getElementById("ticket-desc").value;

            console.log("Support Ticket Logged:", { category, urgency, description });
            alert("Support Request submitted successfully!");
            
            supportForm.reset();
        });
    }

    // ==========================================
    // 2. LIVE INTERACTIVE CUSTOMER REVIEW SYSTEM
    // ==========================================
    const fallbackForm = document.getElementById("fallback-review-form");
    const renderWall = document.getElementById("fallback-reviews-render-wall");

    if (fallbackForm && renderWall) {
        // Loads reviews from browser local memory, or keeps a default 5-star review if empty
        let reviewsList = JSON.parse(localStorage.getItem("local_reviews_data")) || [
            { rating: 5, msg: "Outstanding support. Cleared out my malware configuration instantly." }
        ];

        // Function to build out and display the reviews list on the screen
        function redrawReviews() {
            renderWall.innerHTML = "";
            reviewsList.forEach(item => {
                const card = document.createElement("div");
                card.className = "review-post-card";
                card.innerHTML = `
                    <div class="card-stars-line">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</div>
                    <div class="card-message">${item.msg}</div>
                `;
                renderWall.appendChild(card);
            });
        }

        // Handles what happens when a user clicks "Submit Review"
        fallbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const chosenRating = document.querySelector('input[name="fallback-stars"]:checked');
            const userMsg = document.getElementById("fallback-text-area").value.trim();

            if (!chosenRating) {
                alert("Please select a star rating before submitting.");
                return;
            }

            // Save the new review to the dataset list
            reviewsList.unshift({
                rating: parseInt(chosenRating.value),
                msg: userMsg
            });

            // Write the updated list back into browser memory
            localStorage.setItem("local_reviews_data", JSON.stringify(reviewsList));
            
            // Clear out the input boxes and update the user display wall
            fallbackForm.reset();
            redrawReviews();
        });

        // Initialize and display the reviews wall when the page loads
        redrawReviews();
    }
});
