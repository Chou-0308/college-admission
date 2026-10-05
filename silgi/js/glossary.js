// 용어 사전: 검색(용어 이름이 맞는 것을 먼저) + 분류 필터. ?q=검색어&c=분류 로 바로 열 수 있습니다
(function(){
  const st={q:'',c:''};
  const P=new URLSearchParams(location.search);['q','c'].forEach(k=>{const v=P.get(k);if(v)st[k]=v});
  $('#fc').innerHTML=['',...TCATS].map(c=>`<button type="button" data-v="${esc(c)}" aria-pressed="${c===st.c}">${c||'전체'} <span class="small">${c?TERMS.filter(t=>t[2]===c).length:TERMS.length}</span></button>`).join('');
  $('#q').value=st.q;
  $('#q').addEventListener('input',e=>{st.q=e.target.value.trim();render()});
  $('#fc').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;st.c=b.dataset.v;
    $('#fc').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));render()});
  const norm=s=>s.toLowerCase().replace(/\s/g,'');
  function hl(s){s=esc(s);if(!st.q)return s;const t=esc(st.q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return s.replace(new RegExp(t,'gi'),m=>`<mark>${m}</mark>`)}
  function render(){
    const Q=new URLSearchParams();if(st.q)Q.set('q',st.q);if(st.c)Q.set('c',st.c);
    try{history.replaceState(null,'',Q.toString()?'?'+Q:location.pathname)}catch(e){}
    const q=norm(st.q);
    let res=TERMS.filter(t=>!st.c||t[2]===st.c);
    if(q){const name=res.filter(t=>norm(t[0]+t[1]).includes(q));const rest=res.filter(t=>!name.includes(t)&&norm(t[3]+t[4]).includes(q));res=[...name,...rest]}
    $('#cnt').textContent=`${res.length}개`;
    $('#list').innerHTML=res.length?res.map(t=>`<div class="term"><div class="tn">${hl(t[0])}<span class="ta">${hl(t[1])} · ${esc(t[2])}</span></div><div class="td">${hl(t[3])}${t[4]?`<span class="te">${hl(t[4])}</span>`:''}</div></div>`).join('')
      :'<p class="count" style="padding:12px 0">찾는 용어가 없습니다. 다른 말로 검색해 보세요.</p>';
  }
  render();
})();
