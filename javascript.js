// JavaScript Tutorial JavaScript
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
            
            lessonLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
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
    
    // DOM Playground
    const demoContainer = document.getElementById('demo-container');
    let itemCount = 3;
    
    document.getElementById('add-element').addEventListener('click', function() {
        itemCount++;
        const newItem = document.createElement('div');
        newItem.className = 'demo-item';
        newItem.textContent = `Item ${itemCount}`;
        demoContainer.appendChild(newItem);
    });
    
    document.getElementById('remove-element').addEventListener('click', function() {
        const items = demoContainer.querySelectorAll('.demo-item');
        if (items.length > 0) {
            demoContainer.removeChild(items[items.length - 1]);
            itemCount = Math.max(3, itemCount - 1);
        }
    });
    
    document.getElementById('change-color').addEventListener('click', function() {
        const items = demoContainer.querySelectorAll('.demo-item');
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)'
        ];
        
        items.forEach(item => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            item.style.background = randomColor;
        });
    });
    
    document.getElementById('reset-demo').addEventListener('click', function() {
        demoContainer.innerHTML = '';
        itemCount = 3;
        
        for (let i = 1; i <= 3; i++) {
            const item = document.createElement('div');
            item.className = 'demo-item';
            item.textContent = `Item ${i}`;
            item.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            demoContainer.appendChild(item);
        }
    });
    
    // JavaScript Playground
    const runJsButton = document.getElementById('run-js');
    const jsEditor = document.getElementById('js-editor');
    const playgroundOutput = document.getElementById('playground-output');
    
    runJsButton.addEventListener('click', function() {
        try {
            const jsCode = jsEditor.value;
            
            // Create a function from the code and execute it
            const executeCode = new Function(jsCode);
            executeCode();
        } catch (error) {
            playgroundOutput.innerHTML = `
                <div style="color: #dc3545; background: #f8d7da; padding: 1rem; border-radius: 6px;">
                    <strong>Error:</strong> ${error.message}
                </div>
            `;
        }
    });
    
    // Initialize playground
    runJsButton.click();
    
    // Quiz functionality
    const checkAnswerButton = document.getElementById('check-answer');
    const quizResult = document.getElementById('quiz-result');
    
    checkAnswerButton.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="quiz1"]:checked');
        
        if (!selectedOption) {
            quizResult.textContent = 'Please select an answer!';
            quizResult.className = 'quiz-result incorrect';
            return;
        }
        
        if (selectedOption.value === 'b') {
            quizResult.textContent = 'Correct! document.getElementById() is used to select an element by its ID.';
            quizResult.className = 'quiz-result correct';
        } else {
            quizResult.textContent = 'Incorrect. The correct answer is document.getElementById().';
            quizResult.className = 'quiz-result incorrect';
        }
    });
    
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