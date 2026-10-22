/* ===== CONFIGURACIÓN: dominios finales ===== */
const PAYOUTS_URL = 'https://aiprofitcamp.com/payouts/';
const LANDING_URL = 'https://aiprofitcamp.com/';
/* ============================================ */
/* Salto Cuántico · utilidades compartidas */
window.SQ=(function(){
  const root=document.documentElement.dataset.root||'';
  const logo=root+'brand/logo.png';
  function mascot(cls='',alt=''){return `<span class="mascot ${cls}"><img src="${logo}" alt="${alt}"><i class="lid l"></i><i class="lid r"></i></span>`}
  function fill(){document.querySelectorAll('[data-mascot]').forEach(el=>{el.outerHTML=mascot(el.dataset.mascot,el.getAttribute('aria-label')||'')})}
  function loader(){const l=document.createElement('div');l.className='loader';l.innerHTML=mascot('m-bounce');document.body.prepend(l);
    const done=()=>setTimeout(()=>l.classList.add('done'),250);if(document.readyState==='complete')done();else addEventListener('load',done);setTimeout(()=>l.classList.add('done'),2500)}
  const fmt=(n,d=0,sep='.')=>d?Number(n).toFixed(d):Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,sep);
  function count(el){if(el.dataset.done)return;el.dataset.done=1;const to=+el.dataset.to,d=+(el.dataset.dec||0),p=el.dataset.pre||'',s=el.dataset.suf||'';let t0;
    const f=t=>{t0??=t;const k=Math.min((t-t0)/1800,1),v=to*(1-Math.pow(1-k,3));el.textContent=p+fmt(v,d,el.dataset.sep||'.')+s;if(k<1)requestAnimationFrame(f);else el.dispatchEvent(new Event('counted',{bubbles:true}))};requestAnimationFrame(f)}
  function reveal(scope=document){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');el.querySelectorAll('[data-to]').forEach(count);if(el.matches('[data-to]'))count(el);el.querySelectorAll('.bar[data-w]').forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(el)}),{threshold:.12});
    scope.querySelectorAll('.rv:not(.in)').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)})}
  function sticky(){const st=document.querySelector('.sticky');if(!st)return;const on=()=>st.classList.toggle('on',scrollY>500&&innerHeight+scrollY<document.body.scrollHeight-260);addEventListener('scroll',on,{passive:true});on()}
  document.addEventListener('counted',e=>{const m=e.target.closest('[data-celebrate]')?.querySelector('.mascot');if(m){m.classList.remove('m-celebrate');void m.offsetWidth;m.classList.add('m-celebrate')}});
  function init(){fill();loader();reveal();sticky()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  return {mascot,reveal,fmt,root,count};
})();


/* Aplica la URL configurada: en aiprofitcamp.com usa la absoluta; en vistas previas conserva el enlace relativo si existe */
(function(){const prod=/(^|\.)aiprofitcamp\.com$/.test(location.hostname);const set=(sel,u)=>{if(!u||/[()]/.test(u))return;document.querySelectorAll(sel).forEach(a=>{const h=a.getAttribute('href');if(prod||!h||h==='#')a.setAttribute('href',u)})};
const go=()=>{set('[data-landing]',typeof LANDING_URL!=='undefined'?LANDING_URL:'');set('[data-payouts]',typeof PAYOUTS_URL!=='undefined'?PAYOUTS_URL:'')};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go()})();

