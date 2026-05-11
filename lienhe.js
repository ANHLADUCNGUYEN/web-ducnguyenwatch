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
    
    // Xử lý bộ đếm ký tự cho Textarea trong trang Liên hệ
    const messageInput = document.getElementById('message-text');
    const charCountDisplay = document.getElementById('current-char');

    if(messageInput && charCountDisplay) {
        messageInput.addEventListener('input', function() {
            // Lấy độ dài hiện tại của chuỗi khách nhập
            const currentLength = this.value.length;
            // Ghi đè số đó ra màn hình
            charCountDisplay.textContent = currentLength;
            
            // Tùy chọn: Nếu nhập sát 500 ký tự thì đổi số thành màu đỏ cảnh báo
            if(currentLength >= 490) {
                charCountDisplay.style.color = '#ff4d4d';
            } else {
                charCountDisplay.style.color = '#666';
            }
        });
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