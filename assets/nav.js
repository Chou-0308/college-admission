// 왼쪽 메뉴 (모든 페이지 공통)
// ▶ 계열이나 페이지를 추가하면 SITE만 고치면 됩니다. 준비 중인 계열은 soon:true
// ▶ 같은 계열이라도 학종(면접)과 실기는 폴더를 나눕니다: media/ = 학종·면접, silgi/ = 실기, jeonmun/ = 전문대 면접
// ▶ 4년제 / 전문대 구분: 전문대학(교육부 분류, 전문대학포털·각 대학 모집요강으로 확인)은 아래 목록에 이름 앞부분을 넣습니다.
//   4년제 탭(media/, silgi/)은 전문대를 빼고, 전문대 탭(jeonmun/)은 전문대만 보여 줍니다. 페이지의 <html data-scope="jm">가 전문대 탭 표시
const JM_NAMES=["서울예","동아방송","백석예","백석문화","서일대","계원","대림대","연성대","청강","한국영상","용인예술","경민대","경인여","명지전문","유한대","인덕대","두원","부천대","제주한라","부산경상","부산과학기술","부산보건","울산과학","재능대","전주기전","전주비전","영남이공","영진","대덕대","대전과학기술","구미대","계명문화","국제대","마산대","수성대","창원문성","조선이공","제주관광","충청대","경기과학기술","동서울","백석문화"];
const isJM=u=>JM_NAMES.some(n=>String(u||'').startsWith(n));
const SCOPE=document.documentElement.dataset.scope==='jm'?'jm':'4';
// 배열에서 지금 탭에 맞지 않는 학교 항목을 빼기(f: 항목 → 학교 이름)
const scopeArr=(a,f)=>{if(!Array.isArray(a))return;for(let i=a.length-1;i>=0;i--)if(isJM(f(a[i]))!==(SCOPE==='jm'))a.splice(i,1)};
const scopeObj=o=>{if(o&&typeof o==='object')Object.keys(o).forEach(k=>{if(isJM(k)!==(SCOPE==='jm'))delete o[k]})};
const SITE=[
 {name:"(4년제) 미디어·영상 · 학종·면접",dir:"media/",pages:[
  ["index.html","개요"],
  ["schedule.html","2027 면접 일정"],
  ["special.html","특성화고 전형"],
  ["cuts.html","대학 발표 입결"],
  ["questions.html","질문 유형"],
  ["universities.html","대학별 방식"],
  ["reviews.html","후기 전체"],
  ["prep.html","준비법·공식 자료"],
 ]},
 {name:"(4년제) 영화·영상 · 실기",dir:"silgi/",pages:[
  ["index.html","개요"],
  ["types.html","대학별 실기 유형"],
  ["exams.html","기출·연습 문제"],
  ["reviews.html","합격 복기"],
  ["method.html","분석·작문 방법"],
  ["interview.html","면접 대비"],
  ["glossary.html","용어 사전"],
  ["history.html","영화사"],
 ]},
 {name:"(전문대) 미디어·영상 면접",dir:"jeonmun/",pages:[
  ["index.html","개요"],
  ["table.html","면접 전형표"],
  ["questions.html","면접 문항"],
  ["hugi.html","면접 후기"],
  ["silgi.html","실기 유형"],
  ["silgi-exams.html","실기 기출"],
  ["silgi-reviews.html","실기 합격 복기"],
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

// 긴 페이지: 섹션이 3개 이상이면 위에 붙는 '이 페이지에서' 바로가기를 만들고, 지금 읽는 섹션을 표시합니다
// 본문에 이미 바로가기(.jump)가 있으면 그 이름을 그대로 쓰고, 없으면 섹션 제목(h2)을 씁니다
document.addEventListener('DOMContentLoaded',function(){
  const main=document.querySelector('.main');if(!main||!document.querySelector('.pagehead'))return;
  const jump=main.querySelector('.jump');
  let items=jump?[...jump.querySelectorAll('a[href^="#"]')].map(a=>[a.getAttribute('href').slice(1),a.textContent.trim()])
    :[...main.querySelectorAll('section[id]')].map(s=>{const h=s.querySelector('h2');return h?[s.id,h.textContent.trim()]:null}).filter(Boolean);
  items=items.filter(([id])=>document.getElementById(id));
  if(items.length<3)return;
  const nav=document.createElement('nav');nav.className='toc';nav.setAttribute('aria-label','이 페이지에서');
  nav.innerHTML='<span class="toc-l">이 페이지에서</span><ol>'+items.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join('')+'</ol>';
  // 본문 바로가기가 있던 머리말 바로 뒤, 없으면 첫 섹션 바로 앞에 둡니다
  if(jump)(jump.closest('header')||jump).after(nav);else document.getElementById(items[0][0]).before(nav);
  const ol=nav.querySelector('ol');
  document.body.classList.add('has-toc');
  const links=[...nav.querySelectorAll('a')],secs=items.map(([id])=>document.getElementById(id));
  const top=document.createElement('button');top.type='button';top.className='totop';top.textContent='↑ 맨 위로';top.hidden=true;
  top.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});document.body.appendChild(top);
  let ticking=false;
  const spy=()=>{ticking=false;
    const y=nav.getBoundingClientRect().bottom+24;let cur=-1;
    secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<=y)cur=i});
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs.length-1;
    links.forEach((a,i)=>{if(i===cur){if(a.getAttribute('aria-current')!=='true'){a.setAttribute('aria-current','true');
      // 좁은 화면에서 지금 섹션 단추가 가려지면 가로로만 밀어 보여 줍니다
      const l=a.offsetLeft-ol.offsetLeft;if(l<ol.scrollLeft||l+a.offsetWidth>ol.scrollLeft+ol.clientWidth)ol.scrollLeft=l-16}}else a.removeAttribute('aria-current')});
    top.hidden=scrollY<innerHeight*1.5};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(spy)}},{passive:true});
  spy();
});
