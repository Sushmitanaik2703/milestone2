/* =========================================================
   0. MOBILE MENU TOGGLE
========================================================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}


/* =========================================================
   0.1 ACTIVE PAGE HIGHLIGHT
========================================================= */
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


/* =========================================================
   1. TOAST NOTIFICATION (Used everywhere)
========================================================= */
function showNotification(message) {
  const note = document.createElement("div");
  note.className = "notification";
  note.textContent = message;
  document.body.appendChild(note);

  setTimeout(() => {
    note.remove();
  }, 3000);
}


/* =========================================================
   2. NEWSLETTER (Home Page)
========================================================= */
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showNotification("Subscribed! 🎉 Welcome to Namma Kudla.");
    newsletterForm.reset();
  });
}


/* =========================================================
   3. BLOG COMMENTS + SAVE TO localStorage
========================================================= */
const commentsList = document.getElementById("commentsList");
const commentForm = document.getElementById("commentForm");

function loadComments() {
  if (!commentsList) return;
  const saved = JSON.parse(localStorage.getItem("comments") || "[]");
  commentsList.innerHTML = "";
  saved.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `<p>${c.text}</p><hr>`;
    commentsList.appendChild(div);
  });
}

if (commentForm) {
  commentForm.addEventListener("submit", e => {
    e.preventDefault();

    const text = document.getElementById("commentText").value;

    const saved = JSON.parse(localStorage.getItem("comments") || "[]");
    saved.unshift({ text });
    localStorage.setItem("comments", JSON.stringify(saved));

    loadComments();
    commentForm.reset();
  });

  loadComments();
}


/* =========================================================
   4. TRAVEL STORIES (Save + Load)
========================================================= */
const storyForm = document.getElementById("storyForm");
const storiesList = document.getElementById("storiesList");

function loadStories() {
  if (!storiesList) return;
  const saved = JSON.parse(localStorage.getItem("stories") || "[]");
  storiesList.innerHTML = "";
  saved.forEach(s => {
    const div = document.createElement("div");
    div.className = "story-item";
    div.innerHTML = `
      <h3>${s.title}</h3>
      <p><em>${s.author}</em></p>
      <p>${s.content}</p>
      <hr>
    `;
    storiesList.appendChild(div);
  });
}

if (storyForm) {
  storyForm.addEventListener("submit", e => {
    e.preventDefault();

    const storyTitle = document.getElementById("storyTitle").value;
    const storyContent = document.getElementById("storyContent").value;
    const storyAuthor = document.getElementById("storyAuthor").value || "Anonymous";

    const saved = JSON.parse(localStorage.getItem("stories") || "[]");
    saved.unshift({
      title: storyTitle,
      content: storyContent,
      author: storyAuthor,
      created: new Date().toISOString()
    });

    localStorage.setItem("stories", JSON.stringify(saved));

    loadStories();
    storyForm.reset();
    showNotification("Your story has been posted! 🌟");
  });

  loadStories();
}


/* =========================================================
   5. GUIDE PROFILE — CONTACT FORM
========================================================= */
const contactForm = document.getElementById("contactForm");
const contactResponse = document.getElementById("contactResponse");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    contactResponse.textContent =
      "Your message has been sent! The guide will contact you shortly.";
    contactForm.reset();
  });
}


/* =========================================================
   6. GUIDE REVIEW SECTION (Save + Load)
========================================================= */
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

function loadReviews() {
  if (!reviewsList) return;
  const saved = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviewsList.innerHTML = "";
  saved.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <p><strong>Rating:</strong> ${"⭐".repeat(r.rating)}</p>
      <p>${r.text}</p>
      <hr>
    `;
    reviewsList.appendChild(div);
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", e => {
    e.preventDefault();

    const rating = document.getElementById("rating").value;
    const text = document.getElementById("reviewText").value;

    if (!rating || text.trim() === "") {
      showNotification("Please provide both rating and review.");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("reviews") || "[]");
    saved.unshift({ rating, text });

    localStorage.setItem("reviews", JSON.stringify(saved));

    loadReviews();
    reviewForm.reset();
  });

  loadReviews();
}


/* =========================================================
   7. SEARCH FILTER (Blog + Destinations)
========================================================= */
const searchBox = document.getElementById("searchBox");
const searchItems = document.querySelectorAll(".search-item");

if (searchBox) {
  searchBox.addEventListener("keyup", () => {

    const term = searchBox.value.toLowerCase();

    searchItems.forEach(item => {
      item.style.display =
        item.textContent.toLowerCase().includes(term)
          ? "block"
          : "none";
    });

  });
}


/* =========================================================
   8. CATEGORY FILTER (Blog)
========================================================= */
const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    const cat = categoryFilter.value.toLowerCase();

    document.querySelectorAll(".search-item").forEach(item => {
      const tags = (item.querySelector(".tags") || { textContent: "" }).textContent.toLowerCase();

      item.style.display = (cat === "" || tags.includes(cat)) ? "block" : "none";
    });
  });
}
