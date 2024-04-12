// 윈도우가 scroll 이벤트가 발생하면
// .scrollTop 내부 span 요소에 scrollTop 정보를 입력(.innerText, .innerHTML)
// 각 섹션의 offsetTop 정보를 p요소 내부의 span 영역에 정보를 입력

const sections = document.querySelectorAll('.contents > section');
const links = document.querySelectorAll('nav > a');

// figcaption 영역의 글자를 쪼개서 span으로 감싸기
const textSplit = document.querySelectorAll('.contents figcaption');
textSplit.forEach((el) => {
  let text = el.innerText;
  let textWrap = text.split('').join('</em><em>');
  textWrap = `<em>${textWrap}</em>`;
  // console.log(textWrap);
  // '문자'라는 텍스트가 있다고 가정하고 ->
  // <em>문</em><em>자</em>

  el.innerHTML = textWrap;
});

window.addEventListener('scroll', (e) => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  scrollTop = scrollTop + window.innerHeight / 2;
  document.querySelector('.scrollTop').querySelector('span').innerText =
    scrollTop;

  sections.forEach((sec, i) => {
    // section 요소에 class 적용
    scrollTop > sec.offsetTop
      ? sec.classList.add('active')
      : sec.classList.remove('active');
    // nav의 a 요소에 class 적용
    if (scrollTop >= sec.offsetTop) {
      links.forEach((a) => {
        a.classList.remove('on');
      });
      links[i].classList.add('on');
    }

    // figcaption 영역 em 요소에 class 적용하기
    // rFA
    // setTimeout(() => {
    //   text.classList.add('on');
    // }, 50 * (i * 3));
    if (scrollTop >= sec.offsetTop) {
      sec.querySelectorAll('figcaption > em').forEach((text, i) => {
        let frame = 0;
        let animate = () => {
          frame++;
          if (frame === 10 * (i + 1)) {
            text.classList.add('on');
          } else if (frame < 10 * (i + 1)) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      });
    }

    // 이미지 요소가 scrollTop 정보의 값에 따라 translateY 변경
    let targetImg = sec.querySelector('img');
    let targetSpan = sec.querySelector('span');
    let coordinate = (scrollTop - sec.offsetTop) * 0.1;
    targetImg.style.transform = `scale(2) skewY(-15deg) translateY(${-coordinate}px)`;
    targetSpan.style.transform = `translateX(0%) translateY(${coordinate}px)`;
  });
});

// let sec1 = document.querySelector('#sec1').offsetTop;
// let sec2 = document.querySelector('#sec2').offsetTop;
// sec1 = parseInt(sec1);
// sec2 = parseInt(sec2);
// window.addEventListener('resize', () => {
//   sec1 = document.querySelector('#sec1').offsetTop;
//   sec2 = document.querySelector('#sec2').offsetTop;
// });
// document.querySelector('.sec1Top>span').innerHTML = sec1;
// document.querySelector('.sec2Top>span').innerHTML = sec2;

let updatePosition = () => {
  const num = sections.length;
  for (let i = 1; i <= num; i++) {
    let sec = document.querySelector(`#sec${i}`).offsetTop;
    // let sec = document.querySelector(`#sec${i}`).getBoundingClientRect().top;
    document.querySelector(`.sec${i}Top>span`).innerHTML = sec;
  }
};
updatePosition();

window.addEventListener('resize', updatePosition);
