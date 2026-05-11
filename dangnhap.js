// Lấy thẻ Nút kính lúp và Khối chứa ô tìm kiếm
const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search-input');

// Bắt sự kiện khi click vào nút kính lúp
searchBtn.addEventListener('click', function() {
    // Thêm/Xóa class 'active' để cuộn ra/cuộn vào ô tìm kiếm
    searchBox.classList.toggle('active');
    searchBtn.classList.toggle('active'); // Đổi màu nút kính lúp
    
    // Nếu thanh tìm kiếm đang mở, tự động đặt trỏ chuột vào để gõ luôn
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
});
// Lấy thẻ Header
const header = document.querySelector('.main-header');

// Bắt sự kiện mỗi khi người dùng cuộn chuột
window.addEventListener('scroll', function() {
    
    // Nếu cuộn xuống quá 50px (bạn có thể thay đổi số này)
    if (window.scrollY > 50) {
        // Thêm class 'scrolled' vào Header
        header.classList.add('scrolled');
    } else {
        // Nếu kéo ngược lên đầu trang, xóa class 'scrolled' đi
        header.classList.remove('scrolled');
    }
    
});
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. CHỨC NĂNG BẬT/TẮT CON MẮT MẬT KHẨU
    // ==========================================
    const togglePasswords = document.querySelectorAll('.toggle-pw');
    togglePasswords.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if(input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                }
            }
        });
    });

    // ==========================================
    // 2. KHAI BÁO CÁC BIẾN CHUNG CHO FORM
    // ==========================================
    const authTabs = document.querySelector('.auth-tabs');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    
    const formLogin = document.getElementById('login-form');
    const formRegister = document.getElementById('register-form');
    const formForgotPw = document.getElementById('forgot-pw-form');

    const linkForgotPw = document.getElementById('link-forgot-pw');
    const linkBackLogin = document.getElementById('link-back-login');

    // ==========================================
    // 3. XỬ LÝ CHUYỂN ĐỔI TAB ĐĂNG NHẬP / ĐĂNG KÝ
    // ==========================================
    if(tabLogin && tabRegister && formLogin && formRegister) {
        // Bấm tab Đăng nhập
        tabLogin.addEventListener('click', function(e) {
            e.preventDefault(); 
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.style.display = 'block';
            formRegister.style.display = 'none';
            if(formForgotPw) formForgotPw.style.display = 'none'; // Đảm bảo form quên MK luôn ẩn
            authTabs.style.display = 'flex'; // Đảm bảo thanh Tab luôn hiện
        });

        // Bấm tab Đăng ký
        tabRegister.addEventListener('click', function(e) {
            e.preventDefault();
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.style.display = 'block';
            formLogin.style.display = 'none';
            if(formForgotPw) formForgotPw.style.display = 'none';
            authTabs.style.display = 'flex';
        });
    }

    // ==========================================
    // 4. XỬ LÝ FORM QUÊN MẬT KHẨU
    // ==========================================
    if(linkForgotPw && linkBackLogin && formForgotPw) {
        
        // Khi bấm vào chữ "Quên mật khẩu?"
        linkForgotPw.addEventListener('click', function(e) {
            e.preventDefault();
            // Ẩn 2 form cũ và thanh Tab
            formLogin.style.display = 'none';
            formRegister.style.display = 'none';
            authTabs.style.display = 'none'; 
            // Hiện form Quên mật khẩu
            formForgotPw.style.display = 'block';
        });

        // Khi bấm chữ "Quay lại Đăng nhập"
        linkBackLogin.addEventListener('click', function(e) {
            e.preventDefault();
            // Ẩn form Quên pass
            formForgotPw.style.display = 'none';
            // Hiện lại Đăng nhập
            authTabs.style.display = 'flex'; 
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.style.display = 'block';
        });

        // Hiệu ứng Hover đổi màu chữ "Quay lại"
        linkBackLogin.addEventListener('mouseover', () => linkBackLogin.style.color = '#fff');
        linkBackLogin.addEventListener('mouseout', () => linkBackLogin.style.color = '#888');
    }

});
// Cập nhật badge giỏ hàng khi trang load
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('ducnguyen_cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalQty;
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);