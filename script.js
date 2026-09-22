document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
    setupSupportForm();
});

/* =========================================
   Load Customer Reviews
   ========================================= */

async function loadReviews() {
    const reviewsContainer = document.querySelector(".reviews-grid");

    if (!reviewsContainer) return;

    try {
        const response = await fetch("reviews.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unable to load reviews.");
        }

        const data = await response.json();

        reviewsContainer.innerHTML = "";

        data.customer_reviews.forEach((review) => {
            const card = document.createElement("article");
            card.className = "review-card";

            const rating = Math.max(0, Math.min(5, Number(review.rating)));

            card.innerHTML = `
                <div class="review-stars" aria-label="${rating} out of 5 stars">
                    ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
                </div>

                <p class="review-text">
                    "${escapeHTML(review.text)}"
                </p>

                <span class="review-author">
                    — ${escapeHTML(review.name)}
                </span>
            `;

            reviewsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Reviews could not be loaded:", error);
    }
}

/* =========================================
   Support Form
   ========================================= */

function setupSupportForm() {
    const form = document.querySelector(".support-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        const button = form.querySelector(".btn-submit");

        if (button) {
            button.disabled = true;
            button.textContent = "Submitting...";
        }
    });
}

/* =========================================
   Basic HTML escaping
   ========================================= */

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
