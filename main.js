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

// Function to dynamically add images to a slideshow container
function populateSlideshow(container, imageUrls) {
    const nav = container.querySelector('.slideshow-nav');
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.className = `slideshow-image${index === 0 ? ' active' : ''}`;
        img.alt = `Slide ${index + 1}`;
        container.insertBefore(img, nav);
    });
}

// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-olive, .btn-gold');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ensure the button is inside a product card
            const productCard = this.closest('.product-card');
            if (!productCard) {
                console.error('Add to Cart button is not inside a product card.');
                return;
            }

            // Retrieve product name and price
            const productNameElement = productCard.querySelector('.card-title');
            const productPriceElement = productCard.querySelector('.card-text');
            if (!productNameElement || !productPriceElement) {
                console.error('Product name or price not found in the product card.');
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productPrice = productPriceElement.textContent.trim();

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

    // Example usage
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        const imageUrls = [
            'blue fire.jpeg',
            'gray mini dress.jpeg',
            'granny square maxi dress.jpg'
        ];
        populateSlideshow(slideshowContainer, imageUrls);
    }
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
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Validate form fields
        if (!name || !email || !message) {
            console.error('Form fields are missing.');
            return;
        }

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Simulate form submission (replace with actual server call if needed)
        console.log('Form submitted:', {
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim()
        });

        // Show success notification
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
