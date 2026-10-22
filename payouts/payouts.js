/* AI Profit Camp Payouts · render compartido (Dirección B "Cuántico Pro") */
(function(){
const P=document.body.dataset.proot||'';            // ruta a /payouts/
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const M=c=>SQ.mascot(c);
const MES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const long=s=>{const[y,m,d]=s.split('-');return `${+d} de ${MES[m-1]} de ${y}`};
const short=s=>{const[y,m,d]=s.split('-');return `${d}/${m}/${y.slice(2)}`};
let TODAY;const rel=s=>{const n=Math.round((TODAY-new Date(s))/864e5);if(n<=0)return'hoy';if(n==1)return'ayer';if(n==2)return'anteayer';if(n<30)return`hace ${n} días`;if(n<60)return'el mes pasado';return`hace ${Math.floor(n/30)} meses`};
const L={retiro:id=>`${P}retiro/index.html?id=${encodeURIComponent(id)}`,trader:s=>`${P}trader/index.html?slug=${encodeURIComponent(s)}`};
async function load(){if(location.protocol==='file:'&&window.PAYOUTS_DATA)return window.PAYOUTS_DATA;try{const r=await fetch(P+'data.json');if(!r.ok)throw 0;return await r.json()}catch(e){return window.PAYOUTS_DATA}}
const money=n=>'$'+SQ.fmt(n);
const firmLbl=f=>f;

load().then(D=>{
  TODAY=new Date(D.today);
  const T={};D.traders.forEach(t=>{t.payouts=[];t.total=0;T[t.slug]=t});
  D.payouts.forEach(p=>{const t=T[p.trader];p.t=t;t.payouts.push(p);t.total+=p.amountValue});
  const ranked=D.traders.filter(t=>t.payouts.length).sort((a,b)=>b.total-a.total);
  const page=document.body.dataset.page;
  // ticker
  const tk=$('#tk');if(tk)tk.innerHTML=D.payouts.slice(0,14).map(p=>`<a href="${L.retiro(p.id)}"><i>${esc(p.propFirm)}</i><b>+${p.amount}</b>${esc(p.t.name)}<i>·</i></a>`).join('').repeat(2);
  const R={home,registro,ranking,comprobantes,retiro,trader}[page];R&&R(D,T,ranked);
  SQ.reveal();
});

function row(p){return `<tr data-href="${L.retiro(p.id)}"><td class="id"><a href="${L.retiro(p.id)}">${p.id}</a></td><td class="tr">${p.t.flag?p.t.flag+' ':''}<a href="${L.trader(p.t.slug)}">${esc(p.t.name)}</a></td><td>${esc(p.propFirm)}</td><td class="m">${p.amount}</td><td class="d">${short(p.date)}</td><td><span class="badge-ok">Verificado</span></td></tr>`}
function mrow(p){return `<a class="mi" href="${L.retiro(p.id)}"><span class="m">${p.amount}</span><span class="badge-ok">Verificado</span><span class="n">${p.t.flag?p.t.flag+' ':''}${esc(p.t.name)}</span><span class="d" style="color:var(--mute);font-size:12px">${short(p.date)}</span><span class="s">${p.propFirm=='—'?'Sin prop firm':esc(p.propFirm)} · <span class="mono">${p.id}</span></span></a>`}
function bindRows(sc=document){sc.querySelectorAll('tr[data-href]').forEach(tr=>tr.addEventListener('click',e=>{if(!e.target.closest('a'))location.href=tr.dataset.href}))}
function emptyState(txt){return `<div class="empty">${M('m-sad')}${txt}</div>`}

function wall(D,el){const P2=D.payouts;const half=Math.ceil(P2.length/2);
  const cert=(p,i)=>`<button class="card cert" data-i="${i}" aria-label="Comprobante de ${p.amount} de ${esc(p.t.name)}"><div class="ph"><b>COMPROBANTE</b>${p.certificate}<span style="color:var(--lime);font-size:17px;font-weight:900">${p.amount}</span></div><div class="f"><span>${esc(p.propFirm!='—'&&i%3==0?p.propFirm:p.t.name)}</span><b>${p.amount}</b></div></button>`;
  const a=P2.slice(0,half).map((p,i)=>cert(p,i)).join(''),b=P2.slice(half).map((p,i)=>cert(p,i+half)).join('');
  el.innerHTML=`<div class="lane">${a+a}</div><div class="lane">${b+b}</div>`;
  const lanes=[...el.querySelectorAll('.lane')];let off=[0,-500],drag=null,vx=0,moved=0;
  (function tick(){lanes.forEach((l,k)=>{const W=l.scrollWidth/2;if(drag==null)off[k]+=(k?.35:-.35)+vx;off[k]=((off[k]%W)-W)%W;l.style.transform=`translateX(${off[k]}px)`});vx*=.94;requestAnimationFrame(tick)})();
  el.addEventListener('pointerdown',e=>{drag=e.clientX;moved=0});addEventListener('pointermove',e=>{if(drag==null)return;const d=e.clientX-drag;drag=e.clientX;moved+=Math.abs(d);off=off.map(o=>o+d);vx=d});addEventListener('pointerup',()=>drag=null);
  const md=$('#md');el.addEventListener('click',e=>{const b=e.target.closest('.cert');if(!b||moved>6)return;const p=P2[b.dataset.i];
    md.querySelector('.ph').innerHTML=`<b>COMPROBANTE</b>${p.certificate}`;md.querySelector('.a').textContent=p.amount;md.querySelector('.n').textContent=p.t.name;md.querySelector('.i').textContent=p.id;md.querySelector('.go').href=L.retiro(p.id);md.classList.add('on')});
  md.addEventListener('click',e=>{if(e.target===md||e.target.closest('.x'))md.classList.remove('on')});addEventListener('keydown',e=>e.key=='Escape'&&md.classList.remove('on'))}

function home(D,T,ranked){const S=D.summary;
  $('#upd').textContent=D.updated;$('#since').textContent=S.since;$('#every').textContent=S.every;$('#pulse').textContent=`${S.last30} retiros en los últimos 30 días · promedio $${S.avg}`;
  $('#fd').textContent=S.fundedDelta;$('#funded').textContent=S.funded;$('#acc').textContent=`${S.activeAccounts} cuentas activas · de ${S.boughtAccounts} compradas`;
  document.querySelectorAll('[data-k]').forEach(el=>{el.dataset.to=S[el.dataset.k];if(el.closest('.rv.in'))SQ.count(el)});
  const L0=D.payouts[0];$('#lrel').textContent=rel(L0.date);$('#lv').textContent=L0.amount;$('#lt').innerHTML=`<a href="${L.trader(L0.t.slug)}">${esc(L0.t.name)}</a> · ${esc(L0.t.country)}`;$('#lf').textContent=L0.propFirm;$('#lid').textContent=L0.id;$('#lid').href=L.retiro(L0.id);
  const mx=Math.max(...D.countries.map(c=>c.total));
  $('#cr').innerHTML=D.countries.map(c=>`<div class="row"><span>${c.name}</span><b>${money(c.total)}</b><small>${c.count} ret.</small><i class="bar" data-w="${c.total/mx*100}"></i></div>`).join('');
  $('#mapin').insertAdjacentHTML('beforeend',D.countries.filter(c=>['Estados Unidos','México','Colombia','Bolivia','Argentina'].includes(c.name)).map(c=>{const s=18+c.total/mx*30;return `<div class="dot" style="left:${c.x}%;top:${c.y}%"><i style="width:${s}px;height:${s}px"></i>${c.name.toUpperCase()} ${money(c.total)}</div>`}).join(''));
  $('#rk').innerHTML=ranked.slice(0,3).map((t,i)=>`<a class="card rkc rv" href="${L.trader(t.slug)}"><div class="t"><span class="pos">0${i+1}</span><span class="a">(CIFRA RETIRO)</span></div><h3>${esc(t.name)}</h3><p>${t.payouts.length} retiros · ${esc(t.country)}</p></a>`).join('');
  wall(D,$('#wall'));
  $('#tb').innerHTML=D.payouts.slice(0,6).map(row).join('');$('#ml').innerHTML=D.payouts.slice(0,6).map(mrow).join('');bindRows();
  let z=1,tx=0,ty=0,md=null;const mi=$('#mapin'),mv=$('#mapv'),ap=()=>mi.style.transform=`translate(${tx}px,${ty}px) scale(${z})`;
  mv.addEventListener('wheel',e=>{e.preventDefault();z=Math.min(3,Math.max(1,z-e.deltaY*.002));ap()},{passive:false});mv.addEventListener('pointerdown',e=>{md=[e.clientX-tx,e.clientY-ty]});addEventListener('pointermove',e=>{if(md){tx=e.clientX-md[0];ty=e.clientY-md[1];ap()}});addEventListener('pointerup',()=>md=null);
  $('#zi').onclick=()=>{z=Math.min(3,z+.3);ap()};$('#zo').onclick=()=>{z=Math.max(1,z-.3);if(z==1)tx=ty=0;ap()};
}

function registro(D){const q=new URLSearchParams(location.search),PER=40;
  const fs=$('#firma'),ps=$('#pais'),mn=$('#min');
  D.propFirms.forEach(f=>fs.insertAdjacentHTML('beforeend',`<option>${esc(f)}</option>`));D.countryOptions.forEach(c=>ps.insertAdjacentHTML('beforeend',`<option value="${esc(c.split(' ').slice(1).join(' '))}">${esc(c)}</option>`));
  fs.value=q.get('firma')||'';ps.value=q.get('pais')||'';mn.value=q.get('min')||'';
  const R=D.payouts.filter(p=>(!fs.value||p.propFirm==fs.value)&&(!ps.value||p.t.country==ps.value)&&(!mn.value||p.amountValue>=+mn.value));
  const n=Math.max(1,Math.ceil(R.length/PER));let pg=Math.min(Math.max(1,+(q.get('p')||1)),n);const V=R.slice((pg-1)*PER,pg*PER);
  $('#count').textContent=D.payouts.length;
  $('#tb').innerHTML=V.map(row).join('');$('#ml').innerHTML=V.map(mrow).join('');bindRows();
  if(!V.length)$('#tw').insertAdjacentHTML('afterbegin',emptyState('Sin resultados'));
  const link=p=>{const u=new URLSearchParams(q);u.set('p',p);return '?'+u};
  $('#pag').innerHTML=`<span>${pg>1?`<a class="btn btn-ghost" href="${link(pg-1)}">← Anterior</a>`:''}</span><span>Página ${pg} de ${n}</span><span>${pg<n?`<a class="btn btn-ghost" href="${link(pg+1)}">Siguiente →</a>`:''}</span>`;
}

function ranking(D,T,ranked){
  $('#pod').innerHTML=ranked.slice(0,3).map((t,i)=>`<a class="card podc p${i+1} rv" href="${L.trader(t.slug)}"><span class="pn">${i+1}</span><span class="av">${t.avatar}</span><h3>${t.flag?t.flag+' ':''}${esc(t.name)}</h3><div class="big">(CIFRA RETIRO)</div><p>${t.payouts.length} retiros · último ${rel(t.payouts[0].date)}</p>${i==0?`<span class="crown">${M('m-float')}</span>`:''}</a>`).join('');
  const rest=ranked.slice(3,100);
  $('#tb').innerHTML=rest.map((t,i)=>`<tr data-href="${L.trader(t.slug)}"><td class="id">${i+4}</td><td class="tr">${t.flag?t.flag+' ':''}<a href="${L.trader(t.slug)}">${esc(t.name)}</a></td><td>${esc(t.country)}</td><td class="m">(CIFRA RETIRO)</td><td>${t.payouts.length}</td><td class="d">${rel(t.payouts[0].date)}</td></tr>`).join('');
  $('#ml').innerHTML=rest.map((t,i)=>`<a class="mi" href="${L.trader(t.slug)}"><span class="n">${i+4}. ${t.flag?t.flag+' ':''}${esc(t.name)}</span><span class="m" style="font-size:16px">(CIFRA RETIRO)</span><span class="s">${esc(t.country)} · ${t.payouts.length} retiros · ${rel(t.payouts[0].date)}</span></a>`).join('');bindRows();
}

function comprobantes(D){$('#cn').textContent=D.payouts.length;wall(D,$('#wall'))}

function retiro(D){const id=new URLSearchParams(location.search).get('id')||D.payouts[0].id;const p=D.payouts.find(x=>x.id==id);const el=$('#det');
  if(!p){el.innerHTML=emptyState('(TEXTO RETIRO NO ENCONTRADO)');return}
  document.title=`${p.id} · AI Profit Camp Payouts`;
  const f=(k,v)=>`<div class="fld"><span class="eyebrow">${k}</span><b>${v}</b></div>`;
  el.innerHTML=`<div class="dh"><div><span class="eyebrow">RETIRO VERIFICADO</span><div class="big amt">${p.amount}</div><p>Retirado por ${p.t.flag?p.t.flag+' ':''}<a class="lime" href="${L.trader(p.t.slug)}"><b>${esc(p.t.name)}</b></a></p><p class="mute">${rel(p.date)}</p></div><span class="badge-ok">Verificado</span></div>
  <div class="grid">${f('PROP FIRM',esc(p.propFirm))}${f('CUENTA',p.account)}${f('FECHA DE PAGO',long(p.date))}${f('MÉTODO',p.method)}${f('PAÍS',(p.t.flag?p.t.flag+' ':'')+esc(p.t.country))}<div class="fld"><span class="eyebrow">ID PÚBLICO</span><b class="mono">${p.id} <button class="copy" aria-label="Copiar ${p.id}">⧉</button></b></div></div>
  <div class="proof"><span class="eyebrow">COMPROBANTE</span><div class="ph" style="height:340px;margin-top:12px"><b>COMPROBANTE</b>${p.certificate}</div></div>
  <div class="vfy"><span class="badge-ok">Verificado</span> Verificado el ${long(p.verifiedAt)} contra el comprobante original.</div>`;
  el.querySelector('.copy').onclick=e=>{navigator.clipboard?.writeText(p.id);e.target.textContent='✓';setTimeout(()=>e.target.textContent='⧉',1200)};
}

function trader(D,T){const s=new URLSearchParams(location.search).get('slug')||D.traders[0].slug;const t=T[s];const el=$('#prof');
  if(!t){el.innerHTML=emptyState('(TEXTO TRADER NO ENCONTRADO)');return}
  document.title=`${t.name} · AI Profit Camp Payouts`;const P2=t.payouts;const funded=t.accounts.filter(a=>a.status=='Fondeada').length;
  const firms=[...new Set([...P2.map(p=>p.propFirm),...t.accounts.map(a=>a.propFirm)].filter(f=>f!='—'))];
  el.innerHTML=`<div class="phd rv"><span class="eyebrow">PERFIL PÚBLICO</span><div class="who"><span class="av" style="width:72px;height:72px">${t.avatar}</span><div><h1>${t.flag?t.flag+' ':''}${esc(t.name)}</h1><p class="mute">@${esc(t.handle)} · ${esc(t.country)}${P2.length?` · Primer retiro el ${long(P2[P2.length-1].date)}`:''}</p></div></div><p class="bio">${esc(t.bio)}</p></div>
  <div class="kpis"><div class="card k rv"><span class="eyebrow">TOTAL RETIRADO</span><div class="big">(CIFRA RETIRO)</div></div><div class="card k rv"><span class="eyebrow">RETIROS</span><div class="big" style="color:#fff">${P2.length}</div></div><div class="card k rv"><span class="eyebrow">CAPITAL FONDEADO</span><div class="big" style="color:#fff">${t.fundedCapital}</div></div><div class="card k rv"><span class="eyebrow">TASA DE FONDEO</span><div class="big" style="color:#fff">${(funded/t.accounts.length*100).toFixed(1)}%</div><p class="mute">${funded} de ${t.accounts.length} cuentas</p></div></div>
  <div class="rv" style="margin-top:28px"><span class="eyebrow">PROP FIRMS QUE HA USADO</span><div style="margin-top:12px">${firms.map(f=>`<span class="chip">${esc(f)}</span>`).join('')}</div></div>
  <section class="blk"><h2 class="rv" style="margin-bottom:18px">Sus retiros</h2>${P2.length?`<div class="tl">${P2.map(p=>`<a class="ti rv" href="${L.retiro(p.id)}"><b class="lime">${p.amount}</b> <span class="eyebrow" style="color:var(--lav)">${esc(p.propFirm)}</span><small>${long(p.date)} · <span class="mono">${p.id}</span></small></a>`).join('')}</div>`:emptyState('Sin resultados')}</section>
  <section class="blk"><h2 class="rv" style="margin-bottom:18px">Sus cuentas</h2><div class="card tw rv"><table class="t acc"><thead><tr><th>Prop firm</th><th>Tamaño</th><th>Comprada</th><th>Estado</th></tr></thead><tbody>${t.accounts.map(a=>`<tr><td>${esc(a.propFirm.toUpperCase())}</td><td>${a.size}</td><td class="d">${long(a.bought)}</td><td><span class="st st-${a.status.split(' ')[0].toLowerCase()}">${a.status}</span></td></tr>`).join('')}</tbody></table>
  <div class="mlist">${t.accounts.map(a=>`<div class="mi"><span class="n">${esc(a.propFirm.toUpperCase())}</span><span class="st st-${a.status.split(' ')[0].toLowerCase()}">${a.status}</span><span class="s">${a.size} · ${long(a.bought)}</span></div>`).join('')}</div></div></section>`;
}
})();
