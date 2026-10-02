// 후기 탐색기
// 주소 뒤에 ?u=대학&c=질문유형&k=계열&r=결과&q=검색어 를 붙이면 필터가 걸린 채로 열립니다.
const state={q:'',u:'',k:'',c:'',r:'',limit:30};
(function(){
  const P=new URLSearchParams(location.search);
  ['q','u','k','c','r'].forEach(k=>{const v=P.get(k);if(v)state[k]=v});
  const us=[...new Set(D.map(r=>r.u))].sort((a,b)=>a.localeCompare(b,'ko'));
  $('#fu').innerHTML='<option value="">전체 대학</option>'+us.map(u=>`<option>${esc(u)}</option>`).join('');
  $('#fk').innerHTML='<option value="">전체 계열</option>'+GRPS.map(g=>`<option>${g}</option>`).join('');
  $('#fc').innerHTML='<option value="">전체 질문 유형</option>'+CATS.map(g=>`<option>${g}</option>`).join('');
  const sync=()=>{$('#q').value=state.q;['u','k','c'].forEach(k=>$('#f'+k).value=state[k]);
    $('#fr').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===state.r?'true':'false'))};
  sync();
  $('#q').addEventListener('input',e=>{state.q=e.target.value.trim();state.limit=30;render()});
  ['u','k','c'].forEach(k=>$('#f'+k).addEventListener('change',e=>{state[k]=e.target.value;state.limit=30;render()}));
  $('#fr').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;state.r=b.dataset.v;state.limit=30;sync();render()});
  $('#clr').onclick=()=>{Object.assign(state,{q:'',u:'',k:'',c:'',r:'',limit:30});sync();render()};
  $('#more').onclick=()=>{state.limit+=30;render()};
})();
function hl(s){s=esc(s);if(!state.q)return s;const t=esc(state.q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return s.replace(new RegExp(t,'gi'),m=>`<mark>${m}</mark>`)}
function render(){
  // 지금 걸린 필터를 주소에 남겨 두면 그 주소로 바로 공유할 수 있습니다
  const P=new URLSearchParams();['u','c','k','r','q'].forEach(k=>{if(state[k])P.set(k,state[k])});
  try{history.replaceState(null,'',P.toString()?'?'+P:location.pathname)}catch(e){}
  const q=state.q.toLowerCase();
  const res=D.filter(r=>(!state.u||r.u===state.u)&&(!state.k||r.k===state.k)&&(!state.r||r.r===state.r)
    &&(!state.c||r.qa.some(x=>x[2]===state.c))
    &&(!q||[r.u,r.d,r.t,r.why,r.tip,r.pr,...r.qa.flat()].join(' ').toLowerCase().includes(q)));
  $('#cnt').textContent=`${res.length}건`;
  const shown=res.slice(0,state.limit);
  const open=!!(state.q||state.u||state.c);
  $('#list').innerHTML=shown.length?shown.map(r=>{
    const qa=r.qa.filter(x=>!state.c||x[2]===state.c||!open).map(x=>`<div><div class="q">${x[0]?hl(x[0]):'(질문 기록 없음)'}${x[2]?` <span class="tag qc">${esc(x[2])}</span>`:''}</div><div class="a">${hl(x[1])}</div></div>`).join('');
    return `<details class="card r-${r.r}"${open&&shown.length<=12?' open':''}>
     <summary><span class="t1">${esc(r.u)} <span class="d">${esc(r.d)}</span></span><span class="no">#${esc(r.n)} · ${esc(r.p)}</span>
      <span class="meta">${pill(r.r)}<span>${esc(r.t)}</span><span class="tag">${esc(r.y)}</span><span class="tag">${esc(tidyType(r.it))}</span><span>${esc(r.tm)}</span><span>내신 ${esc(r.g)}</span></span></summary>
     <div class="body">
      ${r.memo?`<div class="memo">${esc(r.memo)}</div>`:''}
      ${r.pr?`<div class="proc">절차 · ${esc(r.pr)}</div>`:''}
      <div class="qa">${qa||'<p class="count">원문에 질문이 따로 적혀 있지 않습니다.</p>'}</div>
      ${r.why?`<div class="note"><b>합불 이유(본인)</b><span>${hl(r.why)}</span></div>`:''}
      ${r.tip?`<div class="note"><b>팁</b><span>${hl(r.tip)}</span></div>`:''}
     </div></details>`}).join(''):'<p class="count">조건에 맞는 후기가 없습니다. 검색어를 줄이거나 필터를 초기화해 보세요.</p>';
  $('#more').hidden=res.length<=state.limit;
}
render();
