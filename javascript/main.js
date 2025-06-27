/* 다크모드 */
const toggle_logo = document.querySelector('#index a img');
const toggle_btn = document.getElementById('toggle_dark_mode');
const toggle_btn_p = toggle_btn.querySelector('p');
const toggle_btn_img = toggle_btn.querySelector('img');
const top_btn_img = document.querySelector('#top_btn a img');
const github_logo = document.querySelector('.skill .github_logo img');
const jquery_logo = document.querySelector('.skill .jquery_logo img');

/* 스크롤시 부드럽게 이동 */
const sections = document.querySelectorAll('section');
let isScrolling = false;

function scrollToClosestSection(direction) {
  if (isScrolling) return;
  isScrolling = true;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // 섹션 중심 좌표 계산
  const sectionCenters = Array.from(sections).map(section => {
    const rect = section.getBoundingClientRect();
    return {
      element: section,
      offset: section.offsetTop,
      centerOffset: section.offsetTop - (windowHeight - rect.height) / 2
    };
  });

  const currentScrollCenter = scrollY + windowHeight / 2;
  let targetSection = sectionCenters[0];

  if (direction === 'down') {
    for (let i = 0; i < sectionCenters.length; i++) {
      if (sectionCenters[i].centerOffset > scrollY + 10) {
        targetSection = sectionCenters[i];
        break;
      }
    }
  } else {
    for (let i = sectionCenters.length - 1; i >= 0; i--) {
      if (sectionCenters[i].centerOffset + 10 < scrollY) {
        targetSection = sectionCenters[i];
        break;
      }
    }
  }

  window.scrollTo({
    top: targetSection.centerOffset - 70,
    behavior: 'smooth'
  });

  setTimeout(() => isScrolling = false, 700);
}



let lastScrollY = window.scrollY;

/* 1024px 이상에서만 스크롤 스냅 */
let wheelHandler = (e) => {
  const direction = e.deltaY > 0 ? 'down' : 'up';
  scrollToClosestSection(direction);
};

function handleScrollEventBinding(){
  if(window.innerWidth > 1024){
    window.addEventListener('wheel', wheelHandler, { passive: false });
  }else{
    window.removeEventListener('wheel', wheelHandler);
  }
}

handleScrollEventBinding();

window.addEventListener('resize', handleScrollEventBinding);

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});




/* 다크모드 아이콘 */
toggle_btn.addEventListener('click', ()=>{
  const body = document.body;
  body.classList.toggle('dark_mode');

  function animateImageChange(imgElement, newSrc, newAlt) {
    imgElement.style.opacity ='0';
    imgElement.style.transform = 'scale(0.8)';

    setTimeout(()=>{
      imgElement.src = newSrc;
      imgElement.alt = newAlt;

      imgElement.style.opacity = '1';
      imgElement.style.transform = 'scale(1)';
    }, 300);
  }

  if(body.classList.contains('dark_mode')){
    toggle_logo.src = './images/logo_white.png';
    top_btn_img.src = './images/top_btn_white.png';
    github_logo.src = './images/github_white.png';
    jquery_logo.src = './images/jquery_white.png';
    animateImageChange(toggle_btn_img, './images/dark.png', '다크모드');

    toggle_btn_p.textContent = 'DARK';
  } else {
    toggle_logo.src = './images/logo.png';
    top_btn_img.src = './images/top_btn.png';
    github_logo.src = './images/github.png';
    jquery_logo.src = './images/jquery.png';
    animateImageChange(toggle_btn_img, './images/light.png', '라이트모드');

    toggle_btn_p.textContent = 'LIGHT';
  }
});

/* 메인 텍스트 컨텐츠 */
document.addEventListener('DOMContentLoaded', ()=>{
  const mainTextElement = document.querySelector('.main_text p');
  const originalText = mainTextElement.textContent;
  mainTextElement.textContent = '';
  let charIndex = 0;

  function typeWriter(){
    if(charIndex < originalText.length){
      mainTextElement.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 80);
    }else{
      const cursor = document.createElement('span');
      cursor.classList.add('cursor');
      mainTextElement.appendChild(cursor);
    }
  }
  typeWriter();
});

/* 스크롤 시 헤더 그림자 */
const header = document.querySelector('.h_wrap');

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 0){
    header.classList.add('scrolled');
  }else{
    header.classList.remove('scrolled');
  }

/* project1,2 섹션에서 스타일 변경  */
const project1Section = document.getElementById('project1');
const project2Section = document.getElementById('project2');
const project3Section = document.getElementById('project3');

if(project1Section && project2Section){
  const rect1 = project1Section.getBoundingClientRect();
  const rect2 = project2Section.getBoundingClientRect();
  const rect3 = project3Section.getBoundingClientRect();

  if((rect1.top <= window.innerHeight / 2 && rect1.bottom >= window.innerHeight /2 || rect2.top <= window.innerHeight / 2 && rect2.bottom >= window.innerHeight /2 || rect3.top <= window.innerHeight / 2 && rect3.bottom >= window.innerHeight /2) && !document.body.classList.contains('dark_mode')){
    if(!document.body.classList.contains('dark_mode')){
      toggle_btn_p.style.color = '#fff';
      top_btn_img.src = './images/top_btn_white.png';
    }
  }else{
    if(!document.body.classList.contains('dark_mode')){
      toggle_btn_p.style.color = 'var(--base_color)';
      top_btn_img.src = './images/top_btn.png';
    }
  }
}
});

/* 탑버튼 */
const topBtn = document.getElementById('top_btn');

function toggleToButtonVisibility(){
  if(window.scrollY === 0){
    topBtn.classList.remove('show');
  }else{
    topBtn.classList.add('show');
  }
}

window.addEventListener('scroll', toggleToButtonVisibility);

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
});

/* project */


/* 풍선 커서 */
const cursor = document.querySelector('.balloon-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* 클릭시 풍선 이모지  */
document.addEventListener('click', (e) => {
  const balloon = document.createElement('span');
  balloon.textContent = '🎈';
  balloon.style.position = 'fixed';
  balloon.style.left = e.clientX + 'px';
  balloon.style.top = e.clientY + 'px';
  balloon.style.fontSize = '20px';
  balloon.style.opacity = '1';
  balloon.style.transition = 'all 1s ease-out';
  document.body.appendChild(balloon);

  setTimeout(() => {
    balloon.style.top = (e.clientY - 100) + 'px';
    balloon.style.opacity = '0';
  }, 0);

  setTimeout(() => balloon.remove(), 1000);
});


