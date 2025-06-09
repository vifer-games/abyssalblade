// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ------------ 1) PARTICLES BACKGROUND ------------
  const container = document.querySelector('.particles');
  if (container) {
    for (let i = 0; i < 75; i++) {
      const dot = document.createElement('div');
      dot.className = 'particle';
      dot.style.left = Math.random() * 100 + 'vw';
      dot.style.bottom = '-' + Math.random() * 100 + 'px';
      dot.style.animationDelay = (Math.random() * 18) + 's';
      dot.style.opacity = Math.random();
      container.appendChild(dot);
    }
  }

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


  // 3) “Custom Poster + Play” logic for the trailer
  const wrapper = document.querySelector('.video-wrapper');
  const poster  = document.querySelector('.video-poster');
  const btn     = document.querySelector('.video-play-btn');
  const videoEl = document.querySelector('.video-element');

  if (wrapper && poster && btn && videoEl) {
    function launchTrailer() {
      poster.style.display = 'none';
      btn.style.display    = 'none';
      videoEl.style.display = 'block';
      videoEl.play().catch(err => {
        console.warn('Video playback prevented:', err);
      });
    }
    poster.addEventListener('click', launchTrailer);
    btn.addEventListener('click', launchTrailer);

    videoEl.addEventListener('ended', () => {
      poster.style.display = 'block';
      btn.style.display    = 'block';
      videoEl.style.display = 'none';
      videoEl.currentTime = 0;
    });
  }


  // ------------ 4) CAROUSEL LOGIC ------------
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

  // ------------ 5) PLAY NOW BUTTON REDIRECT ------------
  const playNowBtn = document.querySelector('.cta-btn');
  if (playNowBtn) {
    playNowBtn.addEventListener('click', () => {
      window.location.href = "https://store.steampowered.com/app/3681370/ABYSSAL_BLADE/";
    });
  }
});
