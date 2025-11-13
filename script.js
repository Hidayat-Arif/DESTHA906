
// Populate dashboard stats
document.addEventListener('DOMContentLoaded', () => {
  const data = {
    members: [
      { name: 'Ghifari - Ngenes', role: 'Ketua', img: 'https://i.pravatar.cc/120?img=12' },
      { name: 'Adinda - Rembes', role: 'Wakil', img: 'https://i.pravatar.cc/120?img=2' },
      { name: 'Aulia - Nampek', role: 'Bendahara', img: 'https://i.pravatar.cc/120?img=4' },
      { name: 'Natasya - Badas', role: 'Sekretaris', img: 'https://i.pravatar.cc/120?img=3' },
      { name: 'Naura - Teteg', role: 'Sekretaris', img: 'https://i.pravatar.cc/120?img=3' },
      { name: 'Syarif - Ambles ', role: 'Koordinator Humas', img: 'https://i.pravatar.cc/120?img=6' },
      { name: 'Alvi - Padang', role: 'Humas', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Fadel - Mobat', role: 'Humas', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Alfa - Mabit', role: 'Humas', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Juliant - Klemer', role: 'Humas', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Kenzie - Kole', role: 'Humas', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Nana - Apes', role: 'Kesehatan', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Fatma - Camul', role: 'Kesehatan', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Laili - Anyes', role: 'Project Manager', img: 'https://i.pravatar.cc/120?img=7' },
      { name: 'Kanaya - Deres', role: 'Bawahan Manager', img: 'https://i.pravatar.cc/120?img=7' },
    ],
    stats: { members: 124, hikes: 58 },
    events: [
      { title: 'Ulang tahun DESTHA 906', date: '2025-9-13', place: 'Agro Edu Park' },
      { title: 'Campcer Gunung Merbabu', date: '2025-10-17', place: 'Gunung Merbabu' },
      { title: 'Pradiksar', date: '2025-11-1', place: 'Andong Via Pendem' }
    ],
    activities: [
      'Pendakian dan eksplorasi gunung secara bertanggung jawab.',
      'Program restorasi hutan dan penanaman pohon.',
      'Edukasi keselamatan lapang dan navigasi bagi anggota baru.'
    ]
  };

  // Dashboard stats
  document.getElementById('statMembers').textContent = data.stats.members;
  document.getElementById('statHikes').textContent = data.stats.hikes;

  // Events
  const eventsList = document.getElementById('eventsList');
  data.events.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'event';
    el.innerHTML = `<div class="dot"></div><div><strong>${ev.title}</strong><div class="muted">${ev.date} — ${ev.place}</div></div>`;
    eventsList.appendChild(el);
  });

  // Members
  const membersGrid = document.getElementById('membersGrid');
  data.members.forEach(m => {
    const card = document.createElement('article');
    card.className = 'member-card card';
    card.innerHTML = `<img class="member-photo" src="${m.img}" alt="Foto ${m.name}"><div class="member-info"><h4>${m.name}</h4><p>${m.role}</p></div>`;
    membersGrid.appendChild(card);
  });

  // Typewriter animation (About section)
  const activityText = document.getElementById('activityText');
  let actIdx = 0, charIdx = 0;
  setInterval(() => {
    const full = data.activities[actIdx];
    if (charIdx <= full.length) {
      activityText.textContent = full.slice(0, charIdx);
      charIdx++;
    } else {
      setTimeout(() => {
        charIdx = 0;
        actIdx = (actIdx + 1) % data.activities.length;
      }, 1000);
    }
  }, 50);

  // Members preview in hero
  const membersPreview = document.getElementById('membersPreview');
  if (membersPreview) {
    data.members.slice(0, 2).forEach(m => {
      const card = document.createElement('article');
      card.className = 'member-card card';
      card.innerHTML = `<img class="member-photo" src="${m.img}" alt="Foto ${m.name}"><div class="member-info"><h4>${m.name}</h4><p>${m.role}</p></div>`;
      membersPreview.appendChild(card);
    });
  const moreWrap = document.createElement('div');
  moreWrap.className = 'more-wrap';
  moreWrap.innerHTML = `<a class="btn ghost" href="#members">Lihat semua anggota</a>`;
    membersPreview.appendChild(moreWrap);
  }

  // Parallax effect (optional, can be removed)
  window.addEventListener('scroll', () => {
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      const sc = window.scrollY;
      heroEl.style.backgroundPosition = `center ${-sc * 0.2}px`;
    }
  }, { passive: true });

  // Update year
  document.getElementById('year').textContent = new Date().getFullYear();
});