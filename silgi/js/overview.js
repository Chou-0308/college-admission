// 실기 개요: 숫자 요약, 질문 유형 상위 3개, 면접후기 자료집(../media/data/reviews.js) 속 실기 전형 표
(function(){
  // ---- 숫자 요약 ----
  const nB=RECAPS.filter(r=>r.src==='합격 복기').length, nJ=RECAPS.length-nB;
  const nQ=EX.reduce((a,e)=>a+e.items.length+(e.img?e.img.length:0),0);
  const cell=(v,u,l)=>`<div><div class="v">${v}<small style="font-size:.5em;margin-left:2px">${u}</small></div><div class="l">${l}</div></div>`;
  $('#strip').innerHTML=cell(SCH.length,'곳','대학별 실기 유형')+cell(RECAPS.length,'건',`합격 복기 ${nB} · 자가진단 ${nJ}`)+cell(nQ,'개','기출 제시어·사진·문제')+cell(TERMS.length,'개','용어 사전');
  $('#c-types').textContent=`${SCH.length}곳의 단계, 시간, 배점, 유의사항과 복기에서 나온 진행 방식.`;
  $('#c-rev').textContent=`합격생 복기 ${nB}건과 자가진단 ${nJ}건. 대학·실기 유형으로 거르고 검색, 같은 수험생의 여러 대학 복기 비교.`;
  $('#c-terms').textContent=`${TERMS.length}개 용어를 한두 문장으로. 촬영·편집·음향·연출·시나리오·장르·제작.`;

  // ---- 질문 유형 상위 ----
  const withQ=RECAPS.filter(r=>r.qa.length);
  const top=QT.filter(([nm])=>nm!=='실기 답안 꼬리질문')
    .map(([nm,re])=>({nm,n:withQ.filter(r=>r.qa.some(x=>re.test(x[0]))).length})).sort((a,b)=>b.n-a.n).slice(0,3);
  $('#f-q').innerHTML=`질문이 적힌 기록 ${withQ.length}건 가운데 ${top.map(t=>`<b>${esc(t.nm)} ${t.n}건(${Math.round(t.n/withQ.length*100)}%)</b>`).join(', ')}. 실기 답안의 꼬리질문이 끝나면 거의 이 순서로 넘어갑니다.`;

  // ---- 면접후기 자료집 속 실기 전형 ----
  const rows=(typeof D!=='undefined'?D:[]).filter(r=>!r.x&&r.y==='실기');
  const it=s=>s.replace(/\(표기\)/,'').replace(/^(기타|미표기)\((.*)\)$/,'$2');
  $('#rv').innerHTML=rows.length
    ?`<thead><tr><th>대학</th><th>학과</th><th>면접 방식</th><th>결과</th></tr></thead><tbody>${
      rows.map(r=>`<tr><td><a href="../media/reviews.html?y=실기&u=${encodeURIComponent(r.u)}">${esc(r.u)}</a></td><td>${esc(r.d)}</td><td>${esc(it(r.it))}</td><td><span class="pill p-${esc(r.r)}">${esc(r.r)}</span></td></tr>`).join('')}</tbody>`
    :'<tbody><tr><td>실기 전형 후기가 없습니다.</td></tr></tbody>';
})();
