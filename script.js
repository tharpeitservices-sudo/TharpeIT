document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Safe Processing hook for your Untouched Ticket Form submission events
    const supportForm = document.getElementById("support-ticket-form");
    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const category = document.getElementById("ticket-category").value;
            const urgency = document.getElementById("ticket-urgency").value;
            const description = document.getElementById("ticket-desc").value;

            // Log details locally so you can see your current logic running perfectly
            console.log("Support Ticket Submitted safely:", { category, urgency, description });
            alert("Support Request logged successfully!");
            
            supportForm.reset();
        });
    }

    // 2. Completely Build and Inject Content Into The Review Interface Section
    const reviewWrapper = document.getElementById("review-root-section");
    if (reviewWrapper) {
        reviewWrapper.innerHTML = `
            <h4>Leave a Review // Rate Our Service</h4>
            <form class="review-composer" id="live-feedback-form">
                <div class="star-input-group">
                    <input type="radio" id="rev-s5" name="star-count" value="5" /><label for="rev-s5">★</label>
                    <input type="radio" id="rev-s4" name="star-count" value="4" /><label for="rev-s4">★</label>
                    <input type="radio" id="rev-s3" name="star-count" value="3" /><label for="rev-s3">★</label>
                    <input type="radio" id="rev-s2" name="star-count" value="2" /><label for="rev-s2">★</label>
                    <input type="radio" id="rev-s1" name="star-count" value="1" /><label for="rev-s1">★</label>
                </div>
                <textarea id="feedback-text-box" placeholder="Write your review or service rating message here..." required></textarea>
                <button type="submit" class="post-review-btn">Submit Review</button>
            </form>
            <div class="reviews-wall" id="injected-reviews-container"></div>
        `;

        const feedbackForm = document.getElementById("live-feedback-form");
        const reviewsContainer = document.getElementById("injected-reviews-container");

        // Use local memory to render user data smoothly across browser reloads
        let reviewDataset = JSON.parse(localStorage.getItem("site_reviews_data")) || [
            { rating: 5, msg: "Outstanding support. Cleared out my malware configuration instantly." }
        ];

        function renderWall() {
            reviewsContainer.innerHTML = "";
            reviewDataset.forEach(post => {
                const block = document.createElement("div");
                block.className = "review-post-card";
                block.innerHTML = `
                    <div class="card-stars-line">${"★".repeat(post.rating)}${"☆".repeat(5 - post.rating)}</div>
                    <div class="card-message">${post.msg}</div>
                `;
                reviewsContainer.appendChild(block);
            });
        }

        feedbackForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const checkedRating = document.querySelector('input[name="star-count"]:checked');
            const messageText = document.getElementById("feedback-text-box").value.trim();

            if (!checkedRating) {
                alert("Please tap a star rating before publishing.");
                return;
            }

            const item = {
                rating: parseInt(checkedRating.value),
                msg: messageText
            };

            reviewDataset.unshift(item);
            localStorage.setItem("site_reviews_data", JSON.stringify(reviewDataset));
            
            feedbackForm.reset();
            renderWall();
        });

        // Initialize display loop execution on load
        renderWall();
    }
});
