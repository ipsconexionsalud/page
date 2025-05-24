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
      // Close all other accordions
      accordionHeaders.forEach((otherHeader) => {
        if (otherHeader !== this) {
          otherHeader.classList.remove("active")
          const otherContent = otherHeader.nextElementSibling
          if (otherContent) {
            otherContent.style.maxHeight = null
          }
        }
      })

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

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Mobile menu close on link click
  const menuLinks = document.querySelectorAll("nav .menu li a")
  const menuToggle = document.getElementById("menu-toggle")

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        menuToggle.checked = false
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const nav = document.querySelector("nav")
    const menuIcon = document.querySelector(".menu-icon")

    if (window.innerWidth <= 992 && menuToggle.checked) {
      if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
        menuToggle.checked = false
      }
    }
  })

  // Form validation and enhancement
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      // Add focus and blur effects
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused")
      })

      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused")
        if (input.value.trim() !== "") {
          input.parentElement.classList.add("filled")
        } else {
          input.parentElement.classList.remove("filled")
        }
      })
    })
  }

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Add loading animation to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// WhatsApp functionality
function toggleSedeSelector() {
  const selector = document.getElementById("sedeSelector")
  if (selector) {
    if (selector.style.display === "none" || selector.style.display === "") {
      selector.style.display = "inline-block"
    } else {
      selector.style.display = "none"
      selector.selectedIndex = 0 // reset selección si se cierra
    }
  }
}

function redirigirWhatsApp() {
  const selector = document.getElementById("sedeSelector")
  if (!selector) return

  const sede = selector.value

  const enlaces = {
    22: "https://wa.me/573218080610?text=Hola,%20me%20interesa%20información%20sobre%20los%20servicios%20de%20la%20Sede%2022%20-%20B24X",
    34: "https://wa.me/573161194930?text=Hola,%20me%20interesa%20información%20sobre%20los%20servicios%20de%20la%20Sede%2034%20-%20Optometría",
    35: "https://wa.me/573207914983?text=Hola,%20me%20interesa%20información%20sobre%20los%20servicios%20de%20la%20Sede%2035%20-%20Artritis",
  }

  if (sede && enlaces[sede]) {
    window.open(enlaces[sede], "_blank")
  }

  selector.style.display = "none"
  selector.selectedIndex = 0
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Add scroll-based functionality here if needed
}, 100)

window.addEventListener("scroll", optimizedScrollHandler)

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .form-group.focused input,
  .form-group.focused select,
  .form-group.focused textarea {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(10, 42, 122, 0.1);
  }
  
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .lazy.loaded {
    opacity: 1;
  }
`
document.head.appendChild(style)
