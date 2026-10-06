// 면접 문항: 대학·학과별 묶음, 계열·대학·종류·질문 유형·검색으로 거르기, 한 문항 뽑기와 1분 타이머 (?u=대학 으로 열면 그 대학만)
(function(){
  const P=new URLSearchParams(location.search);
  const st={q:'',u:P.get('u')||'',k:'',c:P.get('c')||'',g:''};
  const us=[...new Set(JQ.map(r=>r[0]))].sort((a,b)=>a.localeCompare(b));
  const KD=['2026 기출','2027 예상','준비 포인트'];
  $('#fu').innerHTML='<option value="">대학 전체</option>'+us.map(x=>`<option>${esc(x)}</option>`).join('');
  $('#fk').innerHTML='<option value="">기출·예상 전체</option>'+KD.map(x=>`<option>${x}</option>`).join('');
  $('#fc').innerHTML='<option value="">질문 유형 전체</option>'+QC.map(([n])=>`<option>${esc(n)}</option>`).join('');
  $('#fg').innerHTML=['',...GRP].map(g=>`<button type="button" data-v="${esc(g)}" aria-pressed="${g===''}">${g||'전체 계열'}</button>`).join('');
  if(st.u&&!us.includes(st.u))st.u='';
  if(st.c&&!QC.some(([n])=>n===st.c))st.c='';
  $('#fu').value=st.u;$('#fc').value=st.c;

  const QX=JQ.map(r=>({u:r[0],d:r[1],g:r[2],k:r[3],q:r[4],a:r[5],c:qcat(r[4])}));
  const kcls=k=>k==='2027 예상'?' k-예상':k==='준비 포인트'?' k-준비':'';
  let cur=[];
  function render(){
    const q=st.q.trim().toLowerCase();
    cur=QX.filter(x=>(!st.u||x.u===st.u)&&(!st.k||x.k===st.k)&&(!st.g||x.g===st.g)&&(!st.c||x.c.includes(st.c))&&(!q||`${x.u} ${x.d} ${x.q}`.toLowerCase().includes(q)));
    const by=new Map();cur.forEach(x=>{const k=x.u+'|'+x.d;if(!by.has(k))by.set(k,[]);by.get(k).push(x)});
    const keys=[...by.keys()].sort((a,b)=>{const [ua,da]=a.split('|'),[ub,db]=b.split('|');
      return (UM[ua].ckQ==='o'?0:1)-(UM[ub].ckQ==='o'?0:1)||GRP.indexOf(by.get(a)[0].g)-GRP.indexOf(by.get(b)[0].g)||ua.localeCompare(ub)||da.localeCompare(db)});
    const nq=cur.filter(x=>x.k!=='준비 포인트').length;
    $('#cnt').textContent=`${keys.length}개 학과 · 문항 ${nq}개${cur.length>nq?` · 준비 포인트 ${cur.length-nq}개`:''}`;
    $('#out').innerHTML=keys.length?keys.map(k=>{
      const xs=by.get(k),[u,d]=k.split('|'),m=UM[u];
      const qs=xs.filter(x=>x.k!=='준비 포인트'),pp=xs.filter(x=>x.k==='준비 포인트');
      const src=(m.srcQ||[]).map(([t,h])=>h?`<a href="${esc(h)}" target="_blank" rel="noopener">${esc(t)}</a>`:esc(t)).join(' · ');
      return `<article class="qb${m.ckQ==='o'?'':' s'}">
        <h3>${esc(u)} <span>${esc(d)}</span> ${ck(m.ckQ)} <span class="gtag">${esc(xs[0].g)}</span></h3>
        ${src?`<p class="small">출처: ${src}</p>`:''}
        ${qs.length?`<ul class="jq">${qs.map(x=>`<li><span class="kd${kcls(x.k)}">${esc(x.k)}</span><div>${x.a?`<span class="ar">${esc(x.a)}</span>`:''}${esc(x.q)}</div>${x.c.length?`<span class="ct">${x.c.map(c=>`<span class="tag">${esc(c)}</span>`).join('')}</span>`:''}</li>`).join('')}</ul>`:''}
        ${pp.length?`<div class="prep"><b>대학이 안내한 준비 포인트</b><ul>${pp.map(x=>`<li>${esc(x.q)}</li>`).join('')}</ul></div>`:''}
      </article>`}).join(''):'<p class="small">조건에 맞는 문항이 없습니다.</p>';
    const p=new URLSearchParams();if(st.u)p.set('u',st.u);if(st.c)p.set('c',st.c);
    history.replaceState(null,'',p.toString()?'?'+p:location.pathname);
  }
  $('#q').addEventListener('input',e=>{st.q=e.target.value;render()});
  $('#fu').addEventListener('change',e=>{st.u=e.target.value;render()});
  $('#fk').addEventListener('change',e=>{st.k=e.target.value;render()});
  $('#fc').addEventListener('change',e=>{st.c=e.target.value;render()});
  $('#fg').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st.g=b.dataset.v;
    $('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));render()});
  $('#clr').addEventListener('click',()=>{Object.assign(st,{q:'',u:'',k:'',c:'',g:''});['#q','#fu','#fk','#fc'].forEach(s=>$(s).value='');
    $('#fg').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===''?'true':'false'));render()});
  render();

  // ---- 한 문항 뽑기 + 1분 타이머 ----
  let tid=null,left=60;
  const show=()=>{$('#tm').textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`};
  const stop=()=>{clearInterval(tid);tid=null};
  $('#pick').addEventListener('click',()=>{
    const pool=cur.filter(x=>x.k!=='준비 포인트');
    if(!pool.length){$('#pp').textContent='조건에 맞는 문항이 없습니다';$('#pr').textContent='';return}
    const x=pool[Math.floor(Math.random()*pool.length)];
    $('#pp').textContent=x.q;
    $('#pr').textContent=`${x.u} ${x.d} · ${x.k}${x.a?` · ${x.a}`:''}`;
    stop();left=60;show();$('#tm').classList.remove('done');$('#tgo').disabled=false;$('#tgo').textContent='1분 타이머';
  });
  $('#tgo').addEventListener('click',()=>{
    if(tid){stop();$('#tgo').textContent='다시 시작';return}
    if(left<=0){left=60;$('#tm').classList.remove('done')}
    $('#tgo').textContent='멈춤';
    tid=setInterval(()=>{left--;show();if(left<=0){stop();$('#tm').classList.add('done');$('#tgo').textContent='다시 시작'}},1000);
  });
})();
