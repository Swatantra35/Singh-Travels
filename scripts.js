// ================================
// Singh Tour & Travels
// Premium JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // Current Year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ==========================
  // Sticky Header
  // ==========================

  const header = document.getElementById("siteHeader");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ==========================
  // Mobile Menu & Overlay
  // ==========================

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");

  function toggleMenu() {
    const isOpen = nav.classList.toggle("open");
    hamburger.classList.toggle("active");
    if (navOverlay) navOverlay.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    nav.classList.remove("open");
    hamburger.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  // ==========================
  // Smooth Scroll
  // ==========================

  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }

      closeMenu();
    });
  });
  // ==========================
  // Hero Slider
  // ==========================

  const slides = document.querySelectorAll(".hero-slide");

  let current = 0;

  function slider() {
    slides.forEach((s) => s.classList.remove("is-active"));

    current++;

    if (current >= slides.length) {
      current = 0;
    }

    slides[current].classList.add("is-active");
  }

  setInterval(slider, 5000);

  // ==========================
  // Reveal Animation
  // ==========================

  const reveals = document.querySelectorAll(".reveal,.reveal-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  reveals.forEach((item) => observer.observe(item));

  // ==========================
  // Counter Animation
  // ==========================

  const stats = document.querySelectorAll(".stat span");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      const txt = el.innerText;

      const number = parseInt(txt.replace(/\D/g, ""));

      if (isNaN(number)) return;

      let count = 0;

      const step = Math.ceil(number / 80);

      function update() {
        count += step;

        if (count < number) {
          el.innerText = txt.replace(number, count);

          requestAnimationFrame(update);
        } else {
          el.innerText = txt;
        }
      }

      update();

      counterObserver.unobserve(el);
    });
  });

  stats.forEach((stat) => counterObserver.observe(stat));

  // ==========================
  // Testimonial Slider
  // ==========================

  const track = document.getElementById("testimonialTrack");
  const prev = document.getElementById("testimonialPrev");
  const next = document.getElementById("testimonialNext");
  const dots = document.getElementById("testimonialDots");

  if (track) {
    const cards = [...track.children];

    let index = 0;

    cards.forEach((card, i) => {
      const dot = document.createElement("button");

      if (i === 0) dot.classList.add("active");

      dots.appendChild(dot);
    });

    const dotBtns = [...dots.children];

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;

      dotBtns.forEach((d) => d.classList.remove("active"));

      dotBtns[index].classList.add("active");
    }

    next.onclick = () => {
      index = (index + 1) % cards.length;

      updateSlider();
    };

    prev.onclick = () => {
      index = (index - 1 + cards.length) % cards.length;

      updateSlider();
    };

    dotBtns.forEach((dot, i) => {
      dot.onclick = () => {
        index = i;

        updateSlider();
      };
    });

    setInterval(() => {
      index = (index + 1) % cards.length;

      updateSlider();
    }, 6000);
  }

  // ==========================
  // Enquiry Form (WhatsApp Booking)
  // ==========================

  const form = document.getElementById("enquiryForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameEl = document.getElementById("name");
      const phoneEl = document.getElementById("phone");
      const pickupEl = document.getElementById("pickup");
      const destinationEl = document.getElementById("destination");
      const dateEl = document.getElementById("date");
      const carTypeEl = document.getElementById("carType");

      const name = nameEl ? nameEl.value.trim() : "";
      const phone = phoneEl ? phoneEl.value.trim() : "";
      const pickup = pickupEl ? pickupEl.value.trim() : "Varanasi";
      const destination = destinationEl ? destinationEl.value.trim() : "Local / Outstation";
      const date = dateEl ? dateEl.value : "As soon as possible";
      const car = carTypeEl ? carTypeEl.value : "Any Car";

      if (!name || name.length < 2) {
        alert("Please enter your full name.");
        if (nameEl) nameEl.focus();
        return;
      }

      if (!phone || phone.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        if (phoneEl) phoneEl.focus();
        return;
      }

      const whatsappText = `*NEW BOOKING REQUEST - SINGH TRAVELS*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Pickup:* ${pickup}
🚩 *Destination:* ${destination}
📅 *Travel Date:* ${date}
🚗 *Vehicle Chosen:* ${car}`;

      const waUrl = "https://api.whatsapp.com/send?phone=918960942111&text=" + encodeURIComponent(whatsappText);

      // Open WhatsApp directly
      window.location.href = waUrl;

      const success = document.getElementById("formSuccess");
      if (success) {
        success.style.display = "block";
      }

      form.reset();
    });
  }

  // ==========================
  // Back To Top
  // ==========================

  const topBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
});
// window.addEventListener("load", () => {
//   const preloader = document.getElementById("preloader");

//   if (preloader) {
//     preloader.classList.add("loaded");

//     setTimeout(() => {
//       preloader.remove();
//     }, 1600);
//   }
// });
