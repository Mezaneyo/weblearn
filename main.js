// Main JavaScript for homepage
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to course cards on scroll
    const courseCards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Update progress bars based on user interaction
    document.querySelectorAll('.course-card').forEach(card => {
        const progressBar = card.querySelector('.progress');
        const defaultWidth = progressBar.getAttribute('data-default') + '%';
        progressBar.style.width = defaultWidth;
        
        card.addEventListener('mouseenter', function() {
            progressBar.style.width = '100%';
        });
        
        card.addEventListener('mouseleave', function() {
            progressBar.style.width = defaultWidth;
        });
    });
    
    // Update active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});