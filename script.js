// Back to top button functionality
const mybutton = document.getElementById("myBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Theme toggle functionality
const icon = document.getElementById("theme-icon");
const header = document.getElementById("header");

icon.onclick = function() {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        icon.src = "images/moon.png";
        header.style.backgroundImage = "url('images/bg-white.jpg')";
    } else {
        icon.src = "images/sun.png";
        header.style.backgroundImage = "url('images/bg1.png')";
    }
};

// Tab switching functionality
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    // Use the passed event parameter instead of the global event
    const clickedTab = event ? event.currentTarget : document.querySelector('.tab-links.active-link');

    // Remove active class from all tabs
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
        tablink.setAttribute('aria-selected', 'false');
    }
    
    // Hide all tab contents
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    // Add active class to clicked tab
    clickedTab.classList.add("active-link");
    clickedTab.setAttribute('aria-selected', 'true');
    
    // Show the corresponding tab content
    document.getElementById(tabname).classList.add("active-tab");
}

// Update tab click event listeners to pass the event
document.addEventListener('DOMContentLoaded', () => {
    for (let tablink of tablinks) {
        tablink.addEventListener('click', function(e) {
            const tabId = this.textContent.toLowerCase();
            opentab(tabId, e);
        });
    }
    
    // Initialize scroll animations
    addScrollAnimations();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize progress bars animation
    animateProgressBars();
    
    // Initialize project modals
    initProjectModals();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Add animation delay to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
});

// Project filtering functionality
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Set active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                // First make sure all items are visible for animation purposes
                item.classList.remove('hide');
                
                // If "all" is selected, show all items
                if (filterValue === 'all') {
                    item.style.display = '';
                    setTimeout(() => {
                        item.classList.remove('hide');
                    }, 50);
                } else {
                    // Check if the item has the selected category
                    const categories = item.getAttribute('data-category').split(' ');
                    if (!categories.includes(filterValue)) {
                        // If it doesn't match, hide it with animation
                        item.classList.add('hide');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500); // Matches the transition time in CSS
                    } else {
                        item.style.display = '';
                    }
                }
            });
        });
    });
}

// Scroll animation functionality using Intersection Observer
function addScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.work, .about-col-1, .contact-left, .contact-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Mobile menu functionality
const sidemenu = document.getElementById("sidemenu");
let isOpen = false;
const bars = document.querySelector('.fa-solid.fa-bars');

function openmenu(event) {
    sidemenu.style.right = "0";
    isOpen = true;
    document.addEventListener("click", closeMenuIfClickOutside);
    bars.classList.add('hide');
    
    if (event) {
        event.stopPropagation();
    }
}

function closemenu() {
    sidemenu.style.right = "-200px";
    isOpen = false;
    document.removeEventListener("click", closeMenuIfClickOutside);
    bars.classList.remove('hide');
}

function closeMenuIfClickOutside(e) {
    if (isOpen && !sidemenu.contains(e.target)) {
        closemenu();
    }
}

// Form submission handler
const scriptURL = 'https://script.google.com/macros/s/AKfycbwtcwVcGeKsXg8azCOEcWq8F7EF5sBoKKtn7Srl-oRSaS7W7_am4Y07DSAtyuK5gzjrPQ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show loading message
    msg.innerHTML = "Sending message...";
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 3000); // Extended timeout to 3 seconds for better visibility
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "Something went wrong. Please try again.";
            msg.style.color = "#ff004f"; // Error message in red
            setTimeout(function () {
                msg.innerHTML = "";
                msg.style.color = "#61b752"; // Reset to success color
            }, 3000);
        });
});

// Initialize progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
        // Reset width to 0 initially
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// Project modals functionality
function initProjectModals() {
    const detailBtns = document.querySelectorAll('.view-details-btn');
    const modalContainer = document.getElementById('project-modal-container');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Open modal when clicking on View Details button
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            
            if (modal) {
                modalContainer.style.display = 'block';
                // Use setTimeout to ensure display:block is applied before adding active class
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                // Prevent scrolling on the body
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal functions
    function closeModal() {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            setTimeout(() => {
                modalContainer.style.display = 'none';
                // Re-enable scrolling
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Close on X button click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close on backdrop click
    modalBackdrop.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Form validation functionality
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Validation patterns
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    
    // Add validation status elements
    function createValidationElement(input) {
        const validationSpan = document.createElement('span');
        validationSpan.className = 'validation-message';
        validationSpan.style.display = 'none';
        validationSpan.style.fontSize = '12px';
        validationSpan.style.padding = '5px 0';
        input.parentNode.insertBefore(validationSpan, input.nextSibling);
        return validationSpan;
    }
    
    const nameValidation = createValidationElement(nameInput);
    const emailValidation = createValidationElement(emailInput);
    const messageValidation = createValidationElement(messageInput);
    
    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (this.value.length < 3) {
            this.style.borderColor = '#ff004f';
            nameValidation.textContent = 'Name must be at least 3 characters';
            nameValidation.style.color = '#ff004f';
            nameValidation.style.display = 'block';
        } else {
            this.style.borderColor = '#4CAF50';
            nameValidation.style.display = 'none';
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (!this.value.match(emailPattern)) {
            this.style.borderColor = '#ff004f';
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.style.color = '#ff004f';
            emailValidation.style.display = 'block';
        } else {
            this.style.borderColor = '#4CAF50';
            emailValidation.style.display = 'none';
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.value.length < 10) {
            this.style.borderColor = '#ff004f';
            messageValidation.textContent = 'Message must be at least 10 characters';
            messageValidation.style.color = '#ff004f';
            messageValidation.style.display = 'block';
        } else {
            this.style.borderColor = '#4CAF50';
            messageValidation.style.display = 'none';
        }
    });
    
    // Form validation before submit
    form.addEventListener('submit', function(e) {
        let valid = true;
        
        // Validate name
        if (nameInput.value.length < 3) {
            nameInput.style.borderColor = '#ff004f';
            nameValidation.textContent = 'Name must be at least 3 characters';
            nameValidation.style.color = '#ff004f';
            nameValidation.style.display = 'block';
            valid = false;
        }
        
        // Validate email
        if (!emailInput.value.match(emailPattern)) {
            emailInput.style.borderColor = '#ff004f';
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.style.color = '#ff004f';
            emailValidation.style.display = 'block';
            valid = false;
        }
        
        // Validate message
        if (messageInput.value.length < 10) {
            messageInput.style.borderColor = '#ff004f';
            messageValidation.textContent = 'Message must be at least 10 characters';
            messageValidation.style.color = '#ff004f';
            messageValidation.style.display = 'block';
            valid = false;
        }
        
        if (!valid) {
            e.preventDefault();
            return false;
        }
    });
}

// Animated counter statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // Animation duration in milliseconds
                const step = target / (duration / 30); // Update every 30ms
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}