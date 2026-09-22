document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. UNTOUCHED SUPPORT TICKET HANDLING
    // ==========================================
    const supportForm = document.getElementById("support-ticket-form");
    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Support Request logged successfully!");
            supportForm.reset();
        });
    }

    // ==========================================
    // 2. LIVE INTERACTIVE CUSTOMER REVIEW SYSTEM
    // ==========================================
    const reviewForm = document.getElementById("live-user-review-form");
    const reviewsWall = document.getElementById("live-reviews-display-wall");

    if (reviewForm && reviewsWall) {
        // Loads reviews from browser local memory, or keeps a default 5-star review if empty
        let activeReviews = JSON.parse(localStorage.getItem("tharpe_reviews_list")) || [
            { rating: 5, msg: "Outstanding support. Cleared out my malware configuration instantly." }
        ];

        // Function to build out and display the reviews list on the screen
        function renderReviewsToWall() {
            reviewsWall.innerHTML = "";
            activeReviews.forEach(item => {
                const card = document.createElement("div");
                card.className = "review-post-card";
                card.innerHTML = `
                    <div class="card-stars-line">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</div>
                    <div class="card-message">${item.msg}</div>
                `;
                reviewsWall.appendChild(card);
            });
        }

        // Handles what happens when a user clicks "Submit Review"
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkedStar = document.querySelector('input[name="review-stars"]:checked');
            const message = document.getElementById("review-text-input").value.trim();

            if (!checkedStar) {
                alert("Please click on a star rating level before submitting your review.");
                return;
            }

            // Save the new review to the dataset list
            activeReviews.unshift({
                rating: parseInt(checkedStar.value),
                msg: message
            });

            // Write the updated list back into browser memory
            localStorage.setItem("tharpe_reviews_list", JSON.stringify(activeReviews));
            
            // Clear out the input boxes and update the user display wall
            reviewForm.reset();
            renderReviewsToWall();
        });

        // Initialize and display the reviews wall when the page loads
        renderReviewsToWall();
    }
});
