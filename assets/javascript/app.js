// Timer specs
const timerQuestionMax = 10000;
const timerNewQuestion = 3000;

// Progress tracking
var currentProgress = 0;
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

    // Questions data
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
    //////////////////////////////////////////////////////
    // Controls/Listeners

    $("button").on("click", function () {
        $("#button-container").addClass("no-show");
        $("#quiz-container").removeClass("no-show");
        popQuiz();
        // Start timers
        rigQuestionTimeout();
        rigTimerTicker();
    });

    $("input[name=answers]").on("change", function (e) {
        // Clear timers
        clearTimeout(questionTimer);
        clearInterval(timerTicker);
        // Check answer
        timeUp(parseInt($(this).val()));
    })
    //
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // Timer funcs

    // Current question timer
    function rigQuestionTimeout() {
        questionTimer = setTimeout(function () {

            timeUp(-1);
        }, timerQuestionMax);
    }

    // New question timer
    function rigNewQuestionTimer() {
        questionTimer = setTimeout(function () {
            popQuiz();
            rigQuestionTimeout();
            rigTimerTicker();
            $("#timer").text(Math.floor(nextTickTime / 1000));
        }, timerNewQuestion);
    }

    // Time remaining
    function rigTimerTicker() {
        nextTickTime = timerQuestionMax;

        timerTicker = setInterval(function () {
            if (nextTickTime !== 0) {
                nextTickTime -= 1000;
                updateTimerUI();
            }
            else { clearInterval(timerTicker); }
        }, 1000);
    }

    //
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
    // UI Funcs

    function updateQuestionUI(repopQuestion, disableRadios) {

        if (repopQuestion) {
            // Clear previous answers
            $("input[name='answers']").prop("checked",false);
            // Get new question and choices
            $("#question-display").text(questionsTree[currentProgress].question);
            $("#answer-display").text("The correct answer is: " + currentAnswerString);

            // Populate selectable choices
            for (let i = 0; i < $choiceRadios.length; i++) {
                $choiceRadios[i].val(i);
                $choiceLabels[i].text(questionsTree[currentProgress].choices[i]);
            }
        }
        // Enable or disable radio buttons
        $("input[name=answers]").attr("disabled", disableRadios);
    }

    function updateAnswerUI(reveal) {
        // Hide or reveal answer
        if (reveal) { $("#answer-row").removeClass("hide"); }
        else { $("#answer-row").addClass("hide"); }
    }

    function updateTimerUI() {
        $("#timer").text(Math.floor(nextTickTime / 1000));
    }

    function updateGameOverUI() {
        $("#quiz-container").addClass("no-show");
        $("#game-over-container").removeClass("no-show");

        $("#results-correct").text(currentCorrect);
        $("#results-incorrect").text(currectIncorrect);
    }
    //
    //////////////////////////////////////////////////////

    function timeUp(choice) {
        // Disable radio buttons
        updateQuestionUI(false, true);
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

        updateAnswerUI(true);

        if (currentProgress < questionsTree.length) {
            // Prep time before a new question pops
            rigNewQuestionTimer();
        }
        // Shoe game over
        else {
            updateGameOverUI();
        }
    }

    function popQuiz() {
        // Check progress
        currentAnswerIndex = questionsTree[currentProgress].answerIndex;
        currentAnswerString = questionsTree[currentProgress].choices[currentAnswerIndex];

        // Update question and answer html
        updateAnswerUI(false);
        updateQuestionUI(true, false);

        currentProgress++;
    }
});