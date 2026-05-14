// =========================================
// PHẦN 1: CÁC HIỆU ỨNG UI CHUNG (HEADER, SEARCH, COUNTER...)
// =========================================

// 1. Kính lúp tìm kiếm
const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('search-input');

if (searchBtn && searchBox && searchInput) {
    searchBtn.addEventListener('click', function() {
        searchBox.classList.toggle('active');
        searchBtn.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

// 2. Cuộn Header
const header = document.querySelector('.main-header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 3. Chạy số Counter
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText.replace(/\./g, '');
            const increment = target / 200;

            if (current < target) {
                const newValue = Math.ceil(current + increment);
                counter.innerText = newValue.toLocaleString('vi-VN');
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target.toLocaleString('vi-VN');
            }
        };
        setTimeout(updateCounter, 1000); 
    });
}

// 4. Form đăng ký nhận tin
const subscribeForm = document.getElementById('subscribe-form');
const successMessage = document.getElementById('success-message'); 
if (subscribeForm && successMessage) {
    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const emailInput = document.getElementById('email-input');
        if (emailInput && emailInput.value) {
            subscribeForm.style.display = 'none';
            successMessage.style.display = 'flex';
        }
    });
}


// =========================================
// PHẦN 2: LƯỚI SẢN PHẨM & BỘ LỌC (TRANG DANH MỤC)
// =========================================

// Data 12 sản phẩm
const danhSachSanPham = [

    { id: "omegaspeed", thuongHieu: "OMEGA", danhMuc: "Đồng hồ nam", ten: "Speedmaster Moonwatch", giaMoi: 215000000, giaCu: 230000000, anh: "anh/omegamoon.jpg", nhan: "GIẢM GIÁ", classNhan: "badge-sale" },
    { id: "pateknautilus", thuongHieu: "PATEK PHILIPPE", danhMuc: "Đồng hồ nam", ten: "Nautilus 5711/1A-010", giaMoi: 1250000000, giaCu: null, anh: "anh/nautilus.jpg", nhan: null, classNhan: null },
    { id: "audemarsroyal", thuongHieu: "AUDEMARS PIGUET", danhMuc: "Đồng hồ nam", ten: "Royal Oak Selfwinding", giaMoi: 850000000, giaCu: null, anh: "anh/royaloak.jpg", nhan: null, classNhan: null },
    { id: "rolexsub", thuongHieu: "ROLEX", danhMuc: "Đồng hồ nam", ten: "Submariner Date 126610LN", giaMoi: 385000000, giaCu: null, anh: "anh/rolexsub.jpg", nhan: "MỚI", classNhan: "badge-new" },
    { id: "cartiersantos", thuongHieu: "CARTIER", danhMuc: "Đồng hồ nam", ten: "Santos de Cartier", giaMoi: 185000000, giaCu: null, anh: "anh/santos.jpg", nhan: "HOT", classNhan: "badge-hot" },
    { id: "iwccronograph", thuongHieu: "IWC", danhMuc: "Đồng hồ nữ", ten: "Portugieser Chronograph", giaMoi: 220000000, giaCu: 245000000, anh: "anh/portugieser.jpg", nhan: "GIẢM GIÁ", classNhan: "badge-sale" },
    { id: "rolexdatejust", thuongHieu: "ROLEX", danhMuc: "Đồng hồ nữ", ten: "Datejust 36 126233", giaMoi: 320000000, giaCu: null, anh: "anh/datejust.jpg", nhan: null, classNhan: null },
    { id: "omegaseamaster", thuongHieu: "OMEGA", danhMuc: "Đồng hồ nam", ten: "Seamaster Diver 300M", giaMoi: 145000000, giaCu: null, anh: "anh/seamaster.jpg", nhan: null, classNhan: null },
    { id: "patekaquanaut", thuongHieu: "PATEK PHILIPPE", danhMuc: "Đồng hồ nam", ten: "Aquanaut 5167A", giaMoi: 980000000, giaCu: null, anh: "anh/aquanaut.jpg", nhan: "HIẾM", classNhan: "badge-new" },
    { id: "audemarsoffshore", thuongHieu: "AUDEMARS PIGUET", danhMuc: "Đồng hồ nam", ten: "Royal Oak Offshore", giaMoi: 920000000, giaCu: null, anh: "anh/offshore.jpg", nhan: null, classNhan: null },
    { id: "cartiertank", thuongHieu: "CARTIER", danhMuc: "Đồng hồ nữ", ten: "Tank Must", giaMoi: 850000000, giaCu: null, anh: "anh/tank.jpg", nhan: null, classNhan: null },
    { id: "rolexdaytona", thuongHieu: "ROLEX", danhMuc: "Đồng hồ nam", ten: "Daytona 116500LN", giaMoi: 750000000, giaCu: null, anh: "anh/daytona.jpg", nhan: "MỚI", classNhan: "badge-new" }
];

