/* =====================================================
   MOBILE-MENU.JS - Đức Nguyễn Watch
   Nhúng vào CUỐI <body> (trước </body>) ở tất cả các trang
   ===================================================== */

(function () {

    /* 1. Tạo nút hamburger và overlay nếu chưa có */
    function initMobileMenu() {
        const header = document.querySelector('.main-header');
        const navMenu = document.querySelector('.nav-menu');
        if (!header || !navMenu) return;

        /* Tạo nút hamburger */
        if (!document.querySelector('.hamburger-btn')) {
            const btn = document.createElement('button');
            btn.className = 'hamburger-btn';
            btn.setAttribute('aria-label', 'Mở menu');
            btn.innerHTML = '<span></span><span></span><span></span>';
            /* Chèn vào header, trước .header-icons */
            const icons = header.querySelector('.header-icons');
            header.insertBefore(btn, icons);

            /* Tạo overlay */
            const overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);

            /* Xử lý sự kiện */
            btn.addEventListener('click', function () {
                btn.classList.toggle('open');
                navMenu.classList.toggle('open');
                overlay.classList.toggle('show');
                document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
            });

            overlay.addEventListener('click', function () {
                btn.classList.remove('open');
                navMenu.classList.remove('open');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            });

            /* Đóng menu khi bấm link */
            navMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    btn.classList.remove('open');
                    navMenu.classList.remove('open');
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    /* 2. Header scroll effect (giống code cũ, gộp chung vào đây) */
    function initHeaderScroll() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* 3. Search box toggle (giống code cũ) */
    function initSearchToggle() {
        const searchBtn = document.getElementById('search-btn');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.getElementById('search-input');
        if (!searchBtn || !searchBox) return;

        searchBtn.addEventListener('click', function () {
            searchBox.classList.toggle('active');
            searchBtn.classList.toggle('active');
            if (searchBox.classList.contains('active') && searchInput) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
                searchBtn.classList.remove('active');
            }
        });
    }

    /* Khởi chạy */
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        initHeaderScroll();
        initSearchToggle();
    });

})();
