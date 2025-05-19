// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-item")
const indicators = document.querySelectorAll(".indicator")
const totalSlides = slides.length

// Initialize the carousel
function initCarousel() {
  if (slides.length > 0) {
    showSlide(0)
    // Auto slide every 5 seconds
    setInterval(() => {
      moveCarousel(1)
    }, 5000)
  }
}

// Show a specific slide
function showSlide(n) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active")
  })

  // Remove active class from all indicators
  indicators.forEach((indicator) => {
    indicator.classList.remove("active")
  })

  // Show the current slide and activate its indicator
  slides[n].classList.add("active")
  if (indicators[n]) {
    indicators[n].classList.add("active")
  }
}

// Move the carousel by a certain number of slides
function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides
  showSlide(currentSlide)
}

// Set the carousel to a specific slide (for indicators)
function setCarousel(n) {
  currentSlide = n
  showSlide(currentSlide)
}

// Program Modal functionality
function openProgramModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }
}

function closeProgramModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "" // Restore scrolling
  }
}

// Close modal when clicking outside of it
window.onclick = (event) => {
  const modals = document.querySelectorAll(".program-modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = ""
    }
  })
}

// Accordion functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize carousel if it exists on the page
  initCarousel()

  // Set up accordion functionality
  const accordionHeaders = document.querySelectorAll(".accordion-header")

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Toggle active class on the header
      this.classList.toggle("active")

      // Toggle the content visibility
      const content = this.nextElementSibling
      if (content.style.maxHeight) {
        content.style.maxHeight = null
      } else {
        content.style.maxHeight = content.scrollHeight + "px"
      }
    })
  })

  // Form submission handling
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Form submission is handled by the inline script in contact.html
    })
  }

  // Initialize accordion items
  const accordionItems = document.querySelectorAll(".accordion-item")
  if (accordionItems.length > 0) {
    // Open the first accordion item by default
    const firstHeader = accordionItems[0].querySelector(".accordion-header")
    const firstContent = accordionItems[0].querySelector(".accordion-content")

    if (firstHeader && firstContent) {
      firstHeader.classList.add("active")
      firstContent.style.maxHeight = firstContent.scrollHeight + "px"
    }
  }
})

// Add animation on scroll
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(
    ".feature-card, .service-card, .policy-card, .contact-card, .program-card, .sede-card",
  )

  elements.forEach((element) => {
    const position = element.getBoundingClientRect()

    // If element is in viewport
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add("animated")
    }
  })
})
