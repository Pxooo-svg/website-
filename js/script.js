/* =========================================================================
   SCRIPT.JS — Website SMA Negeri Contoh
   Semua interaktivitas sederhana ada di sini. Setiap bagian diberi komentar
   supaya mudah diubah sendiri.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------------------------------------
     1) Tandai menu navbar yang aktif sesuai halaman yang sedang dibuka
  ----------------------------------------------------------------------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-custom .nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* -----------------------------------------------------------------------
     2) Animasi "fade up" saat elemen muncul di layar (scroll reveal)
  ----------------------------------------------------------------------- */
  const faders = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && faders.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -----------------------------------------------------------------------
     3) Angka statistik berjalan naik (counter) di Beranda
  ----------------------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach(function (counter) {
    const target = parseInt(counter.getAttribute("data-counter"), 10);
    let started = false;

    const run = function () {
      if (started) return;
      started = true;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current.toLocaleString("id-ID");
      }, 20);
    };

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(); obs.unobserve(counter); }
        });
      }, { threshold: 0.4 });
      obs.observe(counter);
    } else {
      run();
    }
  });

  /* -----------------------------------------------------------------------
     4) Validasi sederhana untuk Formulir PPDB (halaman ppdb.html)
     Catatan: ini baru validasi di sisi tampilan (front-end).
     Untuk benar-benar menyimpan data pendaftar, formulir ini perlu
     dihubungkan ke server / database (PHP + MySQL), lihat catatan
     di bagian bawah ppdb.html.
  ----------------------------------------------------------------------- */
  const ppdbForm = document.getElementById("formPPDB");
  if (ppdbForm) {
    ppdbForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const alertBox = document.getElementById("ppdbAlert");
      const requiredFields = ppdbForm.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = "var(--color-red)";
        } else {
          field.style.borderColor = "var(--color-sage)";
        }
      });

      if (!valid) {
        alertBox.className = "alert alert-danger mt-3";
        alertBox.textContent = "Mohon lengkapi semua kolom bertanda (*) sebelum mengirim formulir.";
        alertBox.classList.remove("d-none");
        return;
      }

      alertBox.className = "alert alert-success mt-3";
      alertBox.textContent = "Terima kasih! Pendaftaran berhasil dikirim. Panitia PPDB akan menghubungi Anda melalui email/WhatsApp yang tercantum.";
      alertBox.classList.remove("d-none");
      ppdbForm.reset();
    });
  }

  /* -----------------------------------------------------------------------
     5) Filter galeri berdasarkan kategori (halaman galeri.html)
  ----------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll("[data-filter]");
  const galeriItems = document.querySelectorAll(".galeri-item");
  if (filterButtons.length && galeriItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        galeriItems.forEach(function (item) {
          const category = item.getAttribute("data-category");
          const show = filter === "semua" || filter === category;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

});
