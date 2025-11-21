/* Shared JS for navigation, lightbox, reveal-on-scroll, and simple contact/booking form behavior */

/* ---------- NAV: mobile toggle ---------- */
function setupNav(hamburgerId, navId) {
    const btn = document.getElementById(hamburgerId);
    const nav = document.getElementById(navId);
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('open');
        if (nav.style.display === 'flex') {
            nav.style.display = '';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.gap = '8px';
        }
    });
}

document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("site-nav").classList.toggle("open");
});

// Attach nav toggles
setupNav('hamburger', 'site-nav');
setupNav('hamburger-2', 'site-nav-2');
setupNav('hamburger-3', 'site-nav-3');
setupNav('hamburger-4', 'site-nav-4');
setupNav('hamburger-5', 'site-nav-5');
setupNav('hamburger-6', 'site-nav-6');
setupNav('hamburger-7', 'site-nav-7');

/* ---------- mark active link based on filename ---------- */
(function markActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(a => {
        if (a.getAttribute('href') === current) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
    // also check other nav copies
    document.querySelectorAll('[id^="site-nav-"] a').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
        else a.classList.remove('active');
    });
})();

/* ---------- REVEAL ON SCROLL ---------- */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowH = window.innerHeight;
    for (let el of reveals) {
        const top = el.getBoundingClientRect().top;
        if (top < windowH - 100) el.classList.add('active');
        else el.classList.remove('active');
    }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

/* ---------- LIGHTBOX (works for gallery thumbs & card images) ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt = '') {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.matches('.card-img img') || target.matches('.gallery-thumb') || target.matches('.person-img img')) {
        openLightbox(target.src, target.alt || '');
    }
});

/* ---------- SIMPLE CONTACT FORM HANDLER (no backend) ---------- */
function validateContact() {
    let valid = true;

    // Reset all errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Values
    let name = document.getElementById("cname").value.trim();
    let email = document.getElementById("cemail").value.trim();
    let message = document.getElementById("cmessage").value.trim();

    // Validation

    if (name === "") {
        document.getElementById("cnameError").textContent = "Name is required.";
        valid = false;
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
        document.getElementById("cemailError").textContent = "Enter a valid email address.";
        valid = false;
    }

    if (message === "") {
        document.getElementById("cmessageError").textContent = "Message cannot be empty.";
        valid = false;
    }

    if (valid) {
        document.getElementById("contact-result").textContent =
            "Your message has been sent successfully!";
    }

    return valid;
}


/* ---------- BOOKING FORM HANDLER (no backend) ---------- */
function validateBooking() {
    let valid = true;

    // Reset all errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Values
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let service = document.getElementById("service").value.trim();
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    // Validation rules

    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required.";
        valid = false;
    }

    if (phone === "" || isNaN(phone) || phone.length !== 11) {
        document.getElementById("phoneError").textContent = "Enter a valid 11-digit phone number.";
        valid = false;
    }

    if (email !== "" && (!email.includes("@") || !email.includes("."))) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        valid = false;
    }

    if (service === "") {
        document.getElementById("serviceError").textContent = "Service field is required.";
        valid = false;
    }

    if (date === "") {
        document.getElementById("dateError").textContent = "Please select a date.";
        valid = false;
    }

    if (time === "") {
        document.getElementById("timeError").textContent = "Please select a time.";
        valid = false;
    }

    // Success message
    if (valid) {
        document.getElementById("booking-result").textContent =
            "Booking request submitted successfully! We will contact you soon.";
    }

    return valid;
}


/* ---------- HERO / CTA shimmer & header visible ---------- */
window.addEventListener('load', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        setTimeout(() => header.classList.add('visible'), 100);
    }
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.toLowerCase().includes('book')) {
            btn.classList.add('shimmer');
        }
    });
});

/* Existing JS remains same up to bottom */

/* ---------- HERO / CTA shimmer & header visible ---------- */
window.addEventListener('load', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        setTimeout(() => header.classList.add('visible'), 100);
    }
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.toLowerCase().includes('book')) {
            btn.classList.add('shimmer');
        }
    });

    // ✨ NEW: Trigger reveal animation on load for visible sections
    document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => {
            const rect = el.getBoundingClientRect().top;
            if (rect < window.innerHeight - 100) {
                el.classList.add('active');
            }
        }, 200 + i * 150);
    });
});

/* Optional: Smooth scroll when clicking anchor links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


    