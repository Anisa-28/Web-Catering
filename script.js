document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle){
    toggle.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position='absolute';
      links.style.top='70px';
      links.style.left='0';
      links.style.right='0';
      links.style.background='#fff';
      links.style.padding='20px 30px';
      links.style.boxShadow='0 8px 20px rgba(0,0,0,.08)';
    });
  }

  /* Snack package "Lihat Detail" toggle */
  const detailToggles = document.querySelectorAll('.detail-toggle');
  const snackDetail = document.getElementById('snack-detail');
  const snackDetailTitle = document.getElementById('snack-detail-title');
  const pkgLabels = { hemat:'Paket Hemat', reguler:'Paket Reguler', premium:'Paket Premium' };
  let activePkg = null;

  detailToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.dataset.pkg;

      if(activePkg === pkg){
        /* collapse if clicking the already-open package again */
        snackDetail.classList.remove('open');
        btn.innerHTML = 'Lihat Detail &rarr;';
        activePkg = null;
        return;
      }

      /* reset all button labels */
      detailToggles.forEach(b => b.innerHTML = 'Lihat Detail &rarr;');

      /* show the matching combo grid, hide the rest */
      snackDetail.querySelectorAll('.combo-grid').forEach(g => {
        g.style.display = (g.id === 'combo-' + pkg) ? '' : 'none';
      });
      snackDetailTitle.textContent = 'Pilihan Kombinasi Snack — ' + pkgLabels[pkg];

      snackDetail.classList.add('open');
      btn.innerHTML = 'Tutup Detail &uarr;';
      activePkg = pkg;

      setTimeout(() => {
        snackDetail.scrollIntoView({behavior:'smooth', block:'nearest'});
      }, 150);
    });
  });

  /* Gallery filter */
  const chips = document.querySelectorAll('.chip');
  const galItems = document.querySelectorAll('.gal-item');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.filter;
      galItems.forEach(item => {
        if(cat === 'semua' || item.dataset.cat === cat){
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* FAQ accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  /* Testimonial dots (visual only) */
  const dots = document.querySelectorAll('.dots span');
  dots.forEach((dot,i) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  /* Hero circular menu carousel (added) */
  const hcc = document.getElementById('heroCarousel');
  if(hcc){
    const hccImages = ['assets/images/menu1.png','assets/images/menu2.png','assets/images/menu3.png','assets/images/menu4.png'];
    const hccSlots = Array.from(hcc.querySelectorAll('.hcc-slot'));
    const hccCenterImg = document.getElementById('hccCenterImg');
    const hccDotsWrap = document.getElementById('hccDots');
    let hccActive = 0;

    hccImages.forEach((_, i) => {
      const d = document.createElement('span');
      if(i === hccActive) d.classList.add('active');
      d.addEventListener('click', () => { hccGoTo(i); });
      hccDotsWrap.appendChild(d);
    });
    const hccDotEls = Array.from(hccDotsWrap.children);

    function hccRender(){
      hccSlots.forEach(slot => {
        const slotIndex = parseInt(slot.dataset.slot, 10);
        const offset = slotIndex - 2; /* slot 2 = top/active position */
        const imgIndex = ((hccActive + offset) % hccImages.length + hccImages.length) % hccImages.length;
        const img = slot.querySelector('img');
        img.src = hccImages[imgIndex];
        slot.classList.toggle('active', offset === 0);
      });
      hccCenterImg.style.opacity = 0;
      setTimeout(() => {
        hccCenterImg.src = hccImages[hccActive];
        hccCenterImg.style.opacity = 1;
      }, 120);
      hccDotEls.forEach((d,i) => d.classList.toggle('active', i === hccActive));
    }

    function hccGoTo(index){
      hccActive = ((index % hccImages.length) + hccImages.length) % hccImages.length;
      hccRender();
    }

    function hccNext(){ hccGoTo(hccActive + 1); }
    function hccPrev(){ hccGoTo(hccActive - 1); }

    document.getElementById('hccNext').addEventListener('click', hccNext);
    document.getElementById('hccPrev').addEventListener('click', hccPrev);

    hccSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        const slotIndex = parseInt(slot.dataset.slot, 10);
        hccGoTo(hccActive + (slotIndex - 2));
      });
    });

    /* Autoplay dinonaktifkan: foto menu hanya berpindah saat
       tombol panah (atau titik/foto menu) diklik oleh pengguna. */
    hccRender();
  }
/* ===================== Testimonial Swiper ===================== */
const testiSwiper = document.querySelector(".testiSwiper");

if (testiSwiper) {
  new Swiper(".testiSwiper", {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
}
});
