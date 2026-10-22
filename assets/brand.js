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
