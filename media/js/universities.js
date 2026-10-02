// 대학별 면접 방식 표 (대학 이름 → 후기 전체 페이지로 필터 링크)
(function(){
  const m={};V.forEach(r=>(m[r.u]=m[r.u]||[]).push(r));
  const mode=a=>{const c={};a.filter(Boolean).forEach(x=>c[x]=(c[x]||0)+1);return Object.entries(c).sort((x,y)=>y[1]-x[1]).map(x=>x[0])};
  const rows=Object.entries(m).sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0],'ko'));
  $('#utbody').innerHTML=rows.map(([u,rs])=>{
    const rc={};rs.forEach(r=>rc[r.r]=(rc[r.r]||0)+1);
    const types=mode(rs.map(r=>tidyType(r.it))).slice(0,2).join(', ');
    const tm=mode(rs.map(r=>r.tm.replace(/\s*\(.*\)/,'')))[0]||'';
    const pn=(mode(rs.map(r=>r.pn))[0]||'').replace(/^(\d)$/,'$1명');
    const op=(mode(rs.map(r=>r.op))[0]||'').replace(/\(.*\)/,'');
    return `<tr><td><a class="ulink" href="reviews.html?u=${encodeURIComponent(u)}">${esc(u)}</a></td><td class="n">${rs.length}</td>
     <td><div class="chips">${RES_ORDER.filter(k=>rc[k]).map(k=>`<span class="pill p-${k}">${k} ${rc[k]}</span>`).join('')}</div></td>
     <td>${esc(types)}</td><td class="n">${esc(tm)}</td><td>${esc(pn)}</td><td>${esc(op)}</td><td>${esc(NOTES[u]||'')}${NOTES27[u]?`<span class="n27"><span class="t27">2027</span>${esc(NOTES27[u])}</span>`:''}</td></tr>`}).join('');
})();
