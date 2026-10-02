// 개요: 상단 숫자 띠
(function(){
  const nQ=V.reduce((a,r)=>a+r.qa.filter(q=>q[0]).length,0);
  const nU=new Set(V.map(r=>r.u)).size;
  const rc={};V.forEach(r=>rc[r.r]=(rc[r.r]||0)+1);
  const cols={최초합:"var(--pass)",충원합:"var(--wait)",불합:"var(--fail)",미기재:"var(--line)"};
  const bar=RES_ORDER.map(k=>`<span style="width:${(rc[k]||0)/V.length*100}%;background:${cols[k]}" title="${k} ${rc[k]||0}"></span>`).join('');
  $('#strip').innerHTML=`
   <div><div class="v">${D.length}</div><div class="l">수집한 후기 (분석 ${V.length})</div></div>
   <div><div class="v">${nU}</div><div class="l">대학</div></div>
   <div><div class="v">${nQ.toLocaleString()}</div><div class="l">질문 문항</div></div>
   <div><div class="l">최초합 ${rc.최초합} · 충원 ${rc.충원합} · 불합 ${rc.불합} · 미기재 ${rc.미기재||0}</div><div class="resbar">${bar}</div></div>`;
})();
