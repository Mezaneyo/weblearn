// Database Tutorial JavaScript
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
    
    // Schema Designer
    const designerArea = document.getElementById('designer-area');
    const generatedSql = document.getElementById('generated-sql');
    let tableCount = 2;
    
    document.getElementById('add-table').addEventListener('click', function() {
        tableCount++;
        const newTable = document.createElement('div');
        newTable.className = 'schema-table';
        newTable.setAttribute('data-table', `table_${tableCount}`);
        newTable.innerHTML = `
            <div class="table-header">Table_${tableCount}</div>
            <div class="table-fields">
                <div class="field">id (PK)</div>
                <div class="field">name</div>
            </div>
        `;
        
        // Make table draggable
        makeDraggable(newTable);
        designerArea.appendChild(newTable);
        updateGeneratedSQL();
    });
    
    document.getElementById('clear-schema').addEventListener('click', function() {
        designerArea.innerHTML = `
            <div class="schema-table" data-table="users">
                <div class="table-header">Users</div>
                <div class="table-fields">
                    <div class="field">id (PK)</div>
                    <div class="field">name</div>
                    <div class="field">email</div>
                </div>
            </div>
            <div class="schema-table" data-table="posts">
                <div class="table-header">Posts</div>
                <div class="table-fields">
                    <div class="field">id (PK)</div>
                    <div class="field">user_id (FK)</div>
                    <div class="field">title</div>
                    <div class="field">content</div>
                </div>
            </div>
        `;
        
        // Reinitialize draggable tables
        document.querySelectorAll('.schema-table').forEach(table => {
            makeDraggable(table);
        });
        
        tableCount = 2;
        updateGeneratedSQL();
    });
    
    // Make tables draggable
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.position = 'absolute';
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Initialize draggable tables
    document.querySelectorAll('.schema-table').forEach(table => {
        makeDraggable(table);
    });
    
    function updateGeneratedSQL() {
        const tables = document.querySelectorAll('.schema-table');
        let sql = '';
        
        tables.forEach(table => {
            const tableName = table.getAttribute('data-table');
            const fields = table.querySelectorAll('.field');
            
            sql += `CREATE TABLE ${tableName} (\n`;
            fields.forEach((field, index) => {
                sql += `    ${field.textContent}`;
                if (index < fields.length - 1) sql += ',';
                sql += '\n';
            });
            sql += ');\n\n';
        });
        
        generatedSql.textContent = sql || '-- Tables will appear here as you design';
    }
    
    // Initialize SQL
    updateGeneratedSQL();
    
    // SQL Playground
    const runSqlButton = document.getElementById('run-sql');
    const sqlEditor = document.getElementById('sql-editor');
    const sqlResults = document.getElementById('sql-results');
    
    // Sample data for the SQL playground
    const sampleData = {
        students: [
            { id: 1, name: 'Alice Johnson', age: 20 },
            { id: 2, name: 'Bob Smith', age: 22 },
            { id: 3, name: 'Carol Davis', age: 21 }
        ],
        courses: [
            { id: 1, title: 'Mathematics' },
            { id: 2, title: 'Physics' },
            { id: 3, title: 'Chemistry' }
        ],
        enrollments: [
            { student_id: 1, course_id: 1, grade: 'A' },
            { student_id: 1, course_id: 2, grade: 'B' },
            { student_id: 2, course_id: 1, grade: 'B' },
            { student_id: 3, course_id: 3, grade: 'A' }
        ]
    };
    
    runSqlButton.addEventListener('click', function() {
        const sqlCode = sqlEditor.value.toLowerCase();
        
        try {
            // Simple SQL parser for demonstration
            if (sqlCode.includes('select') && sqlCode.includes('from')) {
                if (sqlCode.includes('students') && sqlCode.includes('courses') && sqlCode.includes('enrollments')) {
                    // Complex join query
                    const results = sampleData.students.map(student => {
                        const enrollment = sampleData.enrollments.find(e => e.student_id === student.id);
                        if (enrollment) {
                            const course = sampleData.courses.find(c => c.id === enrollment.course_id);
                            return {
                                name: student.name,
                                title: course ? course.title : 'N/A',
                                grade: enrollment.grade
                            };
                        }
                        return null;
                    }).filter(Boolean);
                    
                    displayResults(results, ['name', 'title', 'grade']);
                } else if (sqlCode.includes('students')) {
                    displayResults(sampleData.students, ['id', 'name', 'age']);
                } else if (sqlCode.includes('courses')) {
                    displayResults(sampleData.courses, ['id', 'title']);
                } else if (sqlCode.includes('enrollments')) {
                    displayResults(sampleData.enrollments, ['student_id', 'course_id', 'grade']);
                } else {
                    sqlResults.innerHTML = '<p>No matching tables found in the query.</p>';
                }
            } else if (sqlCode.includes('create table') || sqlCode.includes('insert into')) {
                sqlResults.innerHTML = '<p style="color: #28a745;">Query executed successfully (simulated).</p>';
            } else {
                sqlResults.innerHTML = '<p>Only SELECT, CREATE TABLE, and INSERT queries are supported in this demo.</p>';
            }
        } catch (error) {
            sqlResults.innerHTML = `<p style="color: #dc3545;">Error: ${error.message}</p>`;
        }
    });
    
    function displayResults(data, columns) {
        if (data.length === 0) {
            sqlResults.innerHTML = '<p>No results found.</p>';
            return;
        }
        
        let html = '<table><thead><tr>';
        columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        data.forEach(row => {
            html += '<tr>';
            columns.forEach(col => {
                html += `<td>${row[col]}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        sqlResults.innerHTML = html;
    }
    
    // Initialize SQL results
    runSqlButton.click();
    
    // Exercise Hint
    const showHintButton = document.getElementById('show-hint');
    const hintContent = document.getElementById('hint-content');
    
    showHintButton.addEventListener('click', function() {
        hintContent.classList.toggle('show');
        this.textContent = hintContent.classList.contains('show') ? 'Hide Hint' : 'Show Hint';
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