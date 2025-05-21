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
    }, 8000)
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

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate__animated:not(.animate__animated--triggered)")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate__animated--triggered")

        // Get the animation class
        const classes = element.className.split(" ")
        const animationClass = classes.find(
          (cls) => cls.startsWith("animate__") && cls !== "animate__animated" && cls !== "animate__animated--triggered",
        )

        if (animationClass) {
          // Remove the class and add it again to restart the animation
          element.classList.remove(animationClass)
          setTimeout(() => {
            element.classList.add(animationClass)
          }, 50)
        }
      }
    })
  }

  // Run on page load
  animateOnScroll()

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll)
})


function toggleSedeSelector() {
  const selector = document.getElementById("sedeSelector");
  if (selector.style.display === "none" || selector.style.display === "") {
    selector.style.display = "inline-block";
  } else {
    selector.style.display = "none";
    selector.selectedIndex = 0; // reset selección si se cierra
  }
}

function redirigirWhatsApp() {
  const selector = document.getElementById("sedeSelector");
  const sede = selector.value;

  const enlaces = {
    "22": "https://wa.me/573001112222",
    "34": "https://wa.me/573003334444",
    "35": "https://wa.me/573005556666"
  };

  if (sede && enlaces[sede]) {
    window.open(enlaces[sede], "_blank");
  }

  selector.style.display = "none";
  selector.selectedIndex = 0;
}
