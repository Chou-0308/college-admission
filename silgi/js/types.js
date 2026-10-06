// 대학별 실기 유형: 한눈에 보기 표 + 유형별로 거르는 상세 카드
(function(){
  // 대학 이름 끝의 '대학교'를 떼고 비교합니다(복기 수 세기)
  const key=n=>n.replace(/대학교$/,'');
  const cnt=n=>RECAPS.filter(r=>key(r.u)===key(n)).length;
  const id=n=>'s-'+encodeURIComponent(n).replace(/%/g,'');
  const oldYr=s=>!/202[2-9]/.test(s.yr);

  $('#tg').innerHTML=`<thead><tr><th>대학</th><th>모집단위</th><th>실기 유형</th><th>2026년 시험</th><th>시간</th><th>복기</th></tr></thead><tbody>${
    SCH.map(s=>`<tr><td><a href="#${id(s.n)}" data-open="${esc(s.n)}">${esc(s.n)}</a></td><td>${esc(s.d)}</td><td><span class="chips">${s.g.map(g=>`<span class="gtag">${esc(g)}</span>`).join('')}</span></td><td>${s.y27?esc(s.y27.rows[0][1]):''}</td><td>${esc(s.time||'—')}</td><td class="n">${cnt(s.n)||''}</td></tr>`).join('')}</tbody>`;

  // 2026년 시험 일정: 첫 시험일 순. 마지막 시험일이 지난 대학은 흐리게, 시험 기간 중이면 '진행 중'
  const today=new Date().toISOString().slice(0,10);
  const ord=SCH.filter(s=>s.y27).slice().sort((a,b)=>a.y27.first.localeCompare(b.y27.first));
  $('#ts').innerHTML=`<thead><tr><th>첫 시험일</th><th>대학</th><th>모집단위</th><th>일정</th></tr></thead><tbody>${
    ord.map(s=>`<tr${s.y27.last<today?' class="past"':''}><td class="n">${esc(s.y27.first.slice(5).replace('-','.'))}${s.y27.last<today?'<br><span class="small">끝남</span>':s.y27.first<=today?'<br><span class="gtag">진행 중</span>':''}</td><td><a href="#${id(s.n)}" data-open="${esc(s.n)}">${esc(s.n)}</a></td><td>${esc(s.d)}</td><td>${s.y27.rows.map(([k,v])=>`<div><b>${esc(k)}</b> ${esc(v)}</div>`).join('')}</td></tr>`).join('')}</tbody>`;

  const groups=[...new Set(SCH.flatMap(s=>s.g))];
  let cur='';
  $('#fg').innerHTML=['',...groups].map(g=>`<button type="button" data-v="${esc(g)}" aria-pressed="${g===''}">${g||'전체'}</button>`).join('');
  $('#fg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=b.dataset.v;
    $('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));render()});

  function card(s){
    const n=cnt(s.n);
    const facts=[['시간',s.time],['반영·배점',s.score],['근거 자료',`${s.src} (${s.yr})`]].filter(x=>x[1]);
    return `<details class="card s${oldYr(s)?' old':''}" id="${id(s.n)}">
      <summary><span class="t1">${esc(s.n)} <span class="d">${esc(s.d)}</span></span><span class="no">${esc(s.yr)}</span>
        <span class="meta">${s.g.map(g=>`<span class="gtag">${esc(g)}</span>`).join('')}${oldYr(s)?'<span class="gtag k-old">오래된 자료</span>':''}${n?`<span>복기 ${n}건</span>`:''}</span></summary>
      <div class="body">
        ${s.y27?`<div class="y27"><div class="rvh">2027학년도 · 2026년 시험 (공식)</div>
          <dl>${s.y27.rows.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          <p class="y27h">${esc(s.y27.how)}</p><p class="small">출처: ${esc(s.y27.src)}</p></div>`:''}
        <ol class="steps">${s.steps.map(([a,b])=>`<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('')}</ol>
        <div class="facts">${facts.map(([a,b])=>`<div><span>${a}</span>${esc(b)}</div>`).join('')}</div>
        ${s.rule?`<div class="proc">유의사항 · ${esc(s.rule)}</div>`:''}
        ${s.tips.length?`<div><div class="lab q">복기·자료에서 나온 점</div><ul class="tips">${s.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`:''}
        ${n?`<p class="small"><a href="reviews.html?u=${encodeURIComponent(key(s.n))}">${esc(s.n)} 복기 ${n}건 보기 →</a> · <a href="exams.html#${id(s.n)}">기출 문제 보기 →</a></p>`:''}
      </div></details>`;
  }
  function render(){
    const res=SCH.filter(s=>!cur||s.g.includes(cur));
    $('#cnt').textContent=`${res.length}곳`;
    $('#list').innerHTML=res.map(card).join('');
  }
  render();
  // 표에서 대학을 누르면 카드를 펼친 채로 이동
  const openTo=h=>{const el=document.getElementById(decodeURIComponent(h));if(el){el.open=true;el.scrollIntoView({block:'start'})}};
  document.addEventListener('click',e=>{const a=e.target.closest('a[data-open]');if(!a)return;
    if(cur){cur='';$('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===''?'true':'false'));render()}
    e.preventDefault();history.replaceState(null,'',a.getAttribute('href'));openTo(a.getAttribute('href').slice(1))});
  if(location.hash)openTo(location.hash.slice(1));

  $('#t17').innerHTML=`<thead><tr><th>대학</th><th>반영 비율</th><th>모집</th><th>실기 유형</th></tr></thead><tbody>${
    SCH17.map(r=>`<tr>${r.map((c,i)=>`<td${i===2?' class="n"':''}>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
})();
