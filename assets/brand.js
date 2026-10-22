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

/* ===== Fondo dinámico: velas OHLC (canvas, ~30fps) ===== */
(function(){if(window.__sqC)return;window.__sqC=1;
function go(){const cv=document.createElement('canvas'),x=cv.getContext('2d');if(!x)return;cv.className='sq-candles';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const rm=matchMedia('(prefers-reduced-motion: reduce)'),U='#cae628',D='#ff5a7a',P=1500,R=Math.random;
let W,H,cw,n,cs=[],c,tr=0,tl=0,t0=0,raf=0,lt=0,el=0;
const nc=o=>{tl--<=0&&(tr=(R()-.5)*.7,tl=8+R()*17|0);return{o,h:o,l:o,c:o,t:o+(tr*.6+(R()*2-1)*1.6)*2.2}},
tk=(a,k)=>{const p=a.o+(a.t-a.o)*Math.min(1,k*1.15)+(R()*2-1)*(1-k*.6);a.c=p;p>a.h&&(a.h=p);p<a.l&&(a.l=p)};
function seed(){cs=[];let p=100;for(let i=0;i<n;i++){const a=nc(p);for(let k=0;k<=1;k+=.2)tk(a,k);cs.push(a);p=a.c}c=nc(p);t0=performance.now()}
function size(){const d=Math.min(devicePixelRatio||1,2);W=document.documentElement.clientWidth;H=innerHeight;cv.width=W*d|0;cv.height=H*d|0;x.setTransform(d,0,0,d,0,0);cw=W<700?22:16;const m=Math.ceil(W/cw)+2;if(m!==n){n=m;seed()}}
function draw(now){let k=(now-t0)/P;if(k>=1){cs.push(c);cs.length>n&&cs.shift();c=nc(c.c);t0=now;k=0}rm.matches||tk(c,k);
const a=cs.concat(c);let hi=-1e9,lo=1e9;for(const q of a){q.h>hi&&(hi=q.h);q.l<lo&&(lo=q.l)}const pd=(hi-lo)*.25+2;hi+=pd;lo-=pd;
const T=H*.18,B=H*.88,y=v=>B-(v-lo)/(hi-lo)*(B-T);x.clearRect(0,0,W,H);x.lineWidth=1;x.strokeStyle='rgba(141,168,236,.2)';x.beginPath();
for(let g=0;g<6;g++){const gy=(T+g*(B-T)/5|0)+.5;x.moveTo(0,gy);x.lineTo(W,gy)}x.stroke();
const s=rm.matches?0:k*cw,bw=cw*.64|0;for(let i=a.length-1,j=0;i>=0;i--,j++){const q=a[i],X=(W-cw/2-s-j*cw|0)+.5;if(X<-cw)break;
x.fillStyle=x.strokeStyle=q.c>=q.o?U:D;x.beginPath();x.moveTo(X,y(q.h));x.lineTo(X,y(q.l));x.stroke();const bt=y(Math.max(q.o,q.c));x.fillRect(X-bw/2,bt,bw,Math.max(1.5,y(Math.min(q.o,q.c))-bt))}
const py=(y(c.c)|0)+.5;x.setLineDash([4,5]);x.strokeStyle=c.c>=c.o?U:D;x.beginPath();x.moveTo(0,py);x.lineTo(W,py);x.stroke();x.setLineDash([])}
function loop(now){raf=requestAnimationFrame(loop);if(now-lt<33)return;lt=now;draw(now)}
function play(){cancelAnimationFrame(raf);raf=0;if(rm.matches)return draw(performance.now());if(!document.hidden){t0=performance.now()-el;raf=requestAnimationFrame(loop)}}
document.addEventListener('visibilitychange',()=>{if(document.hidden){el=Math.min(performance.now()-t0,P-1);cancelAnimationFrame(raf);raf=0}else play()});
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{size();raf||draw(performance.now())},150)},{passive:true});
rm.addEventListener&&rm.addEventListener('change',play);size();play()}
const idle=()=>(window.requestIdleCallback||setTimeout)(go,{timeout:1500});document.readyState==='complete'?idle():addEventListener('load',idle)})();
