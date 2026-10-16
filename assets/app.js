(()=>{
'use strict';
const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('#main-nav');
if(menu&&nav){
 menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu')});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
}
const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href="#inicio"]').forEach(link=>link.addEventListener('click',ev=>{ev.preventDefault();window.scrollTo({top:0,behavior:motionOK?'smooth':'auto'});history.replaceState(history.state,'','#inicio')}));
// Center the selected section content in the available viewport below the fixed header.
function jumpToSection(hash, replace=false, instant=false){
 const id=hash?.slice(1);if(!id)return false;
 // O teste faz parte da seção de planos; ambos devem usar o mesmo enquadramento.
 // A URL mantém #teste, mas sua posição de rolagem é a mesma de #planos.
 const sectionId=id==='teste'?'planos':id;
 const section=document.getElementById(sectionId);if(!section||!section.classList.contains('section'))return false;
 const header=document.querySelector('.header');const headerH=header?header.getBoundingClientRect().height:0;
 let blocks=Array.from(section.children).filter(el=>el.getClientRects().length && !el.classList.contains('platforms-hint'));
 if(blocks.length===0)blocks=[section];
 const bounds=blocks.map(el=>el.getBoundingClientRect());
 const top=Math.min(...bounds.map(b=>b.top)), bottom=Math.max(...bounds.map(b=>b.bottom));
 const contentHeight=bottom-top, usableH=window.innerHeight-headerH;
 const pos=contentHeight>usableH-28 ? top-headerH-18 : (top+bottom)/2 - (window.innerHeight+headerH)/2;
 const maxScroll=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
 const target=Math.max(0,Math.min(maxScroll,window.scrollY+pos));
 window.scrollTo({top:target,behavior:instant||!motionOK?'instant':'smooth'});
 if(replace)history.replaceState(history.state,'',hash);else if(location.hash!==hash)history.pushState(history.state,'',hash);
 return true;
}
document.querySelectorAll('a[href^="#"]').forEach(link=>{
 if(link.getAttribute('href')==='#inicio')return;
 link.addEventListener('click',e=>{
  if(jumpToSection(link.getAttribute('href'))){e.preventDefault();}
 });
});
window.addEventListener('load',()=>{if(location.hash&&location.hash!=='#inicio')requestAnimationFrame(()=>jumpToSection(location.hash,true,true));});
window.addEventListener('popstate',()=>{if(location.hash)jumpToSection(location.hash,true,true);});
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
const igDM='https://ig.me/m/friendsjfas';
document.querySelectorAll('.contact-link').forEach(a=>{a.href=igDM;a.target='_blank';a.rel='noopener noreferrer'});
// Mensagens de cada plano: o Direct é aberto pelo próprio link <a target="_blank">,
// sem bloquear a navegação durante a tentativa de cópia.
const planMessages=Object.freeze({
 mensal:'Olá! Vim pelo site do MaxPrism e gostaria de contratar o plano mensal de R$ 30,00.',
 trimestral:'Olá! Vim pelo site do MaxPrism e gostaria de contratar o plano trimestral de 90 dias por R$ 80,00.',
 semestral:'Olá! Vim pelo site do MaxPrism e gostaria de contratar o plano semestral de 180 dias por R$ 150,00.',
 teste:'Olá! Vim pelo site do MaxPrism e gostaria de solicitar meu teste gratuito de 4 horas.'
});
const planFeedback=document.querySelector('#plan-copy-feedback');
const planFeedbackText=document.querySelector('#plan-copy-feedback-text');
const planManual=document.querySelector('#plan-copy-manual');
const planManualMessage=document.querySelector('#plan-copy-message');
const planManualButton=document.querySelector('#plan-copy-manual-button');
const planDismiss=document.querySelector('#plan-copy-dismiss');
function showPlanMessage(message,copied){
 if(!planFeedback)return;
 planFeedback.hidden=false;
 planFeedbackText.textContent=copied?'Mensagem copiada! Cole no Direct do Instagram.':'Não foi possível copiar automaticamente. Selecione a mensagem abaixo e copie antes de enviá-la pelo Instagram.';
 planManual.hidden=copied;
 if(!copied)planManualMessage.value=message;
}
planDismiss?.addEventListener('click',()=>{planFeedback.hidden=true});
function selectManualPlanMessage(){
 planManualMessage.focus();planManualMessage.select();planManualMessage.setSelectionRange(0,planManualMessage.value.length);
 planFeedbackText.textContent='Mensagem selecionada. Copie o texto e cole no Direct do Instagram.';
}
planManualButton?.addEventListener('click',()=>{
 const message=planManualMessage.value;
 if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function'){
  try{navigator.clipboard.writeText(message).then(()=>showPlanMessage(message,true)).catch(selectManualPlanMessage)}
  catch(_){selectManualPlanMessage()}
 }else if(copyPlanLegacy(message))showPlanMessage(message,true);
 else selectManualPlanMessage();
});
function copyPlanLegacy(message){
 // Alternativa local quando a Clipboard API não está disponível.
 const input=document.createElement('textarea');input.value=message;
 input.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
 document.body.append(input);input.focus();input.select();
 let ok=false;try{ok=document.execCommand('copy')}catch(_){ok=false}
 input.remove();return ok;
}
document.querySelectorAll('[data-plan-message]').forEach(link=>{
 link.addEventListener('click',()=>{
  const message=planMessages[link.dataset.planMessage];if(!message)return;
  // O clique nativo permanece intacto: o Instagram abre mesmo se a cópia falhar.
  // Nunca aguardar clipboard.writeText() antes de seguir o link (risco de popup bloqueado).
  if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function'){
   try{navigator.clipboard.writeText(message).then(()=>showPlanMessage(message,true)).catch(()=>showPlanMessage(message,false))}
   catch(_){showPlanMessage(message,copyPlanLegacy(message))}
  }else showPlanMessage(message,copyPlanLegacy(message));
 });
});

