// 질문 유형 막대그래프 + 예시
(function(){
  const cnt={},per={};
  V.forEach(r=>r.qa.forEach(q=>{if(!q[2])return;cnt[q[2]]=(cnt[q[2]]||0)+1;(per[q[2]]=per[q[2]]||new Set).add(r.i)}));
  const max=Math.max(...Object.values(cnt));
  $('#chart').innerHTML=CATS.map(c=>`<button type="button" class="bar" data-c="${c}" aria-pressed="false"><span class="nm">${c}</span><span class="tr"><span class="fl" style="width:${cnt[c]/max*100}%"></span></span><span class="ct">${cnt[c]}문항 · ${per[c].size}건</span></button>`).join('');
  $('#chart').addEventListener('click',e=>{
    const b=e.target.closest('.bar');if(!b)return;
    const on=b.getAttribute('aria-pressed')==='true';
    document.querySelectorAll('.bar').forEach(x=>x.setAttribute('aria-pressed','false'));
    const box=$('#samples');
    if(on){box.hidden=true;return}
    b.setAttribute('aria-pressed','true');
    const c=b.dataset.c;
    let qs=[];V.forEach(r=>r.qa.forEach(q=>{if(q[2]===c&&q[0].length>8)qs.push([q[0],r])}));
    // 대학이 겹치지 않게 골고루
    const seen=new Set(),pick=[];
    for(const x of qs){if(pick.length>=12)break;if(seen.has(x[1].u))continue;seen.add(x[1].u);pick.push(x)}
    box.innerHTML=`<h3>${esc(c)} · 질문 예시</h3><ol>${pick.map(([q,r])=>`<li>${esc(q.length>160?q.slice(0,160)+'…':q)}<span class="src">${esc(r.u)} ${esc(r.d)}</span></li>`).join('')}</ol>
     <p style="margin-top:10px"><a class="clear" href="reviews.html?c=${encodeURIComponent(c)}">이 유형 질문이 있는 후기 모두 보기 →</a></p>`;
    box.hidden=false;
  });
})();