/* ===== Velas animadas en márgenes (ondas de Elliott, canvas por cluster) ===== */
(function(){if(window.__sqEW)return;window.__sqEW=1;
const U='#cae628',D='#ff5a7a',P=1500,R=Math.random,rm=matchMedia('(prefers-reduced-motion: reduce)'),cw=11;
const WAVE=[0,5,3,9,7,12,8,10.5,6];/* 1-2-3-4-5 + A-B-C, luego vuelve a empezar */
function path(){const p=[];for(let i=0;i<WAVE.length-1;i++){const n=3+(R()*2|0);for(let k=0;k<n;k++)p.push(WAVE[i]+(WAVE[i+1]-WAVE[i])*(k+1)/n)}return p}
let cl=[],raf=0,lt=0;
function mk(o,t){return{o,h:o,l:o,c:o,t}}
function nextC(q,prev){const base=q.off+q.p[q.i++%q.p.length];if(q.i%q.p.length==0)q.off+=q.p[q.p.length-1]-q.p[0];return mk(prev,base+(R()-.5)*.6)}
function tk(a,k){const v=a.o+(a.t-a.o)*Math.min(1,k*1.15)+(R()*2-1)*.35*(1-k*.6);a.c=v;v>a.h&&(a.h=v);v<a.l&&(a.l=v)}
function seed(q){q.p=path();q.i=0;q.off=0;q.cs=[];let v=0;const n=Math.ceil(q.W/cw)+1;for(let j=0;j<n;j++){const a=nextC(q,v);for(let k=0;k<=1;k+=.25)tk(a,k);a.h+=R()*.4;a.l-=R()*.4;q.cs.push(a);v=a.c}q.cur=nextC(q,v);q.t0=performance.now()-R()*P}
function draw(q,now){const x=q.x;let k=(now-q.t0)/P;if(k>=1){q.cs.push(q.cur);q.cs.shift();q.cur=nextC(q,q.cur.c);q.t0=now;k=0}rm.matches||tk(q.cur,k);
const a=q.cs.concat(q.cur);let hi=-1e9,lo=1e9;for(const c of a){c.h>hi&&(hi=c.h);c.l<lo&&(lo=c.l)}const pd=(hi-lo)*.12+.5;hi+=pd;lo-=pd;const H=q.H,y=v=>H-(v-lo)/(hi-lo)*H,bw=6,s=rm.matches?0:k*cw;
x.clearRect(0,0,q.W,H);for(let i=a.length-1,j=0;i>=0;i--,j++){const c=a[i],X=(q.W-cw/2-s-j*cw|0)+.5;if(X<-cw)break;x.fillStyle=x.strokeStyle=c.c>=c.o?U:D;x.beginPath();x.moveTo(X,y(c.h));x.lineTo(X,y(c.l));x.stroke();const t=y(Math.max(c.o,c.c));x.fillRect(X-bw/2,t,bw,Math.max(1.5,y(Math.min(c.o,c.c))-t))}}
function loop(now){raf=requestAnimationFrame(loop);if(now-lt<33)return;lt=now;for(const q of cl)q.vis&&draw(q,now)}
function play(){cancelAnimationFrame(raf);raf=0;const n=performance.now();if(rm.matches||document.hidden){rm.matches&&cl.forEach(q=>draw(q,n));return}raf=requestAnimationFrame(loop)}
let io;
function build(){document.querySelector('.sq-ew')?.remove();io&&io.disconnect();cl=[];const vw=document.documentElement.clientWidth;if(vw<700)return play();
const box=document.createElement('div');box.className='sq-ew';box.setAttribute('aria-hidden','true');
const tw=document.createTreeWalker(document.body,4),rs=[];let t;while(t=tw.nextNode()){if(!t.textContent.trim()||t.parentElement.closest('.loader,.sticky,.sq-ew,script,style'))continue;const r=document.createRange();r.selectNodeContents(t);for(const q of r.getClientRects())q.width&&rs.push([q.left,q.right,q.top+scrollY,q.bottom+scrollY])}
const docH=document.documentElement.scrollHeight,H=150,d=Math.min(devicePixelRatio||1,2);let side=0;
io=new IntersectionObserver(es=>es.forEach(e=>e.target.__q.vis=e.isIntersecting),{rootMargin:'100px'});
for(let top=innerHeight*.7;top<docH-260;top+=innerHeight*(1.05+R()*.4),side^=1){let room=vw;for(const[l,r,a,b] of rs){if(b<top-20||a>top+H+20)continue;room=Math.min(room,side?vw-r-24:l-24)}if(room<70)continue;
const W=Math.min(260,room)|0,cv=document.createElement('canvas');cv.width=W*d;cv.height=H*d;cv.style.cssText=`top:${top|0}px;${side?'right':'left'}:0px;width:${W}px;height:${H}px`;
const q={x:cv.getContext('2d'),W,H,vis:false};q.x.setTransform(d,0,0,d,0,0);q.x.lineWidth=1.2;seed(q);cv.__q=q;cl.push(q);box.appendChild(cv)}
document.body.appendChild(box);cl.forEach((q,i)=>io.observe(box.children[i]));play()}
document.addEventListener('visibilitychange',play);rm.addEventListener&&rm.addEventListener('change',play);
const go=()=>(window.requestIdleCallback||setTimeout)(build,{timeout:1500});let rt,lw=0;
document.readyState==='complete'?go():addEventListener('load',go);addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const w=document.documentElement.clientWidth;if(w!==lw){lw=w;build()}},250)},{passive:true})})();

/* ===== Video en bucle diferido (carga al entrar en pantalla) ===== */
(function(){const vs=document.querySelectorAll('video[data-lazy]');if(!vs.length||!('IntersectionObserver'in window))return;const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.dataset.ok){v.dataset.ok=1;v.querySelectorAll('source[data-src]').forEach(s=>s.src=s.dataset.src);v.load()}rm||v.play().catch(()=>{})}else if(v.dataset.ok)v.pause()}),{rootMargin:'200px'});vs.forEach(v=>io.observe(v))})();

/* ===== YouTube ligero (miniatura -> iframe al hacer clic) ===== */
document.addEventListener('click',e=>{const b=e.target.closest('[data-yt]');if(!b||b.dataset.on)return;b.dataset.on=1;const f=document.createElement('iframe');
f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';f.title='AI Profit Camp';f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';b.replaceChildren(f)});
