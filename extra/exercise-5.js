document.addEventListener("DOMContentLoaded", function () {
    const questionsNumberInput = document.querySelector('[data-function="questions-number"]');
    const startGameButton = document.querySelector('[data-function="start-game"]');
    const gameboard = document.querySelector('[data-function="gameboard"]');
    const checkGameButton = document.querySelector('[data-function="check-game"]');
    
    let questions = [];

    startGameButton.addEventListener("click", async function () {
        const numberOfQuestions = parseInt(questionsNumberInput.value);

        if (isNaN(numberOfQuestions) || numberOfQuestions <= 0) {
            alert("Please enter a valid number of questions.");
            return;
        }

        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`);
            const data = await response.json();
            questions = data.results;
            displayQuestions();
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    });

    function displayQuestions() {
        gameboard.innerHTML = ""; 

        questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

            if (question.type === "multiple") {
                const answers = [...question.incorrect_answers, question.correct_answer];
                shuffleArray(answers);

                answers.forEach((answer, answerIndex) => {
                    const answerElement = document.createElement("div");
                    answerElement.innerHTML = `<label class="answer"><input type="radio" name="question${index}" value="${answerIndex}">${answer}</label>`;
                    questionElement.appendChild(answerElement);
                });
            } else if (question.type === "boolean") {
                const trueLabel = document.createElement("label");
                trueLabel.innerHTML = '<label class="answer"><input type="radio" name="question${index}" value="0">True</label>';
                questionElement.appendChild(trueLabel);

                const falseLabel = document.createElement("label");
                falseLabel.innerHTML = '<label class="answer"><input type="radio" name="question${index}" value="1">False</label>';
                questionElement.appendChild(falseLabel);
            }

            gameboard.appendChild(questionElement);
        });
    }

    checkGameButton.addEventListener("click", function () {
        let score = 0;

        questions.forEach((question, index) => {
            const selectedAnswerIndex = document.querySelector(`input[name="question${index}"]:checked`);

            if (selectedAnswerIndex) {
                const selectedAnswer = parseInt(selectedAnswerIndex.value);
                if (question.type === "multiple" && selectedAnswer === answers.indexOf(question.correct_answer)) {
                    score++;
                } else if (question.type === "boolean" && selectedAnswer === (question.correct_answer === "True" ? 0 : 1)) {
                    score++;
                }
            }
        });

        alert(`Your score: ${score}/${questions.length}`);
    });

  
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
