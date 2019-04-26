// Timer specs
const timerQuestionMax = 10000;
const timerNewQuestion = 4000;

// Progress tracking
var currentProgress = 0;
var previousProgress = 0;
var currentCorrect = 0;
var currectIncorrect = 0;

$(document).ready(function () {
    // Answer html arrays
    const $choiceRadios = [$("#answer-a"), $("#answer-b"), $("#answer-c"), $("#answer-d")];
    const $choiceLabels = [$("#answer-a-label"), $("#answer-b-label"), $("#answer-c-label"), $("#answer-d-label")];

    // Current answer
    var currentAnswerIndex;
    var currentAnswerString;
    // Timers
    var questionTimer;
    var timerTicker;
    var nextTickTime = timerQuestionMax;

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
        popQuiz();
        // Start timers
        rigQuestionTimeout();
        rigTimerTicker();
    });

    // Question limit timer
    function rigQuestionTimeout() {
        questionTimer = setTimeout(function () {
            timeUp(2);
        }, timerNewQuestion);
    }

    // New question timer
    function rigNewQuestionTimer() {
        questionTimer = setTimeout(function () {
            rigQuestionTimeout();
            rigTimerTicker();
        }, timerNewQuestion);
    }

    // Time remaining
    function rigTimerTicker() {
        timerTicker = setInterval(function () {
            nextTickTime--;
            $("#timer").text(nextTickTime);
        }, 1000);
    }

    // Listen for input
    $("input[name=answers]").on("change", function (e) {
        // Clear timers
        clearTimeout(questionTimer);
        clearTimeout(rigTimerTicker);
        // Check answer
        timeUp(parseInt($(this).val()));
    })

    function timeUp(choice) {
        // Correct selection
        if (choice === currentAnswerIndex) {
            $("#choice-display").text("Correct!");
            currentCorrect++;
        }
        // Timeout
        else if (choice === -1) {
            $("#choice-display").text("Out of time.");
            currectIncorrect++;
        }
        // Incorrect selection
        else {
            $("#choice-display").text("Oops...");
            currectIncorrect++;
        }

        updateQAUI(false, true);

        currentProgress++;
        // Prep time before a new question pops
        rigNewQuestionTimer();
    }

    function popQuiz() {
        // Check progress
        if (currentProgress < questionsTree.length) {
            currentAnswerIndex = questionsTree[currentProgress].answerIndex;
            currentAnswerString = questionsTree[currentProgress].choices[currentAnswerIndex];

            // Update question and answer html
            updateQAUI(true, false);
        }
    }

    function updateQAUI(hideAnswer, disableRadios) {
        // Check if question needs reset
        if (previousProgress !== currentProgress) {
            $("#question-display").text(questionsTree[currentProgress].question);

            // Populate selectable choices
            for (let i = 0; i < $choiceRadios.length; i++) {
                $choiceRadios[i].val(i);
                $choiceLabels[i].text(questionsTree[currentProgress].choices[i]);
            }

            previousProgress = currentProgress;
        }

        // Hide or reveal answer
        if (hideAnswer) { $("#answer-row").removeClass("hide"); }
        else { $("#answer-row").addClass("hide"); }

        // Populate correct answer choice
        $("#answer-display").text("The correct answer is: " + currentAnswerString);
        // Enable or disable radio buttons
        $("input[name=answers]").attr("disabled", disableRadios);
    }
});