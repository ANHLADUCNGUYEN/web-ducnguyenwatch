/* =====================================================
   MOBILE-MENU.JS - Đức Nguyễn Watch
   CHỈ xử lý nút hamburger menu trên mobile.
   Scroll + Search toggle đã có trong JS riêng mỗi trang.
   Nhúng vào CUỐI <body>, TRƯỚC file JS riêng của trang.
   ===================================================== */
 
(function () {
 
    function initMobileMenu() {
        const header = document.querySelector('.main-header');
        const navMenu = document.querySelector('.nav-menu');
        if (!header || !navMenu) return;
 
        /* Tạo nút hamburger */
        const btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.setAttribute('aria-label', 'Mở menu');
        btn.innerHTML = '<span></span><span></span><span></span>';
 
        /* Chèn vào header, trước .header-icons */
        const icons = header.querySelector('.header-icons');
        header.insertBefore(btn, icons);
 
        /* Tạo overlay mờ phía sau menu */
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
 
        function openMenu() {
            btn.classList.add('open');
            navMenu.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
 
        function closeMenu() {
            btn.classList.remove('open');
            navMenu.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
 
        btn.addEventListener('click', function () {
            navMenu.classList.contains('open') ? closeMenu() : openMenu();
        });
 
        /* Bấm overlay thì đóng */
        overlay.addEventListener('click', closeMenu);
         /* Bấm link trong menu thì vẫn chuyển trang bình thường */
        navMenu.querySelectorAll('a').forEach(function (link) {
         link.addEventListener('click', closeMenu);  
        });

    }
 
    document.addEventListener('DOMContentLoaded', initMobileMenu);
 
})();
