const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], correct: 1 },
    { question: "The Earth is flat.", options: ["True", "False"], correct: 1 },
    { question: "A train running at 60 km/h crosses a pole in 9 seconds. What is the length of the train?", options: ["120 m", "150 m", "180 m"], correct: 1 }


    
];

let currentQuestionIndex = 0;
let score = 0;
let student = JSON.parse(localStorage.getItem("currentUser")) || {};

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const confirmButton = document.getElementById("confirm-btn");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
    let q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });

    confirmButton.disabled = true;
    feedback.textContent = "";
}

let selectedAnswer = null;
function selectAnswer(index) {
    selectedAnswer = index;
    confirmButton.disabled = false;
}

confirmButton.addEventListener("click", () => {
    let correctIndex = questions[currentQuestionIndex].correct;
    let buttons = optionsContainer.getElementsByTagName("button");

    if (selectedAnswer === correctIndex) {
        buttons[selectedAnswer].classList.add("correct");
        score++;
    } else {
        buttons[selectedAnswer].classList.add("wrong");
    }

    feedback.textContent = selectedAnswer === correctIndex ? "Correct!" : "Wrong!";
    confirmButton.disabled = true;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            questionText.textContent = "Quiz Finished!";
            optionsContainer.innerHTML = "";
            feedback.textContent = "";
            scoreDisplay.textContent = `Final Score: ${score} / ${questions.length}`;
            confirmButton.style.display = "none";
            saveStudentResult();
        }
    }, 1000);
});

function saveStudentResult() {
    let studentRecords = JSON.parse(localStorage.getItem("studentRecords")) || [];
    
    let existingStudentIndex = studentRecords.findIndex(s => s.username === student.username);

    if (existingStudentIndex !== -1) {
        studentRecords[existingStudentIndex].score = score; // Update existing student score
    } else {
        studentRecords.push({ username: student.username, score: score }); // Add new student
    }

    localStorage.setItem("studentRecords", JSON.stringify(studentRecords));
}

loadQuestion();
