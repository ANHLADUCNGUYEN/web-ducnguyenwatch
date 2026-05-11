// Lấy thẻ Nút kính lúp và Khối chứa ô tìm kiếm
const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search-input');
 
searchBtn.addEventListener('click', function() {
    searchBox.classList.toggle('active');
    searchBtn.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
});
 
// Lấy thẻ Header
const header = document.querySelector('.main-header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
 
 
// ========================================================
// TIỆN ÍCH
// ========================================================
function getCart() {
    return JSON.parse(localStorage.getItem('ducnguyen_cart')) || [];
}
 
function saveCart(cart) {
    localStorage.setItem('ducnguyen_cart', JSON.stringify(cart));
}
 
function formatPrice(number) {
    return number.toLocaleString('vi-VN') + ' đ';
}
 
function updateCartBadge() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalQty;
    });
}
 
 
// ========================================================
// RENDER TOÀN BỘ GIỎ HÀNG
// ========================================================
function renderCart() {
    const cart = getCart();
    const emptyView  = document.getElementById('empty-cart-view');
    const filledView = document.getElementById('filled-cart-view');
    const titleCount = document.getElementById('cart-item-count');
 
    // --- GIỎ TRỐNG ---
    if (cart.length === 0) {
        emptyView.style.display  = 'block';
        filledView.style.display = 'none';
        titleCount.textContent   = 'Giỏ hàng của bạn đang trống';
        updateCartBadge();
        return;
    }
 
    // --- GIỎ CÓ HÀNG ---
    emptyView.style.display  = 'none';
    filledView.style.display = 'block';
 
    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    titleCount.textContent = totalItems + ' sản phẩm trong giỏ hàng';
 
    // Render danh sách sản phẩm
    const listEl = document.getElementById('cart-items-list');
    listEl.innerHTML = '';
 
    let subtotal = 0;
 
    cart.forEach((item, index) => {
        const itemQty   = item.qty || 1;
        const itemTotal = item.price * itemQty;
        subtotal += itemTotal;
 
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info-wrapper">
                <img src="${item.image}" alt="${item.name}" class="item-img">
                <div class="item-text">
                    <span class="item-brand">${item.brand}</span>
                    <h4 class="item-name">${item.name}</h4>
                    <span class="item-old-price">${formatPrice(item.price)} / chiếc</span>
                </div>
            </div>
            <div class="item-qty-wrapper">
                <button class="qty-btn btn-decrease" data-index="${index}">-</button>
                <input type="text" value="${itemQty}" class="qty-input" readonly>
                <button class="qty-btn btn-increase" data-index="${index}">+</button>
            </div>
            <div class="item-price-wrapper">
                <span class="item-current-price">${formatPrice(itemTotal)}</span>
                <button class="btn-remove-item" data-index="${index}">Xóa</button>
            </div>
        `;
        listEl.appendChild(div);
    });
 
    // Cập nhật tổng tiền
    document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('summary-total').textContent    = formatPrice(subtotal);
 
    // Gắn sự kiện cho các nút vừa render
    listEl.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.index), 1));
    });
    listEl.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.index), -1));
    });
    listEl.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.index)));
    });
 
    updateCartBadge();
}
 
 
// ========================================================
// TĂNG / GIẢM SỐ LƯỢNG
// ========================================================
function changeQty(index, delta) {
    const cart = getCart();
    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
}
 
 
// ========================================================
// XÓA 1 SẢN PHẨM
// ========================================================
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}
 
 
// ========================================================
// XÓA TOÀN BỘ GIỎ HÀNG
// ========================================================
function clearCart() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        saveCart([]);
        renderCart();
    }
}
 
 
// ========================================================
// KHỞI CHẠY KHI TRANG LOAD
// ========================================================
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
 
    const clearAllBtn = document.getElementById('btn-clear-all');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearCart);
    }
});