function dinhDangTien(soTien) { return soTien.toLocaleString('vi-VN') + ' ₫'; }

const khungLuoiSanPham = document.getElementById('category-product-grid');
const countDisplay = document.getElementById('product-count-display');
const paginationWrapper = document.getElementById('pagination-wrapper');

let sanPhamHienTai = [...danhSachSanPham]; 
const soSanPhamMotTrang = 8;
let trangHienTai = 1;

// Chỉ chạy logic sản phẩm nếu trang hiện tại CÓ cái khung chứa sản phẩm
if (khungLuoiSanPham) {

    // Bật tắt bộ lọc & Hiệu ứng thẻ
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filterPanel = document.getElementById('filter-panel');
    if(filterToggleBtn && filterPanel) {
        filterToggleBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            filterPanel.style.display = filterPanel.style.display === 'block' ? 'none' : 'block';
        });
    }

    document.querySelectorAll('.filter-options').forEach(group => {
        const tags = group.querySelectorAll('.filter-tag');
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                tags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });

    function capNhatGiaoDien() {
        if(countDisplay) countDisplay.innerText = `${sanPhamHienTai.length} sản phẩm`;

        if (sanPhamHienTai.length === 0) {
            khungLuoiSanPham.innerHTML = '<p style="color:#888; text-align:center; grid-column: 1/-1; padding: 50px 0;">Không tìm thấy sản phẩm nào phù hợp.</p>';
            if(paginationWrapper) paginationWrapper.innerHTML = ''; 
            return;
        }

        const viTriBatDau = (trangHienTai - 1) * soSanPhamMotTrang;
        const sanPhamCuaTrangNay = sanPhamHienTai.slice(viTriBatDau, viTriBatDau + soSanPhamMotTrang);

let htmlSanPham = '';
        sanPhamCuaTrangNay.forEach(sp => {
            let htmlNhan = sp.nhan ? `<div class="badge ${sp.classNhan}">${sp.nhan}</div>` : '';
            let htmlGiaCu = sp.giaCu ? `<span class="old-price">${dinhDangTien(sp.giaCu)}</span>` : '';
            htmlSanPham += `
                <div class="product-card">
                    ${htmlNhan}
                    <div class="product-img-wrapper">
                        <img src="${sp.anh}" alt="${sp.ten}">
                        <div class="img-overlay">
                            <!-- ĐÃ THAY ĐỔI: Chuyển button thành thẻ a có link chứa ID -->
                            <a href="chitiet.html?id=${sp.id}" class="btn-hover-detail" style="text-decoration: none; display: flex; align-items: center; justify-content: center;">XEM CHI TIẾT</a>
                        </div>
                    </div>
                    <div class="product-info-bottom">
                        <div class="brand">${sp.thuongHieu}</div>
                        <!-- ĐÃ THAY ĐỔI: Gắn thêm link vào tên sản phẩm để khách dễ bấm -->
                        <h3 class="name">
                            <a href="chitiet.html?id=${sp.id}" style="color: inherit; text-decoration: none;">${sp.ten}</a>
                        </h3>
                        <div class="price-box"><span class="current-price">${dinhDangTien(sp.giaMoi)}</span>${htmlGiaCu}</div>
                    </div>
                </div>`;
        });
        khungLuoiSanPham.innerHTML = htmlSanPham;

        // Vẽ thanh phân trang
        if (!paginationWrapper) return;
        const tongSoTrang = Math.ceil(sanPhamHienTai.length / soSanPhamMotTrang);
        
        if (tongSoTrang <= 1) {
            paginationWrapper.innerHTML = ''; 
            return;
        }

        let htmlPhanTrang = `<button class="page-btn" onclick="doiTrang(${trangHienTai - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;
        for (let i = 1; i <= tongSoTrang; i++) {
            let activeClass = (i === trangHienTai) ? 'active' : '';
            htmlPhanTrang += `<button class="page-btn ${activeClass}" onclick="doiTrang(${i})">${i}</button>`;
        }
        htmlPhanTrang += `<button class="page-btn" onclick="doiTrang(${trangHienTai + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
        paginationWrapper.innerHTML = htmlPhanTrang;
    }

    window.doiTrang = function(trangMoi) {
        const tongSoTrang = Math.ceil(sanPhamHienTai.length / soSanPhamMotTrang);
        if (trangMoi >= 1 && trangMoi <= tongSoTrang) {
            trangHienTai = trangMoi;
            capNhatGiaoDien();
            document.getElementById('category-product-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const btnApply = document.querySelector('.btn-apply');
    const activeFiltersContainer = document.getElementById('active-filters-container');
    const activeFiltersList = document.getElementById('active-filters-list');

    if (btnApply) {
        btnApply.addEventListener('click', function() {
            const thuongHieuChon = document.querySelector('.brand-options .filter-tag.active')?.innerText || 'Tất cả';
            const danhMucChon = document.querySelector('.category-options .filter-tag.active')?.innerText || 'Tất cả';
            const mucGiaChon = document.querySelector('.price-options .filter-tag.active')?.innerText || 'Tất cả';

            sanPhamHienTai = danhSachSanPham.filter(sp => {
                let okThuongHieu = (thuongHieuChon === 'Tất cả') || (sp.thuongHieu.toUpperCase() === thuongHieuChon.toUpperCase());
                let okDanhMuc = (danhMucChon === 'Tất cả') || (sp.danhMuc === danhMucChon);
                let okGia = true;
                if (mucGiaChon === 'Dưới 200 triệu') okGia = sp.giaMoi < 200000000;
                else if (mucGiaChon === '200 - 400 triệu') okGia = sp.giaMoi >= 200000000 && sp.giaMoi <= 400000000;
                else if (mucGiaChon === 'Trên 400 triệu') okGia = sp.giaMoi > 400000000;
                return okThuongHieu && okDanhMuc && okGia; 
            });

            trangHienTai = 1;
            capNhatGiaoDien();

            let htmlKetQua = '';
            if(thuongHieuChon !== 'Tất cả') htmlKetQua += `<span class="applied-tag">${thuongHieuChon}</span>`;
            if(danhMucChon !== 'Tất cả') htmlKetQua += `<span class="applied-tag">${danhMucChon}</span>`;
            if(mucGiaChon !== 'Tất cả') htmlKetQua += `<span class="applied-tag">${mucGiaChon}</span>`;

            if (activeFiltersContainer && activeFiltersList) {
                if (htmlKetQua !== '') {
                    activeFiltersList.innerHTML = htmlKetQua;
                    activeFiltersContainer.style.display = 'flex';
                } else {
                    activeFiltersContainer.style.display = 'none';
                }
            }

            if(filterPanel) filterPanel.style.display = 'none';
            if(filterToggleBtn) filterToggleBtn.classList.remove('active');
        });
    }

    const btnClearFilters = document.getElementById('btn-clear-filters');
    if(btnClearFilters) {
        btnClearFilters.addEventListener('click', function() {
            sanPhamHienTai = [...danhSachSanPham]; 
            trangHienTai = 1;
            capNhatGiaoDien();
            
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.filter-options').forEach(group => {
                const firstTag = group.querySelector('.filter-tag');
                if(firstTag) firstTag.classList.add('active');
            });
            
            if (activeFiltersContainer) activeFiltersContainer.style.display = 'none';
        });
    }

    // Chạy render lần đầu
    capNhatGiaoDien();
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