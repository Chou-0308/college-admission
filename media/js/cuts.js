// 대학 발표 입결 표 (검색 + 면접 여부 필터)
(function(){
  const cs={q:'',iv:''};
  const lab={"50/70":["50%","70%"],"평균/최저":["평균","최저"],"평균/70":["평균","70%"],"70/100":["70%","100%"]};
  const draw=()=>{
    const q=cs.q.toLowerCase();
    const rows=CUTS.filter(r=>(cs.iv===''||String(r[2])===cs.iv)&&(!q||(r[0]+' '+r[1]+' '+r[3]).toLowerCase().includes(q)));
    $('#ccnt').textContent=`${rows.length}개 모집단위`;
    $('#ctbody').innerHTML=rows.length?rows.map(r=>{const L=lab[r[7]];
      return `<tr><td><b>${esc(r[0])}</b></td><td><span class="${r[2]?'ivy':'ivn'}" title="${r[2]?'면접 있음':'서류만'}"></span>${esc(r[1])}</td><td>${esc(r[3])}</td>
       <td class="n">${r[4]==null?'–':r[4]} → ${r[5]==null?'–':r[5]}</td><td class="n">${esc(r[6])}</td><td class="k">${L[0]} / ${L[1]}</td>
       <td class="n">${esc(r[8])} / ${esc(r[9])}</td><td>${esc(r[10])}</td></tr>`}).join(''):'<tr><td colspan="8" class="count">조건에 맞는 모집단위가 없습니다.</td></tr>';
  };
  $('#cq').addEventListener('input',e=>{cs.q=e.target.value.trim();draw()});
  $('#civ').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cs.iv=b.dataset.v;
    $('#civ').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));draw()});
  draw();
})();
