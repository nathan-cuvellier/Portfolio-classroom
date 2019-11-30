"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener("DOMContentLoaded", function (event) {
  console.log("%cHOP", "color: orange; font-size: xxx-large"); // for fun

  var nav = document.querySelector('nav');
  var menuBurger = document.querySelector('.menu-burger');
  var navLi = document.querySelectorAll('nav li');
  var projects = document.querySelectorAll('.project > div');
  navLi.forEach(function (li) {
    li.addEventListener('click', function () {
      nav.classList.remove('nav-active');
      menuBurger.classList.remove('nav-active');
    });
  });
  projects.forEach(function (project) {
    project.addEventListener('click', function () {
      var modal = document.createElement('div');
      var background = document.createElement('div');
      background.style.backgroundColor = '#000000';
      background.style.opacity = '.8';
      background.classList.add('bg-modal');
      modal.classList.add('modal');
      modal.appendChild(project.cloneNode(true));
      setTimeout(function () {
        if (document.querySelector('.modal') == null) {
          document.body.appendChild(background);
          document.body.appendChild(modal);
        }
      }, 1);
    });
  });
  document.body.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && nav.classList.contains('nav-active') && !menuBurger.contains(event.target)) {
      nav.classList.remove('nav-active');
      menuBurger.classList.remove('nav-active');
    }

    var modal = document.querySelector('.modal');

    if (modal != null && !modal.contains(event.target)) {
      document.body.removeChild(modal);
      document.body.removeChild(document.querySelector('.bg-modal'));
    } //if(this.contains(event.target))

  });
  menuBurger.addEventListener('click', function () {
    nav.classList.toggle('nav-active');
    menuBurger.classList.toggle('nav-active');
  });
  var i = 2;
  var bgHeader = document.querySelector('div.bg');
  setInterval(function () {
    bgHeader.style.backgroundImage = "url('img/moutain".concat(i, ".jpg')");
    i++;
    if (i > 3) i = 1;
  }, 5000);
  setInterval(function () {
    new Timer();
  }, 1000);
  new Animation();
});

var Timer =
/*#__PURE__*/
function () {
  function Timer() {
    _classCallCheck(this, Timer);

    var life = document.querySelector('#life');
    var p = '';
    var intervalLife = this.dateInterval();

    for (var timeUnity in intervalLife) {
      p += intervalLife[timeUnity] + ' ' + (intervalLife[timeUnity] > 1 ? timeUnity : timeUnity.substr(0, timeUnity.length - 1)) + ' ';
    }

    life.innerText = p;
  }

  _createClass(Timer, [{
    key: "dateInterval",
    value: function dateInterval() {
      var SECOND = 1000;
      var MINUTE = SECOND * 60;
      var HOUR = MINUTE * 60;
      var DAY = HOUR * 24;
      var MONTH = DAY * 30.4375; // (365.25/12)

      var YEAR = MONTH * 12;
      var times = {
        years: YEAR,
        months: MONTH,
        days: DAY,
        hours: HOUR,
        minutes: MINUTE,
        seconds: SECOND
      };
      var obj = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      var now = new Date();
      var birthday = new Date(2000, 5, 12, 21, 30, 0);
      var ms = now.getTime() - birthday.getTime() - now.getTimezoneOffset() * 60 * 1000;
      Object.keys(times).forEach(function (k) {
        obj[k] = Math.floor(ms / times[k]);
        ms -= obj[k] * times[k];
      });
      return obj;
    }
  }]);

  return Timer;
}();

var Skills = function Skills(canvas) {
  _classCallCheck(this, Skills);

  var id = canvas.getAttribute('id');
  var ratioSkill = canvas.getAttribute('data-ratio');
  var ctx = canvas.getContext('2d');
  var ration = 0;
  var interval = 10;

  var myFunction = function myFunction() {
    clearInterval(idInterval);

    if (ration < ratioSkill) {
      ration += 0.01;
      ration = Math.round(ration * 100) / 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 75, -.5 * Math.PI, Math.PI * 3 / 2 - (Math.PI * 3 / 2 - -.5 * Math.PI) * (1 - ration));
      ctx.lineWidth = 15;
      ctx.strokeStyle = '#d48800';
      ctx.stroke();
      ctx.font = "30px sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(ration * 100) + '%', canvas.width / 2, canvas.height / 2);
      idInterval = setTimeout(myFunction, interval);
    }
  };

  var idInterval = setTimeout(myFunction, interval);
};

var Animation = function Animation() {
  _classCallCheck(this, Animation);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entrie) {
      if (entrie.intersectionRatio > 0.7) {
        entrie.target.classList.remove('not-visible');
        if (Array.from(entrie.target.classList).includes('animation-skills')) new Skills(entrie.target.querySelector('canvas'));else if (Array.from(entrie.target.classList).includes('animation-fadeInLeft')) entrie.target.classList.add('fadeInLeft');else if (Array.from(entrie.target.classList).includes('animation-fadeInRight')) entrie.target.classList.add('fadeInRight');
        observer.unobserve(entrie.target);
      }
    });
  }, {
    threshold: [0.7]
  });
  var items = document.querySelectorAll('.animation, .animation-skills');
  items.forEach(function (item) {
    item.classList.add('not-visible');
    observer.observe(item);
  });
};