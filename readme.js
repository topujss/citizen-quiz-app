// get all elements
const start_btn = document.querySelector('.start_btn button'),
  info_box = document.querySelector('.info_box'),
  quit_btn = info_box.querySelector('.buttons .quit'),
  continue_btn = info_box.querySelector('.buttons .restart'),
  quiz_box = document.querySelector('.quiz_box'),
  option_list = document.querySelector('.option_list'),
  timeCount = quiz_box.querySelector('.timer .timer_sec'),
  time_line = quiz_box.querySelector(' .time_line');
  
/**
 * events
 */
// start btn event
start_btn.onclick = () => {
  info_box.classList.add('activeInfo');
};

// exit btn event
quit_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
};

// continue_btn event
continue_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
  quiz_box.classList.add('activeQuiz');
  showQuestions(0);
  qsnCounter(1);
  startTime(15);
};

/**
 * quiz question set up
 */
const que_count = 0;
const que_num = 1;
let counter;
let timeValue = 15;
let widthValue = 0;

const next_btn = document.querySelector('.next_btn');

// when next_btn clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_num++;
    showQuestions(que_count);
    qsnCounter(que_num);

    // time left
    clearInterval(counter);
    startTime(timeValue);

    // time left line
    clearInterval(counterLine);
    timeLine(widthValue);
    start;
  } else {
    console.log('qsn done');
  }
};

const showQuestions = (index) => {
  // question
  const que_text = document.querySelector('.que_text');
  let que_tag = `<span>${questions[index].id}. ${questions[index].question}</span>`;

  // option lists

  let option_tag = `
    <div class="option">${questions[index].option[1]}<span></span></div>
    <div class="option">${questions[index].option[3]}<span></span></div>
    <div class="option">${questions[index].option[0]}<span></span></div>
    <div class="option">${questions[index].option[2]}<span></span></div>
  `;

  // show to html
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  // get multiple by loop
  const option = option_list.querySelectorAll('.option');

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
};

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

const optionSelected = (answer) => {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOpt = option_list.children.length;
  if (userAns === correctAns) {
    answer.classList.add('correct');
    answer.insertAdjacentHTML('beforeend', tickIcon);
    console.log('correctAns');
  } else {
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIcon);
    for (let i = 0; i < allOpt; i++) {
      const selected = option_list.children[1];
      if (selected.textContent == correctAns) {
        selected.setAttribute('class', 'option correct');
        selected.insertAdjacentHTML('beforeend', tickIcon);
      }
    }
  }

  for (let i = 0; i < allOpt; i++) {
    option_list.children[i].classList.add('disabled');
  }
};

// time left logic
const startTime = (time) => {
  const timer = () => {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let zero = timeCount.innerHTML;
      timeCount.innerHTML = '0' + zero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = '00';
    }
  };
  counter = setInterval(timer, 1000);
};

// time heart line
const timeLine = (time) => {
  counterLine = setInterval(timer, 29);
  const timer = () => {
    time += 1;
    time_line.style.width = time + 'px';
    time < 549 ? clearInterval(counterLine) : null;
  };
};

const qsnCounter = (index) => {
  const btmQsnCount = quiz_box.querySelector('.total_que');
  const btmQsnTag = `<span><p>${index}</p>/<p>${questions.length}</p> Questions</span>`;
  btmQsnCount.innerHTML = btmQsnTag;
};
