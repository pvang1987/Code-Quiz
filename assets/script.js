document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    const startQuizBtn = document.querySelector("#startQuiz");
    const timer = document.querySelector(".timer");
    const questionArea = document.getElementById("questionArea");
    const highScoresList = document.getElementById("highScoresList");
    const initialsInput = document.getElementById("initialsInput");
    const submitScoreBtn = document.getElementById("submitScoreBtn");
    const answerButtons = document.getElementById("answerButtons");

    // quiz variables
    let quizTime = 60;
    let questionIndex = 0;
    let score = 0;
    let initials = "";

    // quiz questions and answers
    const questions = [
        {
            question: "Javascript is an _______ language?",
            choices: [
                "Object-oriented",
                "Object-based",
                "Procedural",
                "None of the above",
            ],
            correctAnswer: "Object-oriented",
        },
        {
            question: "Which of the following keywords is used to define a variable in Javascript?",
            choices: [
                "var",
                "let",
                "Both A and B",
                "None of the above",
            ],
            correctAnswer: "Both A and B",
        },
        {
            question: "Which of the following methods can be used to display data in some form using Javascript?",
            choices: [
                "document.write()",
                "console.log()",
                "window.alert()",
                "All of the above",
            ],
            correctAnswer: "All of the above",
        },
        {
            question: "What is the use of the <noscript> tag in Javascript?",
            choices: [
                "The contents are displayed by non-JS-based browsers",
                "Clears all the cookies and cache",
                "Both A and B",
                "None of the above",
            ],
            correctAnswer: "The contents are displayed by non-JS-based browsers",
        },
        {
            question: "When an operator's value is NULL, the type of returned by the unary operator is:",
            choices: [
                "Boolean",
                "Object",
                "Undefined",
                "Integer",
            ],
            correctAnswer: "Object",
        },
    ];

    // timer interval
    function startTimer() {
        const timeInterval = setInterval(function () {
            quizTime--;
            timer.textContent = quizTime + " seconds left";

            if (quizTime <= 0) {
                clearInterval(timeInterval);
                gameOver();
            }
        }, 1000);
    }

    // function to load the current question and answer buttons
    function loadQuestion() {
        const currentQuestion = questions[questionIndex];
        const questionArea = document.getElementById("questionArea");
        questionArea.textContent = currentQuestion.question;

        // remove previous answer buttons
        const answerButtons = document.getElementById("answerButtons");
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }

        // create and append answer buttons
        currentQuestion.choices.forEach((choice, index) => {
            const answerButton = document.createElement("button");
            answerButton.textContent = `${index + 1}. ${choice}`;
            answerButton.classList.add("answerBtn");
            answerButton.addEventListener("click", handleAnswerClick);
            answerButtons.appendChild(answerButton);
        });
    }

    // function to handle user clicks on answer buttons
    function handleAnswerClick(event) {
        const clickedButton = event.target;
        const userAnswer = clickedButton.textContent.split(". ")[1];
        const currentQuestion = questions[questionIndex];
    
        if (userAnswer === currentQuestion.correctAnswer) {
        // correct answer logic
        score += 10;
        } else {
        // incorrect answer logic
        quizTime -= 5;
        }
    
        // clear answer buttons
        const answerButtons = document.getElementById("answerButtons");
        answerButtons.innerHTML = "";
    
        // display the correct answer to the user
        questionArea.textContent = `The correct answer is: ${currentQuestion.correctAnswer}`;
        setTimeout(() => {
        // move to the next question after a brief delay
        questionArea.textContent = "";
        questionIndex++;
    
        if (questionIndex < questions.length) {
            loadQuestion();
        } else {
            // quiz is over
            gameOver();
        }
        }, 1500); // delay for 1.5 seconds before moving to the next question
    }  

    // function to handle game over
    function gameOver() {
        answerButtons.innerHTML = ""; 
        timer.textContent = "Game Over";
        questionArea.textContent = `Your Score: ${score}`;
        initialsInput.style.display = "block";

        // show the initials container
        const initialsContainer = document.querySelector(".initialsContainer");
        initialsContainer.style.display = "block";

        submitScoreBtn.style.display = "block";
    }

    // function to start the quiz
    function startQuiz() {
        console.log("Start Quiz button clicked");
        // reset the question index to 0
        questionIndex = 0;
        // start the timer
        startTimer();
        // hide the start message
        const startMessage = document.getElementById("startMessage");
        startMessage.style.display = "none"; // Add this line to hide the message
        // clear the previous score display
        timer.textContent = "60 seconds left.";
        // load the first question
        loadQuestion();
        startQuizBtn.style.display = "none";
    }


    // start the quiz when the "start" button is clicked
    startQuizBtn.addEventListener("click", startQuiz);

    // function to display high scores
    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScoresList.innerHTML = "";

        highScores.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
            highScoresList.appendChild(listItem);
        });
    }

    // inside the submitScoreBtn click event listener
    submitScoreBtn.addEventListener("click", function () {
        initials = initialsInput.value;
        if (initials) {
            const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push({ initials, score });
            localStorage.setItem("highScores", JSON.stringify(highScores));
            initialsInput.value = "";
            displayHighScores();
            
            // hide the initials input, submit button, and the label
            initialsInput.style.display = "none";
            submitScoreBtn.style.display = "none";
            document.querySelector("label[for='initialsInput']").style.display = "none";
    
            // show the "Start Quiz" button
            startQuizBtn.style.display = "block";
        }
    });

    // display high scores when the page loads
    displayHighScores();

        // add this section to toggle high scores visibility
        const viewHighScoresLink = document.getElementById("viewHighScores");
        const highScoresContainer = document.querySelector(".highScoresContainer");
    
        viewHighScoresLink.addEventListener("click", function (event) {
            event.preventDefault(); // prevent the link from navigating
    
            // toggle the visibility of the high scores container
            if (highScoresContainer.style.display === "none") {
                highScoresContainer.style.display = "block";
            } else {
                highScoresContainer.style.display = "none";
            }
        });
    });
