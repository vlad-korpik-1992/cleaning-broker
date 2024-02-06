function openMenu(event) {
  event.preventDefault()
  const btnMenu = document.querySelector('.menu__btn');
  const listMenu = document.querySelector('.menu__list');
  const btnElement = document.querySelector('.menu__btn__element');
  btnMenu.classList.toggle('menu__btn--close');
  listMenu.classList.toggle('menu__list--active');
  btnElement.classList.toggle('menu__btn__element--close');
}

const anchors = document.querySelectorAll('.menu--scroll')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    const btnMenu = document.querySelector('.menu__btn');
    const listMenu = document.querySelector('.menu__list');
    const btnElement = document.querySelector('.menu__btn__element');
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    if (btnMenu.classList.contains('menu__btn--close')) {
      btnMenu.classList.remove('menu__btn--close');
    }
    if (listMenu.classList.contains('menu__list--active')) {
      listMenu.classList.remove('menu__list--active');
    }
    if (btnElement.classList.contains('menu__btn__element--close')) {
      btnElement.classList.remove('menu__btn__element--close');
    }
  })
}

window.onscroll = function () { fixHeader() }

let header = document.querySelector('.header')
let sticky = header.offsetTop
let bodyTop = document.querySelector('body')

function fixHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("header--fixed")
    bodyTop.classList.add("body--top")
  } else {
    header.classList.remove("header--fixed")
    bodyTop.classList.remove("body--top")
  }
}

let btn = document.querySelectorAll('.features__tabs__items__btn');
let contenNodes = document.querySelectorAll('.features__tabs__items__content');
function hideAll() {
  contenNodes.forEach(cNode => {
    cNode.classList.remove('features__tabs__items__content--active');
  });
  btn.forEach(cNode => {
    cNode.classList.remove('features__tabs__items__btn--active');
  });
}
btn.forEach(function (e) {
  e.onclick = function (e) {
    hideAll();
    let tab1 = this.nextElementSibling;
    let btn1 = e.target;
    tab1.classList.toggle('features__tabs__items__content--active');
    btn1.classList.toggle('features__tabs__items__btn--active');
  }
});

/* Open a video in a modal window */
function openVideoModal(event) {
  event.preventDefault();
  let dataLink = event.target.getAttribute("data-link");
  document.getElementById('video-content').innerHTML = dataLink;
  const modal = document.querySelector('.modal-video');
  modal.classList.add('modal-video--open');
};

function closeVideoModal(event) {
  event.preventDefault()
  const modal = document.querySelector('.modal-video');
  modal.classList.remove('modal-video--open');
  document.getElementById('video-content').innerHTML = '';
}
/* Open a video in a modal window */

/* Open a contact form in a modal window */
function openContactModal(event) {
  event.preventDefault();
  const modal = document.querySelector('.modal-contact');
  modal.classList.add('modal-video--open');
};

function closeContactModal(event) {
  event.preventDefault()
  const modal = document.querySelector('.modal-contact');
  modal.classList.remove('modal-video--open');
}
/* Open a video in a modal window */

/* Sending a form */

const submit = document.querySelector('.contact__form__btn')

submit.onclick = (e) => {
  e.preventDefault()

  let x = document.querySelector('#firstname').value
  if (x === "") {
    document.querySelector('.form--error').textContent = "Please enter your name";
    return false;
  }
  x = document.querySelector('#phone').value
  if (x === "") {
    document.querySelector('.form--error').textContent = "Please enter your phone number";
    return false;
  }
  x = document.querySelector('#email').value;
  if (x === "") {
    document.querySelector('.form--error').textContent = "Please enter your E-mail";
    return false;
  } else {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(x)) {
      document.querySelector('.form--error').textContent = "Incorrect E-mail";
      return false;
    }
  }

  const params = new FormData(document.querySelector('.contact__form'))

  fetch('./send.php', {
    method: 'POST',
    body: params
  }).then(
    response => {
      return response.text()
    }).then(
      () => {
        document.querySelector('.form--error').textContent = ''
        document.querySelector('.form--error').classList.remove('form--error--warning');
        document.querySelector('.form--error').textContent = 'The message has been successfully sent. An expert will contact you in a few minutes';
        setTimeout(function () {
          const modal = document.querySelector('.modal-contact');
          modal.classList.remove('modal-video--open');
          document.querySelector('.contact__form').reset()
          document.querySelector('.form--error').textContent = '';
          document.querySelector('.form--error').classList.add('form--error--warning');
        }, 10000)
      }
    )
}

let questionAnswer = '';

function nextSliderResidental(event) {
  event.preventDefault();
  const slider = document.querySelector('.quiz__box--first');
  const sliderSecond = document.querySelector('.quiz__box--second');
  slider.classList.remove('quiz__box--active');
  sliderSecond.classList.add('quiz__box--active');
  questionAnswer = questionAnswer + 'Are you interested in Residential or Cleaning: RESIDENTIAL<br/>';
}

function nextSliderCommercial(event) {
  event.preventDefault();
  const slider = document.querySelector('.quiz__box--first');
  const sliderSecond = document.querySelector('.quiz__box--second');
  slider.classList.remove('quiz__box--active');
  sliderSecond.classList.add('quiz__box--active');
  questionAnswer = questionAnswer + 'Are you interested in Residential or Cleaning: COMMERCIAL<br/>';
}

function nextSliderThird(event) {
  event.preventDefault();
  const slider = document.querySelector('.quiz__box--second');
  const sliderNext = document.querySelector('.quiz__box--third');
  let checkboxes = document.getElementsByName('answer1[]');
  let answers = '';
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) {
      answers = answers + checkboxes[i].value + "|";
    }
  }
  if (answers != '') {
    slider.classList.remove('quiz__box--active');
    sliderNext.classList.add('quiz__box--active');
    questionAnswer = questionAnswer + ' What services are you currently interested in: ' + answers + '<br/>';
  }
}

function nextSliderFour(event) {
  event.preventDefault();
  let answers = '';
  const slider = document.querySelector('.quiz__box--third');
  const sliderNext = document.querySelector('.quiz__box--four');
  const square = document.querySelector('[name="square"]').value;
  const bedrooms = document.querySelector('[name="bedrooms"]').value;
  const bathrooms = document.querySelector('[name="bathrooms"]').value;
  const floors = document.querySelector('[name="floors"]').value;
  let checkboxes = document.getElementsByName('answer3[]');
  let date = document.querySelector('[name="date"]').value;
  data = new FormData();
  const uploadField = document.getElementById("files");
  if (uploadField.files.length >= 6) {
    document.getElementById('files__status').textContent = "It is forbidden to upload more than 5 files";
    return false;
  }
  if (uploadField.files.length >= 1) {
    for (let i = 0; i < uploadField.files.length; i++) {
      if (uploadField.files[i].size > 10048576) {
        document.getElementById('files__status').textContent = "The file size should not exceed 10MB";
        return false;
      }
      if (/\.(jpe?g|png|PNG|gif|tif)$/i.test(uploadField.files[i].name) === false) {
        document.getElementById('files__status').textContent = "Invalid file format";
        return false;
      }
      data.append('files[]', document.getElementById('files').files[i]);
    }
  }
  if (date != '') {
    questionAnswer = questionAnswer + ' Square footage: ' + square + '<br/>';
    questionAnswer = questionAnswer + ' Bedrooms: ' + bedrooms + '<br/>';
    questionAnswer = questionAnswer + ' Bathrooms: ' + bathrooms + '<br/>';
    questionAnswer = questionAnswer + ' Exterior floors: ' + floors + '<br/>';
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        answers = answers + checkboxes[i].value + "|";
      }
    }
    questionAnswer = questionAnswer + ' Options: ' + answers + '<br/>';
    questionAnswer = questionAnswer + ' Desired date of cleaning: ' + date + '<br/>';
    data.append('answer', questionAnswer);
    slider.classList.remove('quiz__box--active');
    sliderNext.classList.add('quiz__box--active');
  }
  else {
      document.querySelector('#quiz__date__error').textContent = "Please specify the desired cleaning date";
      return false;
  }
}

function nextSliderFive(event) {
  event.preventDefault();
  let answers = '';
  const slider = document.querySelector('.quiz__box--four');
  const sliderNext = document.querySelector('.quiz__box--five');
  const message = document.querySelector('[name="message"]').value;
  questionAnswer = questionAnswer + 'Its there anything else you would like us to know?: ' + message + '<br/>';
  data.append('answerFive', questionAnswer);
  slider.classList.remove('quiz__box--active');
  sliderNext.classList.add('quiz__box--active');
}

/* File selection */

let fields = document.querySelectorAll('.quiz__file');
Array.prototype.forEach.call(fields, function (input) {
  let label = input.nextElementSibling,
    labelVal = label.querySelector('.quiz__file-fake').innerText;

  input.addEventListener('change', function (e) {
    let countFiles = '';
    if (this.files && this.files.length >= 1)
      countFiles = this.files.length;

    if (countFiles)
      label.querySelector('.quiz__file-fake').innerText = 'Selected files: ' + countFiles;
    else
      label.querySelector('.quiz__file-fake').innerText = labelVal;
  });
});

/* Ajax Quiz Send*/
$(document).ready(function () {
  $('#quiz-send').click(function (e) {
    e.preventDefault();
    x = document.querySelector('[name="name-quiz"').value;
    console.log(x);
    if (x === "") {
      document.querySelector('#quiz__form__error').textContent = "Please enter your name";
      return false;
    }
    x = document.querySelector('[name="address-quiz"').value;
    if (x === "") {
      document.querySelector('#quiz__form__error').textContent = "Please provide your address";
      return false;
    }
    x = document.querySelector('[name="phone-quiz"').value;
    if (x === "") {
      document.querySelector('#quiz__form__error').textContent = "Please give me your phone number";
      return false;
    }
    x = document.querySelector('[name="email-quiz"').value;
    if (x === "") {
      document.querySelector('#quiz__form__error').textContent = "Please enter your E-mail";
      return false;
    } else {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(x)) {
        document.querySelector('#quiz__form__error').textContent = "Incorrect E-mail";
        return false;
      }
    }
    let checkboxes = document.getElementsByName('answer5[]');
    let answers = '';
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        answers = answers + checkboxes[i].value + "|";
      }
    }
    questionAnswer = questionAnswer + ' What is your preferred way of contact? ' + answers + '<br/>';
    $('#quiz__form__error').removeClass("quiz__form__error--warning");
    document.getElementById('quiz__form__error').textContent = "There's a shipment coming in...";
    data.append('firstname', $('input[name=name-quiz]').val());
    data.append('address', $('input[name=address-quiz]').val());
    data.append('phone', $('input[name=phone-quiz]').val());
    data.append('email', $('input[name=email-quiz]').val());
    data.append('answerFinish', questionAnswer);
    $.ajax({
      url: './quiz-mail.php',
      type: "POST",
      data: data,
      processData: false,
      contentType: false,
      success: function () {
        $('#quiz__inner__items--grid').trigger('reset');
        $('#quiz__form__error').text("The message has been successfully sent. An expert will contact you in a few minutes");
        setTimeout(function () {
          $('#quiz__form__error').text("").addClass("error");
        }, 2000);
      },
      error: function (jqXHR) {
        $('#quiz__form__error').text(jqXHR);
      }
    });
  });
});