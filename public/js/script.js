document.querySelectorAll('.nav-links-all button').forEach(button => {
    button.addEventListener('click', function () {
        // 1. Remove the active class from all buttons in the nav
        document.querySelectorAll('.nav-links-all button').forEach(btn => {
            btn.classList.remove('nav-active');
        });

        // 2. Add the active class to the clicked button
        this.classList.add('nav-active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links-all');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active-menu');
    });

    // Close menu when clicking anywhere else on the screen
    document.addEventListener('click', () => {
        navLinks.classList.remove('active-menu');
    });
});



// Initialize Lucide icons
if (window.lucide) {
    lucide.createIcons();
}

// 1. Define separate data for each page
const DATA_CONFIG = {
    temples: [
        { id: 1, name: "Kashi Vishwanath", url: "https://i.pinimg.com/736x/f2/a8/af/f2a8af861492d9c4a7408329ad777858.jpg" },
        { id: 2, name: "Ram Mandir", url: "https://i.pinimg.com/736x/7e/52/b5/7e52b50a7e03fe660cbf33cd5c32878f.jpg" },
        { id: 3, name: "Brihadeeswara", url: "https://i.pinimg.com/736x/e4/ab/52/e4ab52256ed3c3697e34a2a7ca520fcd.jpg" },
        { id: 4, name: "Shore Temple", url: "https://i.pinimg.com/1200x/dd/fd/4b/ddfd4b5addf7e7300df3fabe132cd8ee.jpg" },
        { id: 5, name: "Meenakshi Amman", url: "https://i.pinimg.com/1200x/ec/50/20/ec50201edee5fe7b6425c98db6fe8806.jpg" },
        { id: 6, name: "Golden Temple", url: "https://i.pinimg.com/736x/e3/14/dc/e314dc526f0558163b93f88221a547d0.jpg" },
        { id: 7, name: "Banke Bihari", url: "https://images.weserv.nl/?url=i.pinimg.com/originals/94/55/7b/94557b77b681154618df4c00fab3a683.jpg" }
    ],
    mosques: [
        { name: "Al-Masjid an-Nabawi", url: "https://image2url.com/r2/default/images/1775034945896-6478a2fc-afec-498d-87b0-e4e3120e7e5d.jpeg" }, // m1.jpeg
        { name: "Grand Mosque Night", url: "https://image2url.com/r2/default/images/1775035174745-ffa2cfbc-c423-4a33-a331-040c0c8f2f1e.jpeg" }, // m2.jpeg
        { name: "The Green Dome", url: "https://image2url.com/r2/default/images/1775035240714-b2c50812-cf00-4f2a-a264-da5e30699c08.jpeg" },    // m3.jpeg
        { name: "The Holy Kaaba", url: "https://image2url.com/r2/default/images/1775035269796-cef23b33-a9d1-4b84-9bbd-9eb809171396.jpeg" },    // m4.jpeg
        { name: "Sheikh Zayed View", url: "https://image2url.com/r2/default/images/1775035289660-555665ef-9893-46e1-acd7-c9f00c0eb962.jpeg" },  // m5.jpeg
        { name: "Songkhla Central Mosque", url: "https://i.pinimg.com/736x/5a/6c/ff/5a6cffb37d79f2573094bc3f8f9a9e22.jpg" }, // m6.jpeg
        { name: "Putra Mosque", url: "https://i.pinimg.com/1200x/b3/50/22/b35022908ea204f6b303cde54e7c6378.jpg" } // m7.jpeg
    ],
    churches: [
        { id: 1, name: "Santhome Cathedral Basilica", url: "https://image2url.com/r2/default/files/1775035279537-5377a862-536e-46e8-b3eb-98f50886e027.jpeg" },
        { id: 2, name: "St. Philomena’s Cathedral", url: "https://image2url.com/r2/default/files/1775035499647-eb1ab2f1-72ff-44f6-9a17-c3b65ca52634.jpeg" },
        { id: 3, name: "All Saints Cathedral", url: "https://image2url.com/r2/default/files/1775035542123-eb9a2db1-4eba-4046-baca-021bd6c4c1b1.jpeg" },
        { id: 4, name: "Medak Cathedral", url: "https://image2url.com/r2/default/files/1775035592377-50eb51f8-dab8-4926-a248-7d530f67a0b4.jpeg" },
        { id: 5, name: "St. Paul’s Cathedral", url: "https://image2url.com/r2/default/files/1775035746363-d7b13c06-7a5f-4c39-bf7a-0d0f6c56c1d9.jpeg" },
        { id: 6, name: "St. Joseph's Cathedral", url: "https://i.pinimg.com/1200x/d9/7c/8c/d97c8c8b65085fd74177fb77c60aedd7.jpg" },
        { id: 7, name: "Sumi Baptist church", url: "https://i.pinimg.com/1200x/e4/a4/59/e4a459d5028180e438877948d2eec188.jpg" }
    ]
};

// 2. Logic to detect current page and select images
function getActiveImages() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes('mosque')) return DATA_CONFIG.mosques;
    if (path.includes('church')) return DATA_CONFIG.churches;

    // Default to temples if it's the temple page or any other page
    return DATA_CONFIG.temples;
}

const IMAGES_TO_SHOW = getActiveImages();
let currentIndex = 0;
let carouselElements = [];

function getPositionClass(index) {
    const relativeIndex = (index - currentIndex + IMAGES_TO_SHOW.length) % IMAGES_TO_SHOW.length;
    if (relativeIndex === 0) return 'center';
    if (relativeIndex === 1) return 'right-1';
    if (relativeIndex === 2) return 'right-2';
    if (relativeIndex === IMAGES_TO_SHOW.length - 1) return 'left-1';
    if (relativeIndex === IMAGES_TO_SHOW.length - 2) return 'left-2';
    return 'hidden-item';
}

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    track.innerHTML = '';
    carouselElements = IMAGES_TO_SHOW.map((image, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${getPositionClass(index)}`;
        item.onclick = () => {
            currentIndex = index;
            updateCarousel();
        };

        item.innerHTML = `
            <div class="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group cursor-pointer">
                <img src="${image.url}" alt="${image.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 class="text-white font-headline text-xl">${image.name}</h3>
                </div>
            </div>
        `;
        track.appendChild(item);
        return item;
    });
}

function updateCarousel() {
    carouselElements.forEach((el, index) => {
        el.classList.remove('center', 'left-1', 'right-1', 'left-2', 'right-2', 'hidden-item');
        el.classList.add(getPositionClass(index));
    });
}

// 3. Execution on load
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();

    // Auto-rotate every 3.5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % IMAGES_TO_SHOW.length;
        updateCarousel();
    }, 3500);
});

// search bar logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select your specific search input by its ID
    const searchInput = document.getElementById('search-input');
    
    // 2. Target the state-wise containers (the div that wraps the H2 and the Grid)
    // In your code, this is the div with class "mb-16"
    const stateSections = document.querySelectorAll('.mb-16');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            stateSections.forEach(section => {
                let sectionHasVisibleCards = false;

                // Find the state name (the H2)
                const stateHeader = section.querySelector('h2');
                const stateName = stateHeader ? stateHeader.textContent.toLowerCase() : "";

                // Find all cards inside this state's grid
                const cards = section.querySelectorAll('.grid > div');

                cards.forEach(card => {
                    // Extract text from the card to check against search
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const city = card.querySelector('.card-city').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();

                    // Logic: Match if query is in Title, City, Description OR the State Name
                    const isMatch = title.includes(query) || 
                                    city.includes(query) || 
                                    description.includes(query) ||
                                    stateName.includes(query);

                    if (isMatch) {
                        card.style.display = 'flex'; // Show card
                        sectionHasVisibleCards = true;
                    } else {
                        card.style.display = 'none'; // Hide card
                    }
                });

                // Section visibility:
                // Hide the entire state section if no cards match.
                // If the query matches the state name, show everything in that state.
                if (sectionHasVisibleCards || stateName.includes(query)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
});

// ---Read more complete details---

// Add 'mapLink' as the 5th parameter
// Add 'timing' as the 6th parameter
function openTempleModal(title, image, location, description, mapLink, timing) {
    const modal = document.getElementById('templeModal');
    const mapBtn = document.getElementById('modalMapLink');
    const modalImg = document.getElementById('modalImage');

    // 1. Populate Text Data
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalLocationLabel').innerText = location;
    document.getElementById('modalDescription').innerText = description;
    
    // 2. Handle Timing: Replace '&' with '<br>' using JS
    const timingElement = document.getElementById('modalTiming');
    if (timingElement) {
        timingElement.innerHTML = (timing || "").replace('&', '<br>');
    }
    
    // 3. Set the Map Link
    if (mapBtn) {
        mapBtn.href = mapLink || "#"; 
    }

    // 4. Handle Image and Modal Visibility
    if (image && image !== "" && image !== "undefined") {
        modalImg.src = image;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Hide navbars (Your existing logic)
    const topNav = document.getElementById('main-header');
    const bottomNav = document.getElementById('bottom-nav');
    if (topNav) topNav.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';

    document.body.style.overflow = 'hidden';
}

function closeTempleModal() {
    const modal = document.getElementById('templeModal');
    const topNav = document.getElementById('main-header');
    const bottomNav = document.getElementById('bottom-nav');

    // 1. Hide Modal
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    // 2. SHOW BOTH NAV BARS
    if (topNav) topNav.style.display = 'block'; // Header is usually block
    if (bottomNav) bottomNav.style.display = 'flex'; // Your bottom nav is flex

    // 3. Restore Scrolling
    document.body.style.overflow = 'auto';
}

// 4. Click outside the card to close
const modalOverlay = document.getElementById('templeModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        // If the click is on the darkened background and not the white card
        if (e.target === modalOverlay) {
            closeTempleModal();
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById('templeModal');
        if (!modal.classList.contains('hidden')) {
            closeTempleModal();
        }
    }
});







