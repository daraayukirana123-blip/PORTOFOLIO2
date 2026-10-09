/**
 * Aisyah Dara Ayu Kirana - Portfolio Script
 * Midnight Blueprint Theme Interactivity
 * PPLG SMK Negeri 6 Surakarta
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSectionSpy();
  initCliTerminal();
  initProjectModalsData();
  initAmbientFollower();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL
   ========================================================================== */
function initNavbarScroll() {
  const navDock = document.querySelector('.nav-dock');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navDock.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.15)';
      navDock.style.borderColor = 'rgba(56, 189, 248, 0.25)';
    } else {
      navDock.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
      navDock.style.borderColor = 'var(--border-ghost)';
    }
  });
}

function initSectionSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === currentId) {
        link.classList.add('active');
      }
    });
  });
}

/* Mobile Menu */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const hamburgerIcon = document.getElementById('hamburgerIcon');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    if (isOpen) {
      hamburgerIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      hamburgerIcon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

function closeMobileMenu() {
  if (mobileDrawer) {
    mobileDrawer.classList.remove('open');
  }
  if (hamburgerIcon) {
    hamburgerIcon.classList.replace('fa-xmark', 'fa-bars');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   2. TERMINAL TABS & INTERACTIVE CLI
   ========================================================================== */
window.switchTerminalTab = function(tabName) {
  const tabButtons = document.querySelectorAll('.terminal-tabs .tab-item');
  const tabContents = document.querySelectorAll('.terminal-body .tab-content');

  tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  if (tabName === 'config') {
    document.getElementById('tabContentConfig').classList.add('active');
  } else if (tabName === 'skills') {
    document.getElementById('tabContentSkills').classList.add('active');
  } else if (tabName === 'cli') {
    document.getElementById('tabContentCli').classList.add('active');
    setTimeout(() => {
      const cliInput = document.getElementById('cliInput');
      if (cliInput) cliInput.focus();
    }, 100);
  }
};

function initCliTerminal() {
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');
  if (!cliInput || !cliOutput) return;

  const commands = {
    help: `Daftar perintah yang tersedia:
  - <span class="text-primary font-bold">whoami</span>    : Informasi pengembang
  - <span class="text-primary font-bold">skills</span>    : Ringkasan keahlian teknis
  - <span class="text-primary font-bold">projects</span>  : Daftar proyek unggulan
  - <span class="text-primary font-bold">pkl</span>       : Status ketersediaan magang industri
  - <span class="text-primary font-bold">school</span>    : Info SMK Negeri 6 Surakarta
  - <span class="text-primary font-bold">contact</span>   : Informasi kontak & email
  - <span class="text-primary font-bold">clear</span>     : Bersihkan layar terminal`,

    whoami: `<span class="text-high">Aisyah Dara Ayu Kirana</span> &bull; Siswi Kelas XI/XII PPLG SMK Negeri 6 Surakarta. Berorientasi pada arsitektur web modern, REST APIs, dan antarmuka responsif ramah pengguna.`,

    skills: `<span class="text-tertiary">Frontend:</span> Vue 3, Pinia, TypeScript, Tailwind CSS, HTML5/CSS3
<span class="text-secondary">Backend:</span> Laravel 11, PHP 8.2, Node.js, Express, RESTful API
<span class="text-primary">Database:</span> MySQL, PostgreSQL, Relational DB Schema
<span class="text-high">Tools:</span> Git, GitHub, Postman, Figma, Vite`,

    projects: `1. <span class="text-primary font-bold">SIAKAD SMK</span>: Sistem Informasi Akademik & Presensi Siswa (Laravel + Vue 3)
2. <span class="text-tertiary font-bold">Nusantara Artisan</span>: E-Commerce UMKM Kriya Solo (Vue 3 + Midtrans)
3. <span class="text-secondary font-bold">PerpusSmart</span>: Digital Library & Barcode Scanner Management (Laravel + TS)`,

    pkl: `<span class="text-tertiary font-bold">[TERSEDIA]</span> Siap untuk penempatan Praktik Kerja Lapangan (PKL) periode 2025/2026. Penempatan fleksibel: Surakarta, Yogyakarta, atau Remote. Email: aisyah.dara@smkn6solo.sch.id`,

    school: `<span class="text-high font-bold">SMK Negeri 6 Surakarta (SMK Pusat Keunggulan)</span>
Kompetensi Keahlian: PPLG (Pengembangan Perangkat Lunak dan Gim)
Fokus: Standar industri rekayasa perangkat lunak, Agile mindset, & Clean Coding.`,

    contact: `Email: <a href="mailto:aisyah.dara@smkn6solo.sch.id" class="text-primary">aisyah.dara@smkn6solo.sch.id</a>
GitHub: <a href="https://github.com" target="_blank" class="text-secondary">github.com</a>
Lokasi: Surakarta, Jawa Tengah, Indonesia`
  };

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawVal = cliInput.value.trim();
      const val = rawVal.toLowerCase();
      cliInput.value = '';

      if (!val) return;

      if (val === 'clear') {
        cliOutput.innerHTML = `
          <p class="cli-line text-muted">Aisyah Interactive Terminal (ketik <span class="text-primary font-bold">help</span> untuk panduan)</p>
        `;
        return;
      }

      // Append user command
      const cmdLine = document.createElement('p');
      cmdLine.className = 'cli-line';
      cmdLine.innerHTML = `<span class="text-tertiary">aisyah@smkn6solo:~$</span> ${escapeHtml(rawVal)}`;
      cliOutput.appendChild(cmdLine);

      // Respond
      const respLine = document.createElement('div');
      respLine.className = 'cli-line text-muted';
      respLine.style.whiteSpace = 'pre-wrap';
      respLine.style.margin = '4px 0 8px 0';

      if (commands[val]) {
        respLine.innerHTML = commands[val];
      } else {
        respLine.innerHTML = `<span class="text-red-400">Perintah tidak dikenali: '${escapeHtml(val)}'.</span> Ketik <span class="text-primary font-bold">help</span> untuk daftar perintah.`;
      }

      cliOutput.appendChild(respLine);
      cliOutput.scrollTop = cliOutput.scrollHeight;
    }
  });
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }[s];
  });
}

/* ==========================================================================
   3. TECH STACK FILTERING
   ========================================================================== */
window.filterSkills = function(category) {
  const chips = document.querySelectorAll('.skills-filter-dock .filter-chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-filter') === category);
  });

  const cards = document.querySelectorAll('.skills-grid .skill-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
};

/* ==========================================================================
   4. PROJECT MODALS & DEEP DIVE
   ========================================================================== */
const projectsData = {
  siakad: {
    title: 'Sistem Informasi Akademik & Presensi Digital Siswa (SIAKAD SMK)',
    badge: 'Proyek Capstone Unggulan &bull; Fullstack Web',
    image: 'assets/project_academic.jpg',
    github: 'https://github.com',
    description: `Aplikasi berbasis web yang dirancang khusus untuk memenuhi kebutuhan digitalisasi data absensi harian dan penilaian Kurikulum Merdeka di lingkungan SMK Negeri 6 Surakarta.`,
    highlights: [
      'Otomasi presensi siswa berbasis waktu nyata dengan verifikasi scan barcode kartu pelajar.',
      'Dashboard statistik kehadiran terinci: persentase hadir, izin, sakit, dan alfa per kelas.',
      'Modul penilaian capaian pembelajaran dengan kalkulasi predikat otomatis dan export lembar rapor PDF.',
      'Sistem peran bertingkat (Role-Based Access Control): Super Admin, Guru Mata Pelajaran, Wali Kelas, dan Siswa/Wali.',
      'Arsitektur REST API dengan token sanitasi Laravel Sanctum dan antarmuka komponen Vue 3.'
    ],
    techStack: ['Laravel 11', 'Vue 3 Composition API', 'MySQL Database', 'Tailwind CSS', 'Axios & Pinia', 'DomPDF']
  },
  ecommerce: {
    title: 'Nusantara Artisan — E-Commerce UMKM Kerajinan & Batik Surakarta',
    badge: 'Digitalisasi UMKM Lokal &bull; Frontend & API',
    image: 'assets/project_ecommerce.jpg',
    github: 'https://github.com',
    description: `Platform perdagangan daring yang dibangun untuk memberdayakan perajin lokal di Kota Solo agar produk kriya dan batik asli dapat menjangkau pasar nasional secara profesional.`,
    highlights: [
      'Katalog produk dinamis dengan filter cepat berdasarkan kategori (Batik Tulis, Anyaman Rotan, Ukiran Kayu, dsb).',
      'Pengelolaan keranjang belanja reaktif (Reactive Cart State) tanpa jeda reload dengan Pinia store.',
      'Kalkulator ongkos kirim otomatis dan integrasi prototipe sandbox payment gateway Midtrans.',
      'Panel dashboard analitik ringkas bagi pemilik toko untuk memantau performa penjualan dan produk terpopuler.',
      'Penyusunan kode komponen terisolasi dengan performa build super kencang dari Vite.'
    ],
    techStack: ['Vue 3', 'Pinia State', 'Vite', 'Tailwind CSS', 'Midtrans API Sandbox', 'REST API']
  },
  library: {
    title: 'PerpusSmart — Digital Library & Barcode Management System',
    badge: 'Otomasi Perpustakaan Sekolah &bull; Fullstack Web',
    image: 'assets/project_library.jpg',
    github: 'https://github.com',
    description: `Sistem manajemen sirkulasi buku perpustakaan modern dengan fitur pemindaian barcode langsung menggunakan kamera gawai guna mempercepat antrean peminjaman dan pengembalian.`,
    highlights: [
      'Pencatatan sirkulasi buku super cepat dengan pemindai kamera HTML5 barcode scanner.',
      'Perhitungan otomatis jatuh tempo peminjaman dan kalkulasi denda keterlambatan secara otomatis.',
      'Manajemen nomor ISBN, klasifikasi rak buku, dan riwayat peminjaman per nomor induk siswa (NISN).',
      'Visualisasi grafik tren bacaan terpopuler dan statistik pengunjung bulanan menggunakan Chart.js.',
      'Desain antarmuka gelap (Dark Mode) ergonomis yang nyaman digunakan oleh pustakawan sepanjang hari.'
    ],
    techStack: ['Laravel REST API', 'TypeScript', 'MySQL Database', 'HTML5 Barcode Scanner', 'Chart.js', 'Tailwind CSS']
  }
};

function initProjectModalsData() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}

window.openProjectModal = function(projectId) {
  const data = projectsData[projectId];
  const modal = document.getElementById('projectModal');
  if (!data || !modal) return;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBadge').innerHTML = data.badge;
  document.getElementById('modalGithubBtn').href = data.github;

  const highlightsHtml = data.highlights.map(item => `<li>${item}</li>`).join('');
  const tagsHtml = data.techStack.map(tag => `<span class="tech-pill font-mono">${tag}</span>`).join(' ');

  document.getElementById('modalBody').innerHTML = `
    <img src="${data.image}" alt="${data.title}">
    <p class="text-high">${data.description}</p>
    
    <h4 class="font-bold text-primary">Fitur &amp; Sorotan Arsitektur:</h4>
    <ul>${highlightsHtml}</ul>

    <h4 class="font-bold text-secondary">Teknologi yang Diterapkan:</h4>
    <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.5rem;">
      ${tagsHtml}
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
};

/* ==========================================================================
   5. CONTACT FORM & VALIDATION
   ========================================================================== */
window.handleContactSubmit = function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  subjectError.textContent = '';
  messageError.textContent = '';

  let isValid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Harap isi nama lengkap atau instansi Anda.';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Harap masukkan format alamat email yang valid.';
    isValid = false;
  }

  if (!subjectInput.value) {
    subjectError.textContent = 'Harap pilih tujuan komunikasi.';
    isValid = false;
  }

  if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
    messageError.textContent = 'Pesan terlalu singkat (minimal 10 karakter).';
    isValid = false;
  }

  if (isValid) {
    const btn = document.getElementById('btnSubmitForm');
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      document.getElementById('contactForm').reset();
      showToast('Pesan berhasil terkirim! Terima kasih telah menghubungi Aisyah.', 'success');
    }, 1200);
  }
};

/* ==========================================================================
   6. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check text-tertiary" style="font-size: 1.2rem;"></i>' 
    : '<i class="fa-solid fa-circle-info text-primary" style="font-size: 1.2rem;"></i>';

  toast.innerHTML = `
    ${icon}
    <div style="flex-grow: 1;">${message}</div>
    <button style="background:none; border:none; color:var(--color-text-subtle); cursor:pointer; font-size:1rem;" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

window.handleDownloadCV = function() {
  showToast('Memulai pengunduhan CV Aisyah Dara Ayu Kirana (PDF)...', 'success');
  // In real deployment, triggers actual PDF download
};

/* ==========================================================================
   7. AMBIENT GLOW MOUSE FOLLOWER (MICRO-INTERACTION)
   ========================================================================== */
function initAmbientFollower() {
  const follower = document.createElement('div');
  follower.className = 'mouse-ambient-glow';
  follower.style.cssText = `
    position: fixed;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
    filter: blur(40px);
    display: none;
  `;
  document.body.appendChild(follower);

  if (window.matchMedia('(pointer: fine)').matches) {
    follower.style.display = 'block';
    window.addEventListener('mousemove', (e) => {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    });
  }
}
