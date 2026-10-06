// 전문대 면접 개요: 숫자 요약, 면접 일정, 질문 유형 상위, 면접 비율 분포, 대학별 표
(function(){
  const units=new Set(JT.map(r=>r[0]+'|'+r[2]));
  const nO=JU.filter(u=>u.ckT==='o'||u.ckQ==='o').length;
  const cell=(v,u,l)=>`<div><div class="v">${v}<small style="font-size:.5em;margin-left:2px">${u}</small></div><div class="l">${l}</div></div>`;
  $('#strip').innerHTML=cell(JU.length,'곳','전문대학')+cell(units.size,'개','모집단위(면접 전형)')+cell(JQ.filter(q=>q[3]!=='준비 포인트').length,'개','면접 문항')+cell(nO,'곳','공식 자료로 대조');

  const oT=JU.filter(u=>u.ckT==='o').map(u=>u.u), oQ=JU.filter(u=>u.ckQ==='o').map(u=>u.u);
  $('#cklist').innerHTML=`지금까지 전형을 대조한 대학: ${oT.map(esc).join(', ')}. 문항을 공식 자료와 대조한 대학: ${oQ.map(esc).join(', ')}.`;

  // ---- 면접 일정 (공식 확인한 대학만) ----
  const ord=JU.filter(u=>u.iv).sort((a,b)=>a.iv.first.localeCompare(b.iv.first));
  $('#ts').innerHTML=ord.length?`<thead><tr><th>첫 면접일</th><th>대학</th><th>일정</th><th>방식</th></tr></thead><tbody>${
    ord.map(u=>{const past=u.iv.last<today;return `<tr${past?' class="past"':''}><td class="n">${esc(u.iv.first.slice(5).replace('-','.'))}${past?'<br><span class="small">끝남</span>':u.iv.first<=today?'<br><span class="gtag">진행 중</span>':''}</td><td><a href="table.html?u=${encodeURIComponent(u.u)}">${esc(u.u)}</a></td><td>${u.iv.rows.map(([k,v])=>`<div><b>${esc(k)}</b> ${esc(v)}</div>`).join('')}</td><td>${esc(u.iv.how||'')}</td></tr>`}).join('')}</tbody>`
    :'<tbody><tr><td>공식 확인한 일정이 아직 없습니다.</td></tr></tbody>';

  // ---- 질문 유형 상위 ----
  const qs=JQ.filter(q=>q[3]!=='준비 포인트');
  const top=QC.map(([n])=>({n,c:qs.filter(q=>qcat(q[4]).includes(n)).length})).sort((a,b)=>b.c-a.c).slice(0,4);
  $('#f-top').innerHTML=`문항 ${qs.length}개를 유형으로 묶으면 ${top.map(t=>`<b>${esc(t.n)} ${t.c}개(${Math.round(t.c/qs.length*100)}%)</b>`).join(', ')} 순입니다. 한 문항이 두 유형에 걸리기도 합니다.`;

  // ---- 면접 비율 분포 (모집단위·전형 행 기준) ----
  const mv=[...new Set(JT.map(r=>r[9]||0))].sort((a,b)=>b-a);
  const sb=new Set(JT.filter(r=>(r[8]||0)>(r[9]||0)).map(r=>r[0]));
  $('#f-w').innerHTML=`전형 ${JT.length}개를 면접 비율로 나누면 ${mv.map(v=>`<b>${v}% ${JT.filter(r=>(r[9]||0)===v).length}개</b>`).join(' · ')}입니다. 면접보다 <b>학생부 비율이 큰 전형이 있는 대학이 ${sb.size}곳</b>이라, 이런 대학은 내신이 더 크게 작용합니다.`;

  // ---- 대학별 표 ----
  const rows=JU.map(u=>{
    const t=JT.filter(r=>r[0]===u.u), q=qs.filter(r=>r[0]===u.u), pp=JQ.filter(r=>r[0]===u.u&&r[3]==='준비 포인트');
    const ds=[...new Set([...t.map(r=>r[2]),...q.map(r=>r[1]),...pp.map(r=>r[1])])];
    const ms=[...new Set(t.map(r=>r[9]).filter(Boolean))].sort((a,b)=>a-b);
    return {u,t,q,pp,ds,ms};
  }).sort((a,b)=>a.u.r.localeCompare(b.u.r)||a.u.u.localeCompare(b.u.u));
  $('#tu').innerHTML=`<thead><tr><th>지역</th><th>대학</th><th>모집단위</th><th>면접 비율</th><th>문항</th><th>전형 확인</th><th>문항 확인</th></tr></thead><tbody>${
    rows.map(x=>`<tr><td>${esc(x.u.r)}</td><td>${x.t.length?`<a href="table.html?u=${encodeURIComponent(x.u.u)}">${esc(x.u.u)}</a>`:esc(x.u.u)}</td><td>${x.ds.map(esc).join(', ')}</td><td class="n">${x.ms.length?x.ms.map(m=>m+'%').join(' / '):'—'}</td><td class="n">${x.q.length||x.pp.length?`<a href="questions.html?u=${encodeURIComponent(x.u.u)}">${x.q.length?x.q.length:`안내 ${x.pp.length}`}</a>`:'—'}</td><td>${x.t.length?ck(x.u.ckT):'—'}</td><td>${x.q.length||x.pp.length?ck(x.u.ckQ):'—'}</td></tr>`).join('')}</tbody>`;
})();
