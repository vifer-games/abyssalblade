// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  // ------------ 2) GSAP SCROLL-IN REVEAL ------------
  // Only proceed if GSAP & ScrollTrigger have loaded
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Find every element with class="reveal" and animate it as it scrolls into view
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // when top of el hits 85% down the viewport
          }
        }
      );
    });
  }

  /* -------------------------------------------
   Parallax background – About‑game section
-------------------------------------------*/
if (window.gsap && window.ScrollTrigger){
  const section = document.querySelector('.about-game');
  const bgLayer = document.querySelector('.about-game__bg');

  if (section && bgLayer){
    gsap.to(bgLayer, {
      yPercent: -20,         // move up 25 % of its own height
      ease: 'none',
      scrollTrigger:{
        trigger: section,
        start: 'top bottom',  // when section enters viewport
        end:   'bottom top',  // when it leaves
        scrub: true           // tie to scrollbar for smoothness
      }
    });
  }
}

/* ───────────── Trailer modal logic ───────────── */
  /* handles  */
  const openBtn  = document.getElementById('open-trailer');
  const modal    = document.getElementById('trailer-modal');
  const closeBtn = document.getElementById('close-trailer');
  const teaserBG = document.querySelector('.teaser-bg');     // looping 5‑sec video
  const trailer  = document.getElementById('trailer-video'); // full trailer

  /* helper – open */
  function openModal () {
    modal.classList.add('is‑open');
    document.body.style.overflow = 'hidden'; // stop page scrolling
    teaserBG.pause();                        // optional – pause background
    trailer.currentTime = 0;                 // rewind just in case
    trailer.play();
  }

  /* helper – close */
  function closeModal () {
    modal.classList.remove('is‑open');
    document.body.style.overflow = '';       // re‑enable scrolling
    teaserBG.play();                         // resume looping teaser
    trailer.pause();
  }

  /* events */
  openBtn .addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  /* close with Esc key */
  window.addEventListener('keyup', e => {
    if (e.key === 'Escape' && modal.classList.contains('is‑open')) {
      closeModal();
    }
  });

  /* optional ‑ click on dark backdrop closes too */
  modal.addEventListener('click', e => {
    // If the click did NOT happen inside .modal-inner → close.
    if (!e.target.closest('.modal-inner')) {
      closeModal();
    }
  });
  


  // ------------ 4) CAROUSEL LOGIC ------------

  if (window.gsap && window.ScrollTrigger){
    const carousel = document.querySelector('.carousel-wrapper');
    const bgLayer = document.querySelector('.carousel-bg');
  
    if (carousel && bgLayer){
      gsap.to(bgLayer, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: carousel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }  
  
  /* ---------- 1. handles ---------- */
  const slides      = document.querySelector('.slides');
  const slideCount  = document.querySelectorAll('.slide').length;
  const gemStrip    = document.getElementById('gem-strip');
  const prevBtn     = document.getElementById('prev');
  const nextBtn     = document.getElementById('next');

  /* ---------- 2. state ---------- */
  let index     = 0;           // current slide
  let autoplay  = true;        // flip to false when user interacts
  let timerId   = null;        // id from setInterval

  /* ---------- 3. helpers ---------- */
  function go(i){
    index = (i + slideCount) % slideCount;
    slides.style.transform = `translateX(-${index*100}%)`;
    gemStrip.src = `assets/website_carousel_gem_${index+1}.png`; // ✔
  }  

  function start() {
    timerId = setInterval(()=>{ if (autoplay) go(index+1); }, 7000);
  }
  function stop() {
    autoplay = false;
    clearInterval(timerId);
  }

  /* ---------- 4. events ---------- */
  prevBtn.addEventListener('click', ()=>{ stop(); go(index-1); });
  nextBtn.addEventListener('click', ()=>{ stop(); go(index+1); });

  /* ---------- 5. init ---------- */
  go(0);     // first frame
  start();   // begin auto‑advance 
});
