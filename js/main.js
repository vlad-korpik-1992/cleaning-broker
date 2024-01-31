function openMenu(event) {
    event.preventDefault()
    const btnMenu = document.querySelector('.menu__btn');
    const listMenu = document.querySelector('.menu__list');
    const btnElement = document.querySelector('.menu__btn__element');
    btnMenu.classList.toggle('menu__btn--close');
    listMenu.classList.toggle('menu__list--active');
    btnElement.classList.toggle('menu__btn__element--close');
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