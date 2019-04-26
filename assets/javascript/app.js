// Timer specs
const timerQuestionMax = 10000;
const timerNewQuestion = 4000;
// Answer html arrays
const $choiceRadios = [$("#answer-a"), $("#answer-b"), $("#answer-c"), $("#answer-d")];
const $choiceLabels = [$("#answer-a-label"), $("#answer-b-label"), $("#answer-c-label"), $("#answer-d-label")];

// Progress tracking
var currentProgress = 0;
var currentCorrect = 0;
var currectIncorrect = 0;

$(document).ready(function () {
    // Current answer
    var currentAnswerIndex;
    var currentAnswerString;

    var questionsTree = [
        {
            question: "Which type of property was Old McDonald known for owning?",
            choices: ["School", "Farm", "Bank", "Hotel"],
            answerIndex: 1,
        },

        {
            question: "John Jacob Jingleheimer Smith shared his _______ with someone else.",
            choices: ["name", "shoes", "legos", "wife"],
            answerIndex: 0,
        },

        {
            question: "You and a friend are out camping when you are suddenly being rushed by a grizzly bear. How fast would you need to run to outrun the bear?",
            choices: ["30 km/hour", "20 feet/second", "20 miles/hour", "Faster than your friend"],
            answerIndex: 3,
        },

        {
            question: "Three tail-less mice found on a farmer's property were found to also be ________.",
            choices: ["loud", "frozen", "blind", "X-men"],
            answerIndex: 2
        }
    ]

    $("button").on("click", function () {
        $("#button-container").addClass("no-show");
        $("#quiz-container").removeClass("no-show");
    });

    function quizTime(previous) {
        setTimeout();

    }

    $("input[name=answers]").on("change", function (e) {
            var radioAnswer = parseInt($(this).val());

            // Correct selection
            if (radioAnswer === currentAnswerIndex) {
                $("#choice-display").text("Correct!");
            }
            // Incorrect selection
            else {
                $("#choice-display").text("Oops...");
            }
            $("input[name=answers]").attr("disabled", true);
            $("#answer-row").removeClass("hide");
    })

    function popQuiz() {
        // Check progress
        if (currentProgress < questionsTree.length) {
            currentAnswerIndex = questionsTree[currentProgress].answerIndex;
            currentAnswerString = questionsTree[currentProgress].choices[currentAnswerIndex];
            console.log(currentAnswerIndex);

            $("#answer-row").addClass("hide");

            $("#question-display").text(questionsTree[currentProgress].question);
            // Populate selectable choices
            for (let i = 0; i < $choiceRadios.length; i++) {
                $choiceRadios[i].val(i);
                $choiceLabels[i].text(questionsTree[currentProgress].choices[i]);
            }
            // Populate correct answer choice
            $("#answer-display").text("The correct answer is: " + currentAnswerString);
        }
        // The quiz is done
        else {

        }
    }

    popQuiz();
});