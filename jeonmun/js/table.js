// 면접 전형표: 대학별 표. 계열·대학·시기·면접 비율·검색으로 거르기 (?u=대학 으로 열면 그 대학만)
(function(){
  const P=new URLSearchParams(location.search);
  const st={q:'',u:P.get('u')||'',s:'',m:'',g:''};
  const us=[...new Set(JT.map(r=>r[0]))].sort((a,b)=>a.localeCompare(b));
  const opt=(a,lab)=>`<option value="">${lab}</option>`+a.map(x=>`<option>${esc(x)}</option>`).join('');
  $('#fu').innerHTML=opt(us,'대학 전체');
  $('#fs').innerHTML=opt([...new Set(JT.map(r=>r[3]))].sort(),'시기 전체');
  const MB=[['70','면접 70% 이상'],['60','면접 60% 이상'],['50','면접 50% 이상']];
  $('#fm').innerHTML='<option value="">면접 비율 전체</option>'+MB.map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
  $('#fg').innerHTML=['',...GRP].map(g=>`<button type="button" data-v="${esc(g)}" aria-pressed="${g===''}">${g||'전체 계열'}</button>`).join('');
  if(st.u&&!us.includes(st.u))st.u='';
  $('#fu').value=st.u;

  const key=r=>`${r[0]} ${r[1]} ${r[2]} ${r[3]} ${r[4]} ${r[5]}`;
  const tSort=(a,b)=>GRP.indexOf(a[1])-GRP.indexOf(b[1])||a[2].localeCompare(b[2])||a[3].localeCompare(b[3])||(a[4]==='일반'?-1:0)-(b[4]==='일반'?-1:0)||a[5].localeCompare(b[5]);
  const tn=r=>r[4]==='일반'?(r[5]==='일반'?'일반전형':r[5]):`${r[5]}${r[4]==='특별(외)'?' <span class="tag">정원 외</span>':''}`;
  function block(u,rows){
    const m=UM[u]||{};
    const src=(m.src||[]).map(([t,h])=>h?`<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`:esc(t)).join(' · ');
    return `<section class="jmu" id="u-${esc(encodeURIComponent(u).replace(/%/g,''))}">
      <h3>${esc(u)} <span class="small">${esc(m.r||'')}</span> ${ck(m.ckT||'s')}</h3>
      ${m.iv?`<p class="small"><b>2026년 면접</b> ${m.iv.rows.map(([k,v])=>`${esc(k)} ${esc(v)}`).join(' · ')}${m.iv.how?` · ${esc(m.iv.how)}`:''}</p>`:''}
      ${m.note?`<p class="small">${esc(m.note)}</p>`:''}
      ${src?`<p class="small">출처: ${src}</p>`:''}
      <div class="tbl"><table><thead><tr><th>모집단위</th><th>시기</th><th>전형</th><th>학제</th><th>인원</th><th>반영 비율</th></tr></thead><tbody>${
        rows.map(r=>`<tr><td>${esc(r[2])}<br><span class="small">${esc(r[1])}</span></td><td>${esc(r[3])}</td><td>${tn(r)}</td><td class="n">${r[6]?r[6]+'년':''}</td><td class="n">${r[7]==null?'제한 없음':r[7]+'명'}</td><td>${wbar(r)}</td></tr>`).join('')}</tbody></table></div>
    </section>`;
  }
  function render(){
    const q=st.q.trim().toLowerCase();
    const res=JT.filter(r=>(!st.u||r[0]===st.u)&&(!st.s||r[3]===st.s)&&(!st.g||r[1]===st.g)&&(!st.m||(r[9]||0)>=+st.m)&&(!q||key(r).toLowerCase().includes(q)));
    const by={};res.forEach(r=>(by[r[0]]=by[r[0]]||[]).push(r));
    const names=Object.keys(by).sort((a,b)=>(UM[a].ckT==='o'?0:1)-(UM[b].ckT==='o'?0:1)||a.localeCompare(b));
    $('#cnt').textContent=`${names.length}개 대학 · 전형 ${res.length}개`;
    $('#out').innerHTML=names.length?names.map(u=>block(u,by[u].sort(tSort))).join(''):'<p class="small" style="margin-top:16px">조건에 맞는 전형이 없습니다.</p>';
    const p=new URLSearchParams();if(st.u)p.set('u',st.u);
    history.replaceState(null,'',p.toString()?'?'+p:location.pathname);
  }
  $('#q').addEventListener('input',e=>{st.q=e.target.value;render()});
  $('#fu').addEventListener('change',e=>{st.u=e.target.value;render()});
  $('#fs').addEventListener('change',e=>{st.s=e.target.value;render()});
  $('#fm').addEventListener('change',e=>{st.m=e.target.value;render()});
  $('#fg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st.g=b.dataset.v;
    $('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));render()});
  $('#clr').addEventListener('click',()=>{Object.assign(st,{q:'',u:'',s:'',m:'',g:''});$('#q').value='';$('#fu').value='';$('#fs').value='';$('#fm').value='';
    $('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===''?'true':'false'));render()});
  render();
})();
