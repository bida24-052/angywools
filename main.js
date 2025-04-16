// Slideshow functionality
function initSlideshow(container) {
    const images = container.querySelectorAll('.slideshow-image');
    const nav = container.querySelector('.slideshow-nav');
    let currentIndex = 0;
    let interval;

    // Create navigation dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slideshow-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showImage(index);
            startSlideshow();
        });
        nav.appendChild(dot);
    });

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        const dots = nav.querySelectorAll('.slideshow-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function startSlideshow() {
        interval = setInterval(nextImage, 3000);
    }

    // Show first image and start slideshow
    showImage(0);
    startSlideshow();

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startSlideshow);
}

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-olive, .btn-gold');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.card-text').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            notification.style.zIndex = '1000';
            notification.textContent = `${productName} (${productPrice}) added to cart!`;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    // Initialize slideshows
    document.querySelectorAll('.slideshow-container').forEach(container => {
        initSlideshow(container);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
        notification.style.zIndex = '1000';
        notification.textContent = 'Message sent successfully!';
        
        document.body.appendChild(notification);
        
        // Clear form
        contactForm.reset();
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
} 

