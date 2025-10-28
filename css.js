// CSS Tutorial JavaScript
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
            
            window.scrollTo({
                top: document.querySelector('.main-content').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Interactive Box Model Demo
    const widthSlider = document.getElementById('width-slider');
    const paddingSlider = document.getElementById('padding-slider');
    const borderSlider = document.getElementById('border-slider');
    const marginSlider = document.getElementById('margin-slider');
    
    const widthValue = document.getElementById('width-value');
    const paddingValue = document.getElementById('padding-value');
    const borderValue = document.getElementById('border-value');
    const marginValue = document.getElementById('margin-value');
    
    const interactiveBox = document.getElementById('interactive-box');
    
    function updateBoxModel() {
        const width = widthSlider.value;
        const padding = paddingSlider.value;
        const border = borderSlider.value;
        const margin = marginSlider.value;
        
        // Update values
        widthValue.textContent = width;
        paddingValue.textContent = padding;
        borderValue.textContent = border;
        marginValue.textContent = margin;
        
        // Update box styles
        interactiveBox.style.width = width + 'px';
        interactiveBox.style.height = (width * 0.6) + 'px'; // Maintain aspect ratio
        interactiveBox.style.padding = padding + 'px';
        interactiveBox.style.border = border + 'px solid #333';
        interactiveBox.style.margin = margin + 'px';
    }
    
    widthSlider.addEventListener('input', updateBoxModel);
    paddingSlider.addEventListener('input', updateBoxModel);
    borderSlider.addEventListener('input', updateBoxModel);
    marginSlider.addEventListener('input', updateBoxModel);
    
    // Initialize box model
    updateBoxModel();
    
    // CSS Playground
    const runCssButton = document.getElementById('run-css');
    const cssEditor = document.getElementById('css-editor');
    const playgroundBox = document.getElementById('playground-box');
    
    runCssButton.addEventListener('click', function() {
        const cssCode = cssEditor.value;
        
        // Extract styles from CSS code
        const styleMatch = cssCode.match(/\.playground-box\s*{([^}]+)}/);
        if (styleMatch) {
            const styles = styleMatch[1];
            
            // Create a style element and apply the CSS
            let styleElement = document.getElementById('playground-styles');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'playground-styles';
                document.head.appendChild(styleElement);
            }
            
            styleElement.textContent = `.playground-box {${styles}}`;
        }
    });
    
    // Initialize playground
    runCssButton.click();
    
    // Smooth scrolling
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