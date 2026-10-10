(()=>{
'use strict';
const menu=document.querySelector('.menu-btn'),nav=document.querySelector('#main-nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}))}
const y=document.querySelector('[data-year]');if(y)y.textContent=new Date().getFullYear();
const phone=String(window.PLUMPLAY_CONFIG?.whatsapp||'').replace(/\D/g,'');
document.querySelectorAll('a.contact-link').forEach(a=>{if(phone.length>=12&&phone.length<=15){let msg=a.dataset.message||'Olá! Quero conhecer o PlumPlay.';a.href='https://wa.me/'+phone+'?text='+encodeURIComponent(msg);a.target='_blank';a.rel='noopener noreferrer'}else{a.addEventListener('click',e=>{e.preventDefault();const notice=document.getElementById('contact-status');if(notice){notice.textContent='O WhatsApp de atendimento ainda não foi configurado. O responsável pelo site precisa informar o número para ativar este botão.';notice.scrollIntoView({behavior:'smooth',block:'center'})}else{window.location.href='index.html#contato'}})}});
})();
