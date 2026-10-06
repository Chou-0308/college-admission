// 왼쪽 메뉴 (모든 페이지 공통)
// ▶ 계열이나 페이지를 추가하면 SITE만 고치면 됩니다. 준비 중인 계열은 soon:true
// ▶ 같은 계열이라도 학종(면접)과 실기는 폴더를 나눕니다: media/ = 학종·면접, silgi/ = 실기
const SITE=[
 {name:"미디어·영상 · 학종·면접",dir:"media/",pages:[
  ["index.html","개요"],
  ["schedule.html","2027 면접 일정"],
  ["special.html","특성화고 전형"],
  ["cuts.html","대학 발표 입결"],
  ["questions.html","질문 유형"],
  ["universities.html","대학별 방식"],
  ["reviews.html","후기 전체"],
  ["prep.html","준비법·공식 자료"],
 ]},
 {name:"영화·영상 · 실기",dir:"silgi/",pages:[
  ["index.html","개요"],
  ["types.html","대학별 실기 유형"],
  ["exams.html","기출·연습 문제"],
  ["reviews.html","합격 복기"],
  ["method.html","분석·작문 방법"],
  ["interview.html","면접 대비"],
  ["glossary.html","용어 사전"],
  ["history.html","영화사"],
 ]},
 {name:"IT·소프트웨어 계열",soon:true},
 {name:"보건·의료정보 계열",soon:true},
];
(function(){
  const side=document.getElementById('side');if(!side)return;
  const root=side.dataset.root||'';            // 허브는 "", 계열 폴더 안은 "../"
  const isHub=root==='';
  const parts=location.pathname.split('/');
  const file=parts.pop()||'index.html';
  const dir=(parts.pop()||'')+'/';
  let h=`<a class="side-home" href="${root||'./'}"${isHub?' aria-current="page"':''}>대입 자료실</a>`;
  h+=SITE.map(g=>{
    if(g.soon)return `<div class="side-grp soon"><span class="side-gt">${g.name}</span><span class="side-soon">준비 중</span></div>`;
    const cur=!isHub&&dir===g.dir;
    const list=`<ul>${g.pages.map(([f,t])=>`<li><a href="${root}${g.dir}${f}"${cur&&f===file?' aria-current="page"':''}>${t}</a></li>`).join('')}</ul>`;
    // 세부 페이지에서는 지금 보는 전형만 펼치고, 다른 전형은 이름만 보이게 접어 둡니다(누르면 펼쳐짐)
    if(!isHub&&!cur)return `<details class="side-grp fold"><summary class="side-gt">${g.name}<span class="side-n">${g.pages.length}</span></summary>${list}</details>`;
    return `<div class="side-grp${cur?' cur':''}"><a class="side-gt" href="${root}${g.dir}">${g.name}</a>${list}</div>`;
  }).join('');
  side.innerHTML=h;
  // 모바일 가로 메뉴에서 현재 탭이 보이도록
  const on=side.querySelector('ul [aria-current]');if(on&&on.scrollIntoView&&innerWidth<=900)on.parentElement.parentElement.scrollLeft=on.offsetLeft-16;
})();

// 일반 모드 / 다크 모드 전환 (화면 오른쪽 아래). 고른 모드는 브라우저에 기억
(function(){
  const html=document.documentElement;
  const box=document.createElement('div');
  box.className='theme-tg';box.setAttribute('role','group');box.setAttribute('aria-label','화면 모드');
  box.innerHTML='<button type="button" data-t="light">일반 모드</button><button type="button" data-t="dark">다크 모드</button>';
  const sync=()=>{const t=html.dataset.theme==='dark'?'dark':'light';box.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t?'true':'false'))};
  box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
    if(b.dataset.t==='dark')html.dataset.theme='dark';else delete html.dataset.theme;
    try{localStorage.setItem('theme',b.dataset.t)}catch(err){}
    sync()});
  sync();document.body.appendChild(box);
})();
