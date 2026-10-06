// 면접 대비: 대학 공개 문항(data/openq.js)을 문항별 카드로. 카드를 펼치면 묻는 것 · 답 구성 · 재료 · 꼬리질문 · 주의
(function(){
  const box=document.getElementById('oq');if(!box||typeof OPENQ==='undefined')return;
  box.innerHTML=OPENQ.map(o=>`<div class="oq">
    <div class="oq-h"><b>${esc(o.u)} ${esc(o.d)}</b><span class="gtag">${esc(o.y)}</span><span class="small">${esc(o.how)}</span></div>
    ${o.qs.map((x,i)=>`<details class="card oq-q"${i===0?' open':''}>
      <summary><span class="oq-n">${i+1}</span><span class="oq-t">${esc(x.q)}</span></summary>
      <div class="body">
        <div class="rvs"><div class="rvh">묻는 것</div><p class="para">${esc(x.aim)}</p></div>
        <div class="rvs"><div class="rvh">답 구성 순서</div><ol class="howto">${x.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol></div>
        <div class="rvs"><div class="rvh">쓸 재료</div><ul class="tips">${x.mat.map(s=>`<li>${s}</li>`).join('')}</ul></div>
        <div class="rvs"><div class="rvh">예상 꼬리질문</div><div class="qchips">${x.tail.map(s=>`<span>${esc(s)}</span>`).join('')}</div></div>
        <p class="exm">${esc(x.warn)}</p>
      </div></details>`).join('')}
    <ul class="tips oq-tips">${o.tips.map(s=>`<li>${s}</li>`).join('')}</ul>
    <p class="small"><a href="exams.html?f=daejin#practice">기출·연습 문제에서 2문항 뽑아 타이머로 연습하기 →</a></p>
  </div>`).join('');
})();
