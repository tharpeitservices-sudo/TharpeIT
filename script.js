// ==========================================================================
// THARPE IT SYSTEMS - MODULAR STAR REVIEW COMPONENT INTERFACE
// ==========================================================================
(function() {
    function initializeReviewWidget() {
        const reviewForm = document.getElementById("live-user-review-form") || document.getElementById("fallback-review-form");
        const reviewsWall = document.getElementById("live-reviews-display-wall") || document.getElementById("fallback-reviews-render-wall");

        if (!reviewForm || !reviewsWall) return;

        // Loads reviews from browser persistent memory cache layout safely
        let dataset = JSON.parse(localStorage.getItem("tharpe_dynamic_reviews")) || [
            { rating: 5, msg: "Outstanding support. Cleared out my malware configuration instantly." }
        ];

        function refreshDisplay() {
            reviewsWall.innerHTML = "";
            dataset.forEach(post => {
                const element = document.createElement("div");
                element.className = "review-post-card";
                element.innerHTML = `
                    <div class="card-stars-line" style="color: #a855f7; margin-bottom: 4px;">${"★".repeat(post.rating)}${"☆".repeat(5 - post.rating)}</div>
                    <div class="card-message" style="color: #d1d1d1; font-size: 0.9rem;">${post.msg}</div>
                `;
                reviewsWall.appendChild(element);
            });
        }

        reviewForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputRating = reviewForm.querySelector('input[type="radio"]:checked');
            const inputText = reviewForm.querySelector("textarea") ? reviewForm.querySelector("textarea").value.trim() : "";

            if (!inputRating) {
                alert("Please click on a star rating option before submitting your review.");
                return;
            }

            dataset.unshift({
                rating: parseInt(inputRating.value),
                msg: inputText
            });

            localStorage.setItem("tharpe_dynamic_reviews", JSON.stringify(dataset));
            reviewForm.reset();
            refreshDisplay();
        });

        refreshDisplay();
    }

    // Runs checking loop safely across standard window runtime boots
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeReviewWidget);
    } else {
        initializeReviewWidget();
    }
})();
