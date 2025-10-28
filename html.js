// HTML Tutorial JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Lesson navigation
    const lessonLinks = document.querySelectorAll('.lesson-list a');
    const lessons = document.querySelectorAll('.lesson');
    
    lessonLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active lesson in sidebar
            lessonLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Show target lesson
            lessons.forEach(lesson => {
                lesson.classList.remove('active');
                if (lesson.id === targetId) {
                    lesson.classList.add('active');
                }
            });
            
            // Scroll to top of lesson
            window.scrollTo({
                top: document.querySelector('.main-content').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // HTML Editor functionality
    const runButton = document.getElementById('run-html');
    const htmlEditor = document.getElementById('html-editor');
    const htmlPreview = document.getElementById('html-preview');
    
    runButton.addEventListener('click', function() {
        const htmlCode = htmlEditor.value;
        const previewDocument = htmlPreview.contentDocument || htmlPreview.contentWindow.document;
        
        previewDocument.open();
        previewDocument.write(htmlCode);
        previewDocument.close();
    });
    
    // Initialize preview with default code
    runButton.click();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});