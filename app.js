// getting tag or class from html
const start_quiz = document.querySelector('button');
// info box
const info_box = document.querySelector('.info_box');
const quit_btn = info_box.querySelector('#quit');
const continue_btn = info_box.querySelector('#restart');
// quiz box
const quiz_box = document.querySelector('.quiz_box');
const option_list = quiz_box.querySelector('.option_list');
const time_line = quiz_box.querySelector('.time_line');
const time_text = quiz_box.querySelector('.time_left_txt');
const time_count = quiz_box.querySelector('.timer_sec');
const total_qsn = quiz_box.querySelector('.total_que');
const next_btn = quiz_box.querySelector('.next_btn');
// result box
const result_box = document.querySelector('.result_box');
const res_btn = result_box.querySelector('.buttons .restart');
const res_quit = result_box.querySelector('.buttons .quit');

// open info_box when start_quiz btn clicked
start_quiz.onclick = () => {
  info_box.classList.add('activeInfo');
};

// exit info_box when quit_btn clicked
quit_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
};

// what happen when continue_btn clicked
continue_btn.onclick = () => {
  info_box.classList.remove('activeInfo');
  quiz_box.classList.add('activeQuiz');
  showQsn(5);
  // qsnCount(1);
  startTime(15);
  // startTimeLine(0);
};

// default value
let time_value = 15;
let qsn_count = 0;
let qsn_num = 1;
let user_score = 0;
let width_val = 0;
let counter, counterLine;

//when res_btn clicked
res_btn.onclick = () => {
  quiz_box.classList.add('activeQuiz');
  result_box.classList.remove('activeResult');
  // default value applied here
  time_value = 15;
  qsn_count = 0;
  qsn_num = 1;
  user_score = 0;
  width_val = 0;
  showQsn(qsn_count);
  qsnCount(qsn_num);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(time_value);
  startTimerLine(width_val);
  time_text.innerHTML = 'Time left';
  next_btn.classList.remove('show');
};

// reload window when clicked
res_quit.onclick = () => {
  window.location.reload();
};

// when next_btn clicked
next_btn.onclick = () => {
  if (qsn_count < questions.length - 1) {
    qsn_count++;
    qsn_num++;
    showQsn(qsn_count);
    qsnCount(qsn_num);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(time_value);
    startTimerLine(width_val);
    time_text.innerHTML = 'time left';
    next_btn.classList.remove('show');
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

// showQsn - getting qsn from the array
const showQsn = (index) => {
  // showing question to frontend
  let qsn_txt = document.querySelector('.que_text');
  let qsn_tag = `<span>${questions[index].id}</span>. ${questions[index].question}`;
  qsn_txt.innerHTML = qsn_tag;

  // showing question to frontend
  let option_tag = `
    <div class="option">${questions[index].option[1]}<span></span></div>
    <div class="option">${questions[index].option[3]}<span></span></div>
    <div class="option">${questions[index].option[0]}<span></span></div>
    <div class="option">${questions[index].option[2]}<span></span></div>
  `;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll('.option');

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
};

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;
//when user clicked an option
const optionSelected = (answer) => {
  clearInterval(counter);
  clearInterval(counterLine);
  let user_ans = answer.textContent;
  let correct_ans = questions[qsn_count].answer;
  let all_Opt = option_list.children.length;

  if (user_ans == correct_ans) {
    user_score += 1;
    answer.classList.add('correct');
    answer.insertAdjacentHTML('beforeend', tickIcon);
  } else {
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', crossIcon);
    for (i = 0; i < all_Opt; i++) {
      let select = option_list.children[i];
      if (select.textContent == correct_ans) {
        select.setAttribute('class', 'option correct');
        select.insertAdjacentHTML('beforeend', tickIcon);
      }
    }
  }
  for (i = 0; i < all_Opt; i++) {
    option_list.children[i].classList.add('disabled');
  }
  next_btn.classList.add('show');
};

// show result function
const showResult = () => {
  info_box.classList.remove('activeInfo');
  quiz_box.classList.remove('activeQuiz');
  result_box.classList.add('activeResult');
  const score_text = result_box.querySelector('.score_text');
  const arr = questions.length;
  if (user_score > 3) {
    let scoreTag = `<span>and congrats, you got<p>${user_score}</p> out of <p>${arr}</p></span>`;
    score_text.innerHTML = scoreTag;
  } else if (user_score > 1) {
    let scoreTag = `<span>and nice, you got<p>${user_score}</p> out of <p>${arr}</p></span>`;
    score_text.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>and sorry, you got <p>${user_score}</p> out of <p>${arr}</p></span>`;
    score_text.innerHTML = scoreTag;
  }
};

// start time function
const startTime = (time) => {
  const timer = () => {
    time_count.textContent = time;
    time--;
    // add zero
    if (time < 9) {
      let zero = time_count.textContent;
      time_count.textContent = '0' + zero;
    }
    if (time < 0) {
      clearInterval(counter);
      time_text.textContent = 'Time off';
      const all_Opt = option_list.children.length;
      let correct_ans = questions[qsn_count].answer;
      for (i = 0; i < all_Opt; i++) {
        const list = option_list.children[i];
        if (list.textContent == correct_ans) {
          list.setAttribute('class', 'option correct');
          list.insertAdjacentElement('beforeend', tickIcon);
          console.log('time off: auto selected!');
        }
      }
      for (i = 0; i < all_Opt; i++) {
        option_list.children[i].classList.add('disabled');
      }
    }
  };
  counter = setInterval(timer, 1000);
};
