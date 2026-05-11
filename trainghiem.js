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
if (header) {
    window.addEventListener('scroll', function() {
        // Nếu cuộn xuống quá 50px
        if (window.scrollY > 50) {
            // Lệnh mặc quần áo đen (thêm class scrolled)
            header.classList.add('scrolled');
        } else {
            // Lệnh cởi quần áo đen (xóa class scrolled) về lại trong suốt
            header.classList.remove('scrolled');
        }
    });
}
// Cập nhật badge giỏ hàng khi trang load
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('ducnguyen_cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalQty;
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);