// Change the image paths and captions here. Place your photos in /memories.
const OUR_MEMORIES = [
 {image:"memories/photo-1.jpg",title:"A moment to remember",description:"Every memory with you becomes one of my favourites. ♡"},
 {image:"memories/photo-2.jpg",title:"My favourite person",description:"No matter where we go, being with you makes it special."},
 {image:"memories/photo-3.jpg",title:"Little moments, big feelings",description:"Sometimes the simplest moments become the ones I treasure most."},
 {image:"memories/photo-4.jpg",title:"Your beautiful smile",description:"I hope I get to see that beautiful smile for a very, very long time."},
 {image:"memories/photo-5.jpg",title:"Us, always",description:"Thank you for making ordinary days feel a little more magical."},
 {image:"memories/photo-6.jpg",title:"To many more",description:"Here's to all the places we'll go and memories we'll make together. ❤️"}
];
document.addEventListener("DOMContentLoaded",()=>{
 const $=id=>document.getElementById(id), gallery=$("memory-gallery"), finale=$("memory-finale"), card=$("memory-card"), photo=$("memory-photo"), placeholder=$("photo-placeholder"), dots=$("gallery-dots");let current=0,touchX=0;
 OUR_MEMORIES.forEach((_,i)=>{const d=document.createElement("button");d.type="button";d.className="gallery-dot";d.setAttribute("aria-label",`Go to memory ${i+1}`);d.addEventListener("click",()=>show(i));dots.appendChild(d)});
 function show(i){current=(i+OUR_MEMORIES.length)%OUR_MEMORIES.length;const m=OUR_MEMORIES[current];card.classList.add("is-changing");setTimeout(()=>{$("memory-count").textContent=`${String(current+1).padStart(2,"0")} / ${String(OUR_MEMORIES.length).padStart(2,"0")}`;$("memory-heading").textContent=m.title;$("memory-description").textContent=m.description;photo.classList.remove("is-loaded");photo.onload=()=>{photo.classList.add("is-loaded");placeholder.hidden=true};photo.onerror=()=>{photo.classList.remove("is-loaded");placeholder.hidden=false;placeholder.querySelector("small").textContent=m.image};photo.src=m.image;[...dots.children].forEach((d,n)=>d.classList.toggle("is-current",n===current));$("memory-prev").style.visibility=current===0?"hidden":"visible";$("memory-next").textContent=current===OUR_MEMORIES.length-1?"Finish ♡":"Next →";card.classList.remove("is-changing")},220)}
 function open(){$("letter").style.display="none";$("clock-box").style.display="none";$("memories-open").style.display="none";finale.classList.remove("is-active");gallery.classList.add("is-active");gallery.setAttribute("aria-hidden","false");show(0)}
 function back(){gallery.classList.remove("is-active");gallery.setAttribute("aria-hidden","true");$("letter").style.display="block";$("clock-box").style.display="";$("memories-open").style.display="inline-flex"}
 function next(){if(current===OUR_MEMORIES.length-1){gallery.classList.remove("is-active");gallery.setAttribute("aria-hidden","true");finale.classList.add("is-active")}else show(current+1)}
 $("memories-open").addEventListener("click",open);$("memory-prev").addEventListener("click",()=>show(current-1));$("memory-next").addEventListener("click",next);$("gallery-back").addEventListener("click",back);$("replay-memories").addEventListener("click",open);
 card.addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});card.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45){if(dx<0)next();else if(current>0)show(current-1)}},{passive:true});
});
