const cap=75;
const $=id=>document.getElementById(id);
const cur=$('current'), tar=$('target');

function fmtTime(hours){
  if(hours<=0) return '0 min';
  const mins=Math.round(hours*60), h=Math.floor(mins/60), m=mins%60;
  return h ? `${h} h${m?` ${m} min`:''}` : `${m} min`;
}
function superTime(a,b){
 const segs=[[0,20,150],[20,40,180],[40,60,140],[60,70,105],[70,80,75],[80,90,48],[90,95,30],[95,100,18]];
 let hours=0;
 for(const [lo,hi,p] of segs){
   const x=Math.max(a,lo), y=Math.min(b,hi);
   if(y>x) hours+=(cap*(y-x)/100)/p;
 }
 return hours;
}
function update(source){
 let a=+cur.value,b=+tar.value;
 if(b<a){ if(source==='cur') tar.value=a; else cur.value=b; a=+cur.value;b=+tar.value; }
 const pct=b-a, energy=cap*pct/100;
 $('currentOut').textContent=a+'%'; $('targetOut').textContent=b+'%';
 $('percent').textContent=pct+'%';
 $('energy').textContent=energy.toLocaleString('es-ES',{minimumFractionDigits:1,maximumFractionDigits:1})+' kWh';
 $('home').textContent=fmtTime(energy/4.48);
 $('super').textContent=fmtTime(superTime(a,b));
 $('kw22').textContent=fmtTime(energy/11);
 $('kw50').textContent=fmtTime(energy/25);
}
cur.addEventListener('input',()=>update('cur'));tar.addEventListener('input',()=>update('tar'));
update();
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
