document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = navMenu.style.display === 'flex';
        navMenu.style.display = isOpen ? 'none' : 'flex';
        
        if (!isOpen) {
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '80px';
            navMenu.style.right = '20px';
            navMenu.style.backgroundColor = '#fff';
            navMenu.style.padding = '20px';
            navMenu.style.borderRadius = '10px';
            navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            navMenu.style.width = '200px';
        } else {
            navMenu.style = '';
        }
    });
    
    // Pricing tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Show/hide cards based on category
            pricingCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('orderModal');
    const orderBtns = document.querySelectorAll('.btn-order');
    const packageName = document.getElementById('packageName');
    const orderForm = document.getElementById('orderForm');
    const closeModal = document.querySelector('.close-modal');
    
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const package = this.dataset.package;
            packageName.textContent = package;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission to WhatsApp
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const package = packageName.textContent;
        const name = formData.get('name');
        const company = formData.get('company');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const notes = formData.get('notes');
        
        const message = `*New Order Request*%0A%0A` +
                        `*Package:* ${package}%0A` +
                        `*Name:* ${name}%0A` +
                        `*Company/Institution:* ${company || '-'}%0A` +
                        `*Email:* ${email}%0A` +
                        `*WhatsApp Number:* ${phone}%0A` +
                        `*Additional Notes:*%0A${notes || '-'}%0A%0A` +
                        `Please process this order. Thank you!`;
        
        const whatsappUrl = `https://wa.me/6289663431927?text=${message}`;
        
        // Close modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        this.reset();
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                    navMenu.style = '';
                }
            }
        });
    });
});