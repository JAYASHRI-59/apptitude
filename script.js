document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;
    let errorMessage = document.getElementById("errorMessage");

    const adminCredentials = { username: "admin", password: "admin123" };
    const studentPassword = "1234"; // Common password for all students

    if (role === "admin" && username === adminCredentials.username && password === adminCredentials.password) {
        errorMessage.textContent = "";
        localStorage.setItem("currentUser", JSON.stringify({ username, role }));
        window.location.href = "admin.html";
    } else if (role === "student" && password === studentPassword) {
        errorMessage.textContent = "";
        localStorage.setItem("currentUser", JSON.stringify({ username, role }));
        window.location.href = "quiz.html";
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});
