// 면접 준비 나침반: 10문항 묶음(연습 체크), 한 문항 뽑기 + 1분 타이머, 당일 체크리스트
// ▶ 문항은 사이트의 면접후기·실기 복기·전문대 공개 문항에서 자주 나온 질문을 골라 다듬은 것입니다. 묶음을 고치려면 SETS만 고치세요.
(function(){
  const $=s=>document.querySelector(s);
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const SETS=[
    {k:"basic",t:"묶음 1 · 누구나 받는 기본 질문",qs:[
      "1분 동안 자기소개를 해 보세요.",
      "우리 학과에 지원한 동기는 무엇인가요?",
      "여러 학교 중 왜 우리 학교인가요?",
      "본인의 장점과 단점을 말해 보세요. 단점은 어떻게 고치고 있나요?",
      "입학하면 가장 배우고 싶은 수업이나 해 보고 싶은 활동은?",
      "졸업 후 진로, 10년 뒤 어떤 일을 하고 있을까요?",
      "존경하는 인물이나 롤모델과 그 이유는?",
      "최근 인상 깊게 본 작품(영화·드라마·광고·콘텐츠) 하나를 소개해 보세요.",
      "우리가 왜 학생을 뽑아야 하나요?",
      "마지막으로 하고 싶은 말이 있나요?"]},
    {k:"record",t:"묶음 2 · 생기부·자소서·활동",qs:[
      "생기부(자소서)에서 가장 기억에 남는 활동은? 거기서 맡은 역할은?",
      "그 활동의 동기 → 과정 → 결과 → 느낀 점을 말해 보세요.",
      "그래서 결론은 무엇이었나요? 그 활동으로 무엇이 달라졌나요?",
      "세특(탐구 보고서)에 쓴 개념을 한 문장으로 정의해 보세요.",
      "동아리(방송부·영상 동아리 등)에서 만든 작품과 내가 맡은 파트는?",
      "리더나 임원을 하며 어려웠던 점과 해결 방법은?",
      "감명 깊게 읽은 책과 그 이유는?",
      "진로가 바뀐 적이 있다면 왜 바뀌었나요?",
      "성적이 오르거나 내린 과목, 결석이 있다면 그 이유는?",
      "포트폴리오(작품) 중 가장 자신 있는 것과 만들며 어려웠던 점은?"]},
    {k:"person",t:"묶음 3 · 인성·경험(슬럼프·갈등)",qs:[
      "살면서 가장 힘들었던 일과 어떻게 극복했는지 말해 보세요.",
      "지치거나 슬럼프를 겪었을 때 어떻게 극복했나요?",
      "실패하거나 좌절했던 경험과 그 뒤에 달라진 점은?",
      "팀 작업에서 의견이 충돌했을 때 어떻게 해결했나요?",
      "협조하지 않는 팀원이 있다면 어떻게 하겠습니까?",
      "자신의 실수를 인정하거나 사과한 경험이 있나요?",
      "친구들은 본인을 어떤 사람이라고 말하나요?",
      "성실함이나 책임감으로 무언가를 끝까지 해낸 경험은?",
      "좌우명이나 가장 중요하게 여기는 가치는?",
      "스트레스를 받을 때 나만의 해소 방법은?"]},
    {k:"major",t:"묶음 4 · 전공·시사",qs:[
      "AI가 이 분야(영상·광고·방송·콘텐츠)에 미칠 영향은? 창작자가 지켜야 할 것은?",
      "AI를 써 본 적이 있나요? 어디에, 어디까지 쓸 건가요?",
      "OTT·숏폼이 바꾼 콘텐츠 소비를 어떻게 보나요?",
      "좋은 영화(광고·콘텐츠)란 무엇이라고 생각하나요?",
      "우리 학교에 들어오면 만들고 싶은 작품은?",
      "좋아하는 감독(작가·PD)과 그 사람의 다른 작품은?",
      "이 분야에서 일하려면 가장 필요한 역량은?",
      "딥페이크·가짜뉴스 같은 미디어 윤리 문제에 대한 생각은?",
      "이 분야에는 어떤 직업이 있나요? 그중 나는 어떤 일을?",
      "사용해 본 프로그램이나 장비가 있나요? 무엇을 만들었나요?"]}
  ];
  const DAY=[
    "수험표(출력 또는 모바일)","사진이 있는 신분증","지원 대학이 요구한 서류·포트폴리오(해당자)",
    "시험 장소·시간 재확인(입학처 공지)","가는 길·소요 시간 확인, 30분 일찍 도착","단정한 복장·머리(교복 허용 여부 확인)",
    "핵심 키워드 카드·출력 자료","물·간식(대기가 길 수 있음)","휴대폰 무음, 시계",
    "‘나를 뽑아야 하는 이유’ 한 문장 소리 내 말하기"
  ];
  const KEY='guide-v1';
  let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){saved={}}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}};

  // ---- 10문항 묶음 ----
  const prog=k=>{const n=SETS.find(s=>s.k===k).qs.filter((_,i)=>saved[k+i]).length;return n};
  function drawSets(){
    $('#qsets').innerHTML=SETS.map(s=>{const n=prog(s.k);return `<details class="qset"${s.k==='basic'?' open':''}>
      <summary><span class="qt">${esc(s.t)}</span><span class="qp"><span class="qbar"><span style="width:${n*10}%"></span></span>${n}/10</span></summary>
      <ol>${s.qs.map((q,i)=>`<li><label><input type="checkbox" data-k="${s.k+i}"${saved[s.k+i]?' checked':''}><span>${esc(q)}</span></label></li>`).join('')}</ol>
    </details>`}).join('')+`<div class="qset add"><p><b>묶음 5 · 내 생기부·자소서에서 뽑은 질문 10개</b>, <b>묶음 6 · 지원 학과 공개 문항·후기 질문 10개</b>는 직접 만드세요. 활동 하나에 ‘왜 했나·무엇을 맡았나·무엇이 어려웠나·무엇을 배웠나’ 네 가지를 붙이면 금방 10개가 됩니다.</p></div>`;
  }
  drawSets();
  $('#qsets').addEventListener('change',e=>{const c=e.target.closest('input[data-k]');if(!c)return;
    if(c.checked)saved[c.dataset.k]=1;else delete saved[c.dataset.k];save();
    const d=c.closest('details');const k=c.dataset.k.replace(/\d+$/,'');const n=prog(k);
    d.querySelector('.qbar span').style.width=n*10+'%';d.querySelector('.qp').lastChild.textContent=`${n}/10`});

  // ---- 한 문항 뽑기 + 1분 타이머 ----
  let cur='all',tid=null,left=60,last='';
  $('#qpick').innerHTML=[['all','전체 40문항'],...SETS.map(s=>[s.k,s.t.split(' · ')[0]])].map(([k,t])=>`<button type="button" data-v="${k}" aria-pressed="${k===cur}">${esc(t)}</button>`).join('');
  $('#qpick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.v;
    $('#qpick').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'))});
  const show=()=>{$('#tm').textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`};
  const stop=()=>{clearInterval(tid);tid=null};
  $('#pick').addEventListener('click',()=>{
    const pool=SETS.filter(s=>cur==='all'||s.k===cur).flatMap(s=>s.qs.map(q=>[s.t.split(' · ')[0],q]));
    let x;do{x=pool[Math.floor(Math.random()*pool.length)]}while(pool.length>1&&x[1]===last);last=x[1];
    $('#pp').textContent=x[1];$('#pr').textContent=`${x[0]} · 결론 한 문장 → 근거 경험 하나 → 학과와 연결`;
    stop();left=60;show();$('#tm').classList.remove('done');$('#tgo').disabled=false;$('#tgo').textContent='1분 타이머';
  });
  $('#tgo').addEventListener('click',()=>{
    if(tid){stop();$('#tgo').textContent='이어서';return}
    if(left<=0){left=60;$('#tm').classList.remove('done')}
    $('#tgo').textContent='멈춤';
    tid=setInterval(()=>{left--;show();if(left<=0){stop();$('#tm').classList.add('done');$('#tgo').textContent='다시 시작'}},1000);
  });

  // ---- 당일 체크리스트 ----
  const dp=()=>{const n=DAY.filter((_,i)=>saved['d'+i]).length;$('#dprog').textContent=`${n}/${DAY.length} 완료`};
  $('#dcheck').innerHTML=DAY.map((t,i)=>`<li><label><input type="checkbox" data-k="d${i}"${saved['d'+i]?' checked':''}><span>${esc(t)}</span></label></li>`).join('');
  $('#dcheck').addEventListener('change',e=>{const c=e.target.closest('input[data-k]');if(!c)return;
    if(c.checked)saved[c.dataset.k]=1;else delete saved[c.dataset.k];save();dp()});
  dp();

  const f=document.createElement('footer');
  f.textContent='근거: 이 사이트의 면접후기(경기도교육청 2026학년도 면접후기 자료집), 영화·영상 실기 합격 복기·자가진단, 전문대 학과별 공개 문항, 각 대학 2027학년도 모집요강. 인용한 문장은 후기·복기 원문이고, 예시 답변과 키워드 카드는 이 사이트에서 새로 쓴 것입니다. 체크 표시는 이 기기의 브라우저에만 저장됩니다.';
  document.querySelector('.main').appendChild(f);
})();
