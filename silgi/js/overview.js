// 실기 개요: 면접후기 자료집(../media/data/reviews.js) 중 전형이 '실기'인 후기 목록
(function(){
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const rows=(typeof D!=='undefined'?D:[]).filter(r=>!r.x&&r.y==='실기');
  const it=s=>s.replace(/\(표기\)/,'').replace(/^(기타|미표기)\((.*)\)$/,'$2');
  document.getElementById('rv').innerHTML=rows.length
    ?`<thead><tr><th>대학</th><th>학과</th><th>면접 방식</th><th>결과</th></tr></thead><tbody>${
      rows.map(r=>`<tr><td><a href="../media/reviews.html?y=실기&u=${encodeURIComponent(r.u)}">${esc(r.u)}</a></td><td>${esc(r.d)}</td><td>${esc(it(r.it))}</td><td><span class="pill p-${esc(r.r)}">${esc(r.r)}</span></td></tr>`).join('')}</tbody>`
    :'<tbody><tr><td>실기 전형 후기가 없습니다.</td></tr></tbody>';
})();

// 출처
(function(){
  const f=document.createElement('footer');
  f.textContent='출처: 실기 전형 후기는 경기도교육청 「2026학년도 면접후기 자료집」(goejinhak.kr, 학교 계정 로그인 필요)에서 옮겼습니다. 실기 자료는 정리되는 대로 출처를 함께 적습니다. 지원 전에는 반드시 대학 모집요강을 확인하세요. 원 자료가 학교 계정 전용이므로 외부 공유는 피해 주세요.';
  (document.querySelector('.main')||document.body).appendChild(f);
})();
