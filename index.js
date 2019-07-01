let questionNumber = 0;
let score = 0;

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[0]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[1]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[2]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${
      STORE[questionNumber].answers[3]
    }" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $(".questionNumber").text(10);
  }
}

function changeQuestionNumber() {
  //if (questionNumber < STORE.length) {
  questionNumber++;
  //}
  $(".questionNumber").text(questionNumber + 1);
}

function changeScore() {
  score++;
}

function beginTheQuiz() {
  $(".beginQuiz").on("click", ".beginButton", function(event) {
    $(".beginQuiz").remove();
    $(".questionAndAnswerForm").css("display", "block");
    $(".questionNumber").text(1);
  });
}

function renderQuestion() {
  $(".questionAndAnswerForm").html(generateQuestion());
}

function userSelectAnswer() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let selected = $("input:checked");
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass("correct");
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass("wrong");
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect() {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong() {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $(".questionAndAnswerForm").html(
    `<div class="correctFeedback"><div class="icon"><img src="${
      STORE[questionNumber].icon
    }" alt="${
      STORE[questionNumber].alt
    }"/></div><p><b>Correct! I suppose you think that was terribly clever...</b></p><button type=button class="nextButton">Go forth</button></div>`
  );
}

function userAnswerFeedbackWrong() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $(".questionAndAnswerForm").html(
    `<div class="correctFeedback"><div class="icon"><img src="${
      STORE[questionNumber].icon
    }" alt="${
      STORE[questionNumber].alt
    }"/></div><p><b>Fool of a Took! Your answer has been cast back into the fiery chasm from whence it came...</b><br>The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Go forth</button></div>`
  );
}

function updateScore() {
  changeScore();
  $(".score").text(score);
}

function renderResults() {
  if (score >= 7) {
    $(".questionAndAnswerForm").html(
      `<div class="results correctFeedback"><h3>Behold! A true Tolkienite, indeed!</h3><img src="https://4.bp.blogspot.com/-OGtnENLzcGw/WyFmHgV9svI/AAAAAAAAB-I/k655kkQQD2k71ViCgFlkflUu9bTx4CjJgCLcBGAs/s1600/Hobbits-Toast.gif" alt="hobbits cheer gif"/><p>You scored: ${score} / 10</p><p>Here at last, dear friends, on the shores of the Sea comes the end of our quiz! Go in peace!</p><button class="restartButton">Restart Quiz</button></div>`
    );
  } else {
    $(".questionAndAnswerForm").html(
      `<div class="results correctFeedback"><h3>YOU SHALL NOT PASS! But do not weep young hobbit, for not all tears are an evil...</h3><img src="https://media.giphy.com/media/g4ZeaXyvRar1S/giphy.gif" alt="Boromir face palm gif"/><p>You scored: ${score} / 10</p><p>Here at last, dear friends, on the shores of the Sea comes the end of our quiz! Go in peace!</p><button class="restartButton">Restart Quiz</button></div>`
    );
  }
}

function renderNextQuestion() {
  $("main").on("click", ".nextButton", function(event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz() {
  $("main").on("click", ".restartButton", function(event) {
    location.reload();
  });
}

function createQuiz() {
  beginTheQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
