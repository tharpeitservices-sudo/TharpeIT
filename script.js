document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const ticketingForm = document.getElementById('tharpe-ticketing-form');
    const reviewForm = document.getElementById('tharpe-review-form');
    const reviewsContainer = document.getElementById('live-reviews-container');

    // 1. SYSTEM INITIALIZATION: Load and Render Reviews
    initReviews();

    // 2. SUPPORT PORTAL TICKETING HANDLER
    if (ticketingForm) {
        ticketingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents page from breaking or refreshing

            const fullName = document.getElementById('ticket-name').value;
            const issueCategory = document.getElementById('ticket-category').value;
            const specificDetails = document.getElementById('ticket-details').value;

            // Log submission metadata payload
            console.log('--- NEW SUPPORT TICKET SUBMITTED ---');
            console.log('Customer Name:', fullName);
            console.log('Category Selection:', issueCategory);
            console.log('Detailed Message:', specificDetails);
            console.log('Timestamp:', new Date().toISOString());

            // Visual user confirmation update
            alert(`Thank you, ${fullName}! Your ticket regarding "${issueCategory}" has been submitted successfully to our tech hub.`);
            
            // Clean up input fields for next request
            ticketingForm.reset();
        });
    }

    // 3. CUSTOMER REVIEW SUBMISSION HANDLER
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewer-name').value;
            const rating = parseInt(document.getElementById('reviewer-rating').value, 10);
            const comment = document.getElementById('reviewer-comment').value;

            const newReview = {
                name: name,
                rating: rating,
                comment: comment,
                date: new Date().toLocaleDateString()
            };

            // Store review locally so it stays visible during the session
            saveReviewToLocal(newReview);
            
            // Re-render UI module to display new submission at the top
            renderReviewCard(newReview, true);

            // Clean review input grid
            reviewForm.reset();
            alert('Thank you! Your feedback has been dynamically appended to our live feed.');
        });
    }

    // --- HELPER CONTROLLERS ---

    async function initReviews() {
        try {
            // Attempt to pull foundational static reviews archive
            const response = await fetch('reviews.json');
            if (!response.ok) throw new Error('Reviews system structure not found');
            
            const staticReviews = await response.json();
            
            // Clear loading spinner placeholder state
            reviewsContainer.innerHTML = '';

            // Load locally injected session reviews first
            const localReviews = getLocalReviews();
            localReviews.forEach(review => renderReviewCard(review, false));

            // Load permanent file reviews next
            staticReviews.forEach(review => renderReviewCard(review, false));

        } catch (error) {
            console.warn('Could not read reviews.json directly. Falling back to local data:', error);
            reviewsContainer.innerHTML = '';
            
            const localReviews = getLocalReviews();
            if (localReviews.length === 0) {
                reviewsContainer.innerHTML = '<p class="text-white-50 text-center py-4">No reviews posted yet. Be the first!</p>';
            } else {
                localReviews.forEach(review => renderReviewCard(review, false));
            }
        }
    }

    function renderReviewCard(review, insertAtTop) {
        const card = document.createElement('div');
        card.className = 'review-card-item';

        // Build Star string structure matches layout rating scale
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                stars += '<i class="bi bi-star-fill star-rating-color me-1"></i>';
            } else {
                stars += '<i class="bi bi-star me-1 text-secondary"></i>';
            }
        }

        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="mb-0 fw-bold">${escapeHTML(review.name)}</h5>
                <span class="text-white-50 small">${review.date || 'Recent'}</span>
            </div>
            <div class="mb-2">${stars}</div>
            <p class="mb-0 text-light-50 italic font-sm">"${escapeHTML(review.comment)}"</p>
        `;

        if (insertAtTop && reviewsContainer.firstChild) {
            reviewsContainer.insertBefore(card, reviewsContainer.firstChild);
        } else {
            reviewsContainer.appendChild(card);
        }
    }

    function saveReviewToLocal(review) {
        const reviews = getLocalReviews();
        reviews.unshift(review); // Put latest on top
        localStorage.setItem('tharpe_local_reviews', JSON.stringify(reviews));
    }

    function getLocalReviews() {
        const stored = localStorage.getItem('tharpe_local_reviews');
        return stored ? JSON.parse(stored) : [];
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
