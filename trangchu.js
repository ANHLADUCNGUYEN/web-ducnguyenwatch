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
    
    // Nếu cuộn xuống quá 50px
    if (window.scrollY > 50) {
        // Thêm class 'scrolled' vào Header
        header.classList.add('scrolled');
    } else {
        // Nếu kéo ngược lên đầu trang, xóa class 'scrolled' đi
        header.classList.remove('scrolled');
    }
    
});
// Lấy tất cả các thẻ có class 'counter'
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0'; // Đặt giá trị ban đầu là 0

    const updateCounter = () => {
        // Lấy con số đích đến từ thuộc tính data-target (Ví dụ: 10000)
        const target = +counter.getAttribute('data-target');
        
        // Lấy con số hiện tại đang hiển thị (phải xóa dấu chấm đi để tính toán)
        const current = +counter.innerText.replace(/\./g, '');

        // Tốc độ chạy (Số càng to chạy càng chậm)
        const increment = target / 200;

        if (current < target) {
            // Tăng con số lên và làm tròn
            const newValue = Math.ceil(current + increment);
            
            // Dùng toLocaleString('vi-VN') để tự động thêm dấu chấm vào 10.000
            counter.innerText = newValue.toLocaleString('vi-VN');
            
            // Lặp lại hàm này sau 1 mili-giây
            setTimeout(updateCounter, 1);
        } else {
            // Khi đã chạy xong, đảm bảo hiển thị đúng số đích
            counter.innerText = target.toLocaleString('vi-VN');
        }
    };

    // Để hiệu ứng đẹp hơn,cho nó đợi khoảng 1 giây (1000ms) khi trang vừa load xong mới bắt đầu chạy
    setTimeout(updateCounter, 1000); 
});
// --- LOGIC HIỂN THỊ THÔNG BÁO THÀNH CÔNG ---

const subscribeForm = document.getElementById('subscribe-form');
const successMessage = document.getElementById('success-message'); 

subscribeForm.addEventListener('submit', function(event) {
    // Ngăn trang web bị tải lại
    event.preventDefault(); 
    
    const emailValue = document.getElementById('email-input').value;

    if (emailValue) {
        // 1. Ẩn form nhập email đi
        subscribeForm.style.display = 'none';

        // 2. Hiện khối thông báo cảm ơn lên
        successMessage.style.display = 'flex';
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