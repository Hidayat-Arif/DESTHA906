// Data global
const data = {
  members: [
    { name: 'Ghifari - Ngenes', role: 'Ketua', img: 'anggota/ghifari.png' },
    { name: 'Adinda - Rembes', role: 'Wakil', img: 'anggota/adinda.png' },
    { name: 'Aulia - Nampek', role: 'Bendahara', img: 'anggota/aulia.png' },
    { name: 'Natasya - Badas', role: 'Sekretaris', img: 'anggota/natasya.png' },
    { name: 'Naura - Teteg', role: 'Sekretaris', img: 'anggota/naura.png' },
    { name: 'Syarif - Ambles', role: 'Koordinator Humas', img: 'anggota/syarif.png' },
    { name: 'Alvi - Padang', role: 'Humas', img: 'anggota/alvi.png' },
    { name: 'Fadel - Mobat', role: 'Humas', img: 'anggota/fadel.png' },
    { name: 'Alfa - Mabit', role: 'Humas', img: 'anggota/alex.png' },
    { name: 'Juliant - Klemer', role: 'Humas', img: 'anggota/alva.png' },
    { name: 'Kenzie - Kole', role: 'Humas', img: 'anggota/kenzie.png' },
    { name: 'Nana - Apes', role: 'Kesehatan', img: 'anggota/nana.png' },
    { name: 'Fatma - Camul', role: 'Kesehatan', img: 'anggota/kanaya.png' },
    { name: 'Laili - Anyes', role: 'Project Manager', img: 'anggota/laili.png' },
    { name: 'Kanaya - Deres', role: 'Bawahan Manager', img: 'anggota/kanaya.png' },
  ],
  stats: { members: 124, hikes: 58 },
  events: [
    { title: 'Ulang tahun DESTHA 906', date: '2025-09-13', place: 'Agro Edu Park' },
    { title: 'Campcer Gunung Merbabu', date: '2025-10-17', place: 'Gunung Merbabu' },
    { title: 'Pradiksar', date: '2025-11-01', place: 'Andong Via Pendem' }
  ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  let currentImageIndex = 0;
  const carouselImages = document.querySelectorAll('.carousel-img');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (carouselImages.length > 0) {
    // Show image function
    function showImage(index) {
      carouselImages.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      carouselImages[index].classList.add('active');
      dots[index].classList.add('active');
      currentImageIndex = index;
    }

    // Next image
    function nextImage() {
      let nextIndex = (currentImageIndex + 1) % carouselImages.length;
      showImage(nextIndex);
    }

    // Previous image
    function prevImage() {
      let prevIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      showImage(prevIndex);
    }

    // Button click events
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    // Dot click events
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showImage(index);
      });
    });

    // Auto rotate carousel every 5 seconds
    setInterval(nextImage, 5000);
  }
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Update stats
  const statMembers = document.getElementById('statMembers');
  const statHikes = document.getElementById('statHikes');
  if (statMembers) statMembers.textContent = data.stats.members;
  if (statHikes) statHikes.textContent = data.stats.hikes;

  // Populate members preview on home page
  const membersPreview = document.getElementById('membersPreview');
  if (membersPreview) {
    data.members.slice(0, 2).forEach(m => {
      const card = createMemberCard(m);
      membersPreview.appendChild(card);
    });
  }

  // Populate full members grid on members page
  const membersGrid = document.getElementById('membersGrid');
  if (membersGrid) {
    data.members.forEach(m => {
      const card = createMemberCard(m);
      membersGrid.appendChild(card);
    });

    // Add filter functionality
    createMemberFilters();
  }

  // Populate recent members on dashboard
  const recentMembers = document.getElementById('recentMembers');
  if (recentMembers) {
    data.members.slice(0, 6).forEach(m => {
      const card = createMemberCard(m);
      recentMembers.appendChild(card);
    });
  }

  // Populate events
  const eventsList = document.getElementById('eventsList');
  if (eventsList) {
    data.events.forEach((ev, idx) => {
      const eventEl = document.createElement('div');
      eventEl.style.cssText = `
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
        background: #f5f1e8;
        border-radius: 12px;
        border-left: 4px solid #ff9800;
      `;
      eventEl.innerHTML = `
        <div style="color: #ff9800; font-weight: bold; font-size: 1.2rem;">${idx + 1}</div>
        <div>
          <h4 style="margin: 0 0 0.3rem 0; color: #3d6b4a;">${ev.title}</h4>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">📅 ${formatDate(ev.date)} — 📍 ${ev.place}</p>
        </div>
      `;
      eventsList.appendChild(eventEl);
    });
  }

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }
});

// Helper function to create member card
function createMemberCard(member) {
  const card = document.createElement('div');
  card.className = 'member-card';
  card.innerHTML = `
    <img class="member-photo" src="${member.img}" alt="Foto ${member.name}">
    <div class="member-info">
      <h4>${member.name}</h4>
      <p>${member.role}</p>
    </div>
  `;
  return card;
}

// Helper function to format date
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
}

// Create member filters (by role)
function createMemberFilters() {
  const filterContainer = document.getElementById('filterContainer');
  if (!filterContainer) return;

  // Get unique roles
  const roles = ['Semua', ...new Set(data.members.map(m => m.role))];

  const allBtn = document.createElement('button');
  allBtn.className = 'btn btn-primary';
  allBtn.textContent = 'Semua';
  allBtn.style.cssText = 'margin-bottom: 0;';
  allBtn.addEventListener('click', () => filterMembers('Semua'));
  filterContainer.appendChild(allBtn);

  roles.slice(1).forEach(role => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.textContent = role;
    btn.style.cssText = 'margin-bottom: 0;';
    btn.addEventListener('click', () => filterMembers(role));
    filterContainer.appendChild(btn);
  });
}

// Filter members by role
function filterMembers(role) {
  const membersGrid = document.getElementById('membersGrid');
  if (!membersGrid) return;

  membersGrid.innerHTML = '';
  
  const filtered = role === 'Semua' 
    ? data.members 
    : data.members.filter(m => m.role === role);

  filtered.forEach(m => {
    const card = createMemberCard(m);
    membersGrid.appendChild(card);
  });
}

// Active nav link
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index-new.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index-new.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