// Circular marquee with *one unique instance of each platform*: no clones visible at any time.
const viewport=document.querySelector('.platforms-carousel');
const track=viewport?.querySelector('.platforms-sequence');
if(!viewport||!track)return;
let paused=!motionOK,last=0, frame=0;
const visibleItems=track.querySelectorAll('.platform-logo-item');
function fitToWidth(){
 const w=viewport.clientWidth;const item=Math.max(146,Math.ceil((w+140)/9.55));
 track.style.setProperty('--platform-width',item+'px');
}
fitToWidth();window.addEventListener('resize',fitToWidth,{passive:true});
viewport.addEventListener('mouseenter',()=>paused=true);
viewport.addEventListener('mouseleave',()=>paused=false);
viewport.addEventListener('focusin',()=>paused=true);
viewport.addEventListener('focusout',()=>{if(!viewport.matches(':focus-within'))paused=false});
viewport.addEventListener('pointerdown',()=>paused=true);
viewport.addEventListener('pointerup',()=>{if(!viewport.matches(':hover')&&!viewport.matches(':focus-within'))paused=false});
document.addEventListener('visibilitychange',()=>{last=0});
function cycle(){
 const first=track.firstElementChild;if(!first)return;
 let size=first.getBoundingClientRect().width;
 const gap=parseFloat(getComputedStyle(track).gap)||0;
 let threshold=size+gap;
 let loops=0;
 while(viewport.scrollLeft>=threshold-0.5&&loops++<visibleItems.length){
  viewport.scrollLeft-=threshold;track.append(first);
  const f=track.firstElementChild;threshold=f.getBoundingClientRect().width+gap;
 }
}
function step(time){
 if(!last)last=time;
 let dt=Math.min(45,time-last);last=time;
 if(motionOK&&!paused&&!document.hidden){
  viewport.scrollLeft+=dt*.038;
  cycle();
 }
 frame=requestAnimationFrame(step);
}
if(motionOK)frame=requestAnimationFrame(step);
viewport.addEventListener('scroll',()=>{if(motionOK&&paused)cycle()},{passive:true});
})();