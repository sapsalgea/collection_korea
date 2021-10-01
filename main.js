// Make navbar transparent when it is on the top
//네비게이션 바 움직이면, 배경에 색상 생기게함.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});


//모바일 화면에서 네비게이션바 햄버거버튼 눌렀을때 처리
const toggleBtn = document.querySelector('.navbar__toggleBtn');
const navbar__menu = document.querySelector('.navbar__menu');
const navbar__lang = document.querySelector('.navbar__lang');

toggleBtn.addEventListener('click', () => {
    navbar__menu.classList.toggle('active');
    navbar__lang.classList.toggle('active');
});



//Infinite Scrolling Image Marquee/Carousel

const InfiniMarq = function(userSettings) {

  const defaults = {
    container: null,
    childSelector: 'img',
    offset: 0,
    delay: 0,
    speed: 100
  };

  const settings = Object.assign(defaults, userSettings);

  // const requestAnimationFrame =
  //   window.requestAnimationFrame ||
  //   window.mozRequestAnimationFrame ||
  //   window.webkitRequestAnimationFrame ||
  //   window.msRequestAnimationFrame;

  function _animate() {
    const container = settings.container;
    const marquee = container.querySelector('#marquee');
    const containerRectRight = container.getBoundingClientRect().right;
    const containerRectLeft = container.getBoundingClientRect().left;
    const marqueeRectRight = marquee.getBoundingClientRect().right;
    const marqueeClone = marquee.cloneNode(true);
    
    marqueeClone.style.marginLeft = '0px';

    if (marqueeRectRight === containerRectRight) {
      // console.log('APPEND MARQUEE CLONE');
      container.appendChild(marqueeClone);
    } 
    
    // 2 is total border width for container+marquee... for demo only. something weird with clientRect and css box-model.
    if (marqueeRectRight <= containerRectLeft + 2) {
      // console.log('REMOVE LEADING MARQUEE');
      container.removeChild(marquee);
    }

    _setSpeed(marquee, settings.speed);

    requestAnimationFrame(_animate);
  }

  function _generateMarquee() {
    let marquee = document.createElement('div');
    marquee.id = 'marquee';
    marquee.class = 'marquee';
    return _populateMarquee(settings.childSelector, marquee);
  }

  function _populateMarquee(childSelector, marquee) {
    const children = settings.container.querySelectorAll(childSelector);
    children.forEach(child => marquee.appendChild(child));
    return marquee;
  }

  // function _calculateInitialOffset(container, offset) {
  //   return parseFloat(getComputedStyle(containers0- offset + 'px';
  // }

  function _setSpeed(marquee, speed) {
    const pixels = parseFloat(getComputedStyle(marquee).marginLeft) - (speed / 100);
    marquee.style.marginLeft = pixels + 'px';
  }


  return {
    init() {
      const marquee = _generateMarquee();
      const container = settings.container;
      // const firstChild = marquee.firstChild;
      // const initialOffset = _calculateInitialOffset(container, settings.offset);

      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }

      // firstChild.style.marginLeft = initialOffset;
      container.appendChild(marquee);
      container.style.visibility = 'visible';

      setTimeout(() => _animate(), settings.delay);
    }
  }

};

document.addEventListener('DOMContentLoaded', () => {
  (new InfiniMarq({
    container: document.querySelector('#home__partner__container'),
    childSelector: 'img',
    // offset: 0,
    delay: 0,
    speed: 100
  })).init();
});