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