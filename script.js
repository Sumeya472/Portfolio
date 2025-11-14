const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const typingText = document.querySelector(".typing-text");
const floatingContainer = document.querySelector(".floating-elements");
const projectsContainer = document.querySelector(".projects-container");
const indicatorsContainer = document.querySelector(".carousel-indicators");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const currentYear = document.getElementById("currentYear");

let darkMode = localStorage.getItem("darkMode") === "true";
let currentSlide = 0;
let activeFilter = "all";
let hoveredProject = null;
let currentIndex = 0;
let isDeleting = false;
let displayText = "";
let typingSpeed = 100;
let pauseTime = 2000;

const texts = ["Front-End Developer & UI/UX Designer"];

const projects = [
  {
    title: "Login Screen Design",
    image: "image/login screen .png",
    tags: ["UI/UX", "Figma"],
    category: "ui-ux",
    details:
      "Designed a comprehensive login screen with a focus on usability and modern aesthetics. Features clean layout, intuitive user flow, and responsive design.",
  },
  {
    title: "Design System",
    image: "image/design.jpg",
    tags: ["Design System", "Figma"],
    category: "ui-ux",
    details:
      "Built a complete design system with reusable components, typography scales, color palettes, and comprehensive design guidelines for consistent user experiences.",
  },
  {
    title: "Weather Application",
    image: "image/weatherapp.jpg",
    tags: ["React.js", "API", "Web App"],
    category: "web",
    details:
      "Developed a responsive weather application that displays real-time weather data with location detection, 5-day forecasts, and interactive weather maps.",
  },
  {
    title: "Calculator App",
    image: "image/calculator.jpg",
    tags: ["React.js", "Web App"],
    category: "web",
    details:
      "Designed and developed a calculator application with advanced mathematical functions, calculation history, and responsive design for all devices.",
  },

  {
    title: "Counter App",
    image: "image/count web.jpg",
    tags: ["Web App", "JavaScript"],
    category: "web",
    details:
      "A responsive counter application built with React.js featuring increment, decrement, and reset functionality. Includes modern UI with smooth animations and state management for seamless user interactions",
  },
  {
    title: "Portfolio Website",
    image: "image/portfolio.jpg",
    tags: ["UI/UX", "Design"],
    category: "design",
    details:
      "A clean and modern portfolio UI/UX design showcasing personal branding, skills, and projects. Focused on creating a visually appealing layout with smooth navigation, consistent typography, and a user-centered experience.",
  },
  {
    title: "To-Do List App",
    image: "image/todo.jpg",
    tags: ["Web App", "JavaScript"],
    category: "web",
    details:
      "A simple and efficient to-do list application built using JavaScript. Includes task addition, deletion, completion marking, and local storage support for saving tasks. Designed with a clean interface for easy daily task management.",
  },
  {
    title: "Countdown Timer",
    image: "image/countdown.jpg",
    tags: ["JavaScript", "Web App"],
    category: "web",
    details:
      "An interactive countdown timer built with JavaScript, featuring customizable target dates, smooth animations, and real-time updates. Designed with a minimalist interface for easy usability.",
  },
  {
    title: "Blog Post App",
    image: "image/blog post.jpg",
    tags: ["Web App", "JavaScript"],
    category: "web",
    details:
      "A dynamic blog posting application built with JavaScript. Users can add, read, and manage posts through a clean interface. Includes search functionality, local storage, and responsive UI for smooth reading experience.",
  },
];

function init() {
  currentYear.textContent = new Date().getFullYear();

  updateDarkMode();

  typeText();

  createFloatingElements();

  renderProjects();

  initScrollSpy();

  initRouting();
}

function toggleDarkMode() {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  updateDarkMode();
}

function updateDarkMode() {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.title = "Switch to Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = "Switch to Dark Mode";
  }
}

function navigateTo(section) {
  window.history.pushState({}, "", `#${section}`);

  document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  updateActiveNavLink(section);
  if (window.innerWidth <= 768) {
    toggleMenu();
  }
}

function updateActiveNavLink(section) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.toLowerCase() === section) {
      link.classList.add("active");
    }
  });
}

function initRouting() {
  window.addEventListener("popstate", function (event) {
    const hash = window.location.hash.substring(1) || "home";
    document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
    updateActiveNavLink(hash);
  });

  const hash = window.location.hash.substring(1) || "home";
  if (hash) {
    document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
    updateActiveNavLink(hash);
  }
}

function toggleMenu() {
  navMenu.classList.toggle("active");
  hamburger.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

function typeText() {
  const currentText = texts[currentIndex];

  if (!isDeleting && displayText === currentText) {
    setTimeout(() => (isDeleting = true), pauseTime);
  } else if (isDeleting && displayText === "") {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % texts.length;
  } else {
    displayText = isDeleting
      ? currentText.substring(0, displayText.length - 1)
      : currentText.substring(0, displayText.length + 1);
  }

  typingText.textContent = displayText;

  const speed = isDeleting ? 50 : typingSpeed;
  setTimeout(typeText, speed);
}

function createFloatingElements() {
  const colors = [
    "rgba(58, 134, 255, 0.3)",
    "rgba(131, 56, 236, 0.3)",
    "rgba(255, 0, 110, 0.3)",
  ];

  for (let i = 0; i < 15; i++) {
    const element = document.createElement("div");
    element.classList.add("floating-element");

    const size = Math.random() * 100 + 20;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    const color = colors[Math.floor(Math.random() * colors.length)];

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.background = color;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;

    floatingContainer.appendChild(element);
  }
}

function renderProjects() {
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const projectsPerSlide =
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerSlide);

  indicatorsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("button");
    indicator.className = `indicator ${i === currentSlide ? "active" : ""}`;
    indicator.onclick = () => setCurrentSlide(i);
    indicatorsContainer.appendChild(indicator);
  }

  const startIndex = currentSlide * projectsPerSlide;
  const visibleProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerSlide
  );

  projectsContainer.innerHTML = "";
  visibleProjects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.className = `project-card ${project.category}`;
    projectCard.onmouseenter = () => setHoveredProject(index);
    projectCard.onmouseleave = () => setHoveredProject(null);

    projectCard.innerHTML = `
                    <div class="project-inner">
                        <div class="project-front">
                            <div class="project-image-container">
                                <img src="${project.image}" alt="${
      project.title
    }" class="project-img" onclick="openImageModal('${project.image}')">
                                <div class="project-title-overlay ${
                                  hoveredProject === index ? "visible" : ""
                                }">
                                    <h3>${project.title}</h3>
                                </div>
                                <button class="view-image-btn" onclick="openImageModal('${
                                  project.image
                                }')" title="View Image">
                                    <i class="fas fa-expand"></i>
                                </button>
                            </div>
                            <button class="flip-btn" onclick="flipCard(this)" title="View Details">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                        <div class="project-back">
                            <h3>${project.title}</h3>
                            <p class="project-details">${project.details}</p>
                            <div class="project-tags-back">
                                ${project.tags
                                  .map(
                                    (tag) =>
                                      `<span class="project-tag-back">${tag}</span>`
                                  )
                                  .join("")}
                            </div>
                            <div class="project-actions">
                                <button class="flip-btn back-btn" onclick="flipCard(this)">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

    projectsContainer.appendChild(projectCard);
  });
}

function filterProjects(category) {
  activeFilter = category;
  currentSlide = 0;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase().includes(category)) {
      btn.classList.add("active");
    }
  });

  renderProjects();
}

function setCurrentSlide(slide) {
  currentSlide = slide;
  renderProjects();
}

function nextSlide() {
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  const projectsPerSlide =
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerSlide);

  currentSlide = (currentSlide + 1) % totalSlides;
  renderProjects();
}

function prevSlide() {
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  const projectsPerSlide =
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerSlide);

  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  renderProjects();
}

function setHoveredProject(index) {
  hoveredProject = index;
  document.querySelectorAll(".project-title-overlay").forEach((overlay, i) => {
    overlay.classList.toggle("visible", i === index);
  });
}

function flipCard(button) {
  const projectInner = button
    .closest(".project-card")
    .querySelector(".project-inner");
  projectInner.style.transform =
    projectInner.style.transform === "rotateY(180deg)"
      ? "rotateY(0deg)"
      : "rotateY(180deg)";
}

function openImageModal(imageSrc) {
  modalImage.src = imageSrc;
  imageModal.style.display = "flex";
}

function closeImageModal() {
  imageModal.style.display = "none";
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.log("Form submitted:", data);
  alert(
    `Thank you, ${data.name}! Your message has been sent. I'll get back to you soon.`
  );
  event.target.reset();
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.textContent.toLowerCase() === current) {
        link.classList.add("active");
      }
    });

    if (current) {
      window.history.replaceState({}, "", `#${current}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
