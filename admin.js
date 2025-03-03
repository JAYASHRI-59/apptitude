document.addEventListener("DOMContentLoaded", function () {
    function updateAdminView() {
        let students = JSON.parse(localStorage.getItem("studentRecords")) || [];
        
        // Update student count
        document.getElementById("student-count").textContent = students.length;

        // Populate student results table
        let tbody = document.getElementById("student-results");
        tbody.innerHTML = ""; // Clear previous data

        students.forEach(student => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.username}</td>
                <td>${student.score}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Ensure student login is recorded properly
    function recordStudentLogin() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser && currentUser.role === "student") {
            let students = JSON.parse(localStorage.getItem("studentRecords")) || [];
            
            // Check if student already exists
            let existingStudent = students.find(s => s.username === currentUser.username);
            if (!existingStudent) {
                students.push({ username: currentUser.username, score: 0 }); // Default score 0 for new student
            }

            localStorage.setItem("studentRecords", JSON.stringify(students));
        }
    }

    // Function to update student score after quiz completion
    function updateStudentScore() {
        let students = JSON.parse(localStorage.getItem("studentRecords")) || [];
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let studentScore = localStorage.getItem("studentScore"); // Get score from quiz.js

        if (currentUser && currentUser.role === "student" && studentScore !== null) {
            let studentIndex = students.findIndex(s => s.username === currentUser.username);

            if (studentIndex !== -1) {
                let newScore = parseInt(studentScore); // Convert score to number
                students[studentIndex].score = newScore; // Update the student's score
                localStorage.setItem("studentRecords", JSON.stringify(students)); // Save updated data
            }
        }
    }

    // Call functions on page load
    recordStudentLogin();
    updateStudentScore(); // Ensure updated scores are fetched
    updateAdminView();

    // Clear history when button is clicked
    document.getElementById("clearHistoryBtn").addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all student history?")) {
            localStorage.removeItem("studentRecords"); // Clear student data
            document.getElementById("clearMessage").textContent = "Student history cleared successfully!";
            
            // Update UI after clearing
            updateAdminView();
        }
    });
});
