// 합격 복기 탐색기
// 주소 뒤에 ?u=대학&k=실기유형&s=자료(합격 복기|자가진단)&p=수험생(A~G)&q=검색어 를 붙이면 필터가 걸린 채로 열립니다.
const st={q:'',u:'',k:'',s:'',p:''};
(function(){
  const P=new URLSearchParams(location.search);
  Object.keys(st).forEach(k=>{const v=P.get(k);if(v)st[k]=v});
  const us=[...new Set(RECAPS.map(r=>r.u))].sort((a,b)=>a.localeCompare(b,'ko'));
  const ks=[...new Set(RECAPS.flatMap(r=>r.k))];
  const ps=[...new Set(RECAPS.map(r=>r.s).filter(Boolean))].sort();
  $('#fu').innerHTML='<option value="">전체 대학</option>'+us.map(u=>`<option>${esc(u)}</option>`).join('');
  $('#fk').innerHTML='<option value="">전체 실기 유형</option>'+ks.map(k=>`<option>${esc(k)}</option>`).join('');
  $('#fp').innerHTML='<option value="">모든 수험생</option>'+ps.map(p=>`<option value="${p}">수험생 ${p} (${RECAPS.filter(r=>r.s===p).length}곳)</option>`).join('');
  const sync=()=>{$('#q').value=st.q;$('#fu').value=st.u;$('#fk').value=st.k;$('#fp').value=st.p;
    $('#fs').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===st.s?'true':'false'))};
  sync();
  $('#q').addEventListener('input',e=>{st.q=e.target.value.trim();render()});
  [['u','#fu'],['k','#fk'],['p','#fp']].forEach(([k,s])=>$(s).addEventListener('change',e=>{st[k]=e.target.value;render()}));
  $('#fs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st.s=b.dataset.v;sync();render()});
  $('#clr').onclick=()=>{Object.keys(st).forEach(k=>st[k]='');sync();render()};
  document.addEventListener('click',e=>{const a=e.target.closest('[data-p]');if(!a)return;e.preventDefault();
    Object.keys(st).forEach(k=>st[k]='');st.p=a.dataset.p;sync();render();window.scrollTo({top:$('#explore').offsetTop})});
})();
// a·n·prep은 문자열이거나 문단 배열
const arr=x=>Array.isArray(x)?x:(x?[x]:[]);
function hl(s){s=esc(s);if(!st.q)return s;const t=esc(st.q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return s.replace(new RegExp(t,'gi'),m=>`<mark>${m}</mark>`)}
function render(){
  const P=new URLSearchParams();Object.keys(st).forEach(k=>{if(st[k])P.set(k,st[k])});
  try{history.replaceState(null,'',P.toString()?'?'+P:location.pathname)}catch(e){}
  const q=st.q.toLowerCase();
  const res=RECAPS.filter(r=>(!st.u||r.u===st.u)&&(!st.k||r.k.includes(st.k))&&(!st.s||r.src===st.s)&&(!st.p||r.s===st.p)
    &&(!q||[r.u,r.d,r.t,r.st,r.pr,r.p,...arr(r.a),...arr(r.n),...arr(r.prep),...r.k,...r.qa.flat()].join(' ').toLowerCase().includes(q)));
  $('#cnt').textContent=`${res.length}건`;
  const open=!!(st.q||st.u||st.p)&&res.length<=8;
  $('#list').innerHTML=res.length?res.map(r=>{
    const sub=[r.d,[r.t,r.st].filter(Boolean).join(' '),r.w?`${r.w} 희망`:''].filter(Boolean).join(' · ');
    return `<details class="card s${r.src==='자가진단'?' old':''}"${open?' open':''}>
      <summary><span class="t1">${esc(r.u)} <span class="d">${esc(sub)}</span></span><span class="no">${esc(yrLabel(r.y))}</span>
        <span class="meta"><span class="tag">${esc(r.src)}</span>${r.k.map(k=>`<span class="gtag">${esc(k)}</span>`).join('')}${r.r?`<span class="gtag k-old">${esc(r.r)}</span>`:''}${r.s?`<span>수험생 ${r.s}</span>`:''}</span></summary>
      <div class="body">
        ${r.pr?`<div class="rvs"><div class="rvh">진행·분위기</div><p class="para">${hl(r.pr)}</p></div>`:''}
        ${r.p?`<div class="proc">문제·제시 자료 · ${hl(r.p)}</div>`:''}
        ${arr(r.a).length?`<div class="rvs"><div class="rvh">수험생이 한 이야기·분석</div><div class="para">${arr(r.a).map(t=>`<p>${hl(t)}</p>`).join('')}</div></div>`:''}
        ${r.qa.length?`<div class="rvs"><div class="rvh">질문과 답 <span class="small">${r.qa.filter(x=>x[1]).length}개</span></div><div class="qa">${r.qa.map(x=>`<div><div class="q">${hl(x[0])}</div><div class="a">${hl(x[1])}</div></div>`).join('')}</div></div>`:''}
        ${arr(r.n).length?`<div class="rvs"><div class="rvh">소감·팁</div><ul class="tips">${arr(r.n).map(t=>`<li>${hl(t)}</li>`).join('')}</ul></div>`:''}
        ${arr(r.prep).length?`<div class="rvs"><div class="rvh">준비 기간·방법·조언</div><ul class="tips">${arr(r.prep).map(t=>`<li>${hl(t)}</li>`).join('')}</ul></div>`:''}
        ${r.s&&!st.p?`<p class="small"><a href="?p=${r.s}" data-p="${r.s}">수험생 ${r.s}의 다른 대학 복기 보기 →</a></p>`:''}
      </div></details>`}).join(''):'<p class="count">조건에 맞는 복기가 없습니다.</p>';
}
render();
