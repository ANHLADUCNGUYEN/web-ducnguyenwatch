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
// DATABASE: 12 SẢN PHẨM - ID PHẢI KHỚP VỚI scriptdanhmuc.js
// ========================================================
const productsDatabase = [
    {
        id: "rolexsub",
        brand: "ROLEX",
        name: "Submariner Date 126610LN",
        priceText: "385.000.000 đ",
        priceNum: 385000000,
        imageMain: "rolexsub.jpg",
        anhPhu: ["rolexsub.jpg", "rolexsub-2.jpg", "rolexsub-3.jpg", "rolexsub-4.jpg"],
        specs: { size: "41mm", material: "Thép 904L", machine: "Automatic Cal. 3235" },
        desc: "Ông vua của biển cả. Mặt số đen huyền bí với vành bezel Cerachrom, chống nước 300m. Biểu tượng bất diệt của đồng hồ lặn cao cấp."
    },
    {   
        id: "omegaspeed",
        brand: "OMEGA",
        name: "Speedmaster Moonwatch",
        priceText: "215.000.000 đ",
        priceNum: 215000000,
        imageMain: "omegamoon.jpg",
        anhPhu: ["omegamoon.jpg", "omegamoon-2.jpg", "omegamoon-3.jpg", "omegamoon-4.jpg"],
        specs: { size: "42mm", material: "Thép không gỉ", machine: "Manual Cal. 1861" },
        desc: "Chiếc đồng hồ duy nhất đặt chân lên Mặt Trăng. Thiết kế chronograph huyền thoại với mặt số đen và bezel tachymeter."
    },
    {
        id: "pateknautilus",
        brand: "PATEK PHILIPPE",
        name: "Nautilus 5711/1A-010",
        priceText: "1.250.000.000 đ",
        priceNum: 1250000000,
        imageMain: "nautilus.jpg",
        anhPhu: ["nautilus.jpg", "nautilus-2.jpg", "nautilus-3.jpg", "nautilus-4.jpg"], 
        specs: { size: "40mm", material: "Thép không gỉ", machine: "Automatic Cal. 26-330 S C" },
        desc: "Thánh kinh của đồng hồ thể thao cao cấp. Mặt số xanh olive đặc trưng, dây tích hợp thép liền mạch, giới hạn cực kỳ hiếm trên thị trường."
    },
    {
        id: "audemarsroyal",
        brand: "AUDEMARS PIGUET",
        name: "Royal Oak Selfwinding",
        priceText: "850.000.000 đ",
        priceNum: 850000000,
        imageMain: "royaloak.jpg",
        anhPhu: ["royaloak.jpg", "royaloak-2.jpg", "royaloak-3.jpg", "royaloak-4.jpg"],
        specs: { size: "41mm", material: "Thép không gỉ", machine: "Automatic Cal. 4302" },
        desc: "Kẻ nổi loạn thay đổi lịch sử ngành đồng hồ. Vỏ bát giác với các vít lộ thiên, mặt số Grande Tapisserie tinh xảo."
    },
    {
        id: "cartiersantos",
        brand: "CARTIER",
        name: "Santos de Cartier",
        priceText: "185.000.000 đ",
        priceNum: 185000000,
        imageMain: "santos.jpg",
        anhPhu: ["santos.jpg", "santos-2.jpg", "santos-3.jpg", "santos-4.jpg"],
        specs: { size: "39.8mm", material: "Thép không gỉ", machine: "Automatic Cal. 1847 MC" },
        desc: "Chiếc đồng hồ đeo tay đầu tiên dành cho nam giới trong lịch sử. Thiết kế vuông vức táo bạo với các vít lộ thiên đặc trưng của Cartier."
    },
    {
        id: "iwccronograph",
        brand: "IWC",
        name: "Portugieser Chronograph",
        priceText: "220.000.000 đ",
        priceNum: 220000000,
        imageMain: "portugieser.jpg",
        anhPhu: ["portugieser.jpg", "portugieser-2.jpg", "portugieser-3.jpg", "portugieser-4.jpg"],
        specs: { size: "41mm", material: "Thép không gỉ", machine: "Automatic Cal. 69355" },
        desc: "Sự thanh lịch của trường phái Bồ Đào Nha trong từng đường nét. Mặt số trắng tinh khôi với hai đồng hồ phụ cổ điển và dây da nâu sang trọng."
    },
    {
        id: "rolexdatejust",
        brand: "ROLEX",
        name: "Datejust 36 126233",
        priceText: "320.000.000 đ",
        priceNum: 320000000,
        imageMain: "datejust.jpg",
        anhPhu: ["datejust.jpg", "datejust-2.jpg", "datejust-3.jpg", "datejust-4.jpg"],
        specs: { size: "36mm", material: "Rolesor vàng & thép", machine: "Automatic Cal. 3235" },
        desc: "Chiếc đồng hồ lịch ngày kinh điển nhất mọi thời đại. Sự kết hợp hoàn hảo giữa vàng 18k và thép 904L trên thiết kế Oyster bất hủ."
    },
    {
        id: "omegaseamaster",
        brand: "OMEGA",
        name: "Seamaster Diver 300M",
        priceText: "145.000.000 đ",
        priceNum: 145000000,
        imageMain: "seamaster.jpg",
        anhPhu: ["seamaster.jpg", "seamaster-2.jpg", "seamaster-3.jpg", "seamaster-4.jpg"],
        specs: { size: "42mm", material: "Thép không gỉ", machine: "Automatic Cal. 8800" },
        desc: "Người bạn đồng hành của điệp viên 007. Bezel gốm xanh dương với mặt số sóng biển đặc trưng, chống nước 300m."
    },
    {
        id: "patekaquanaut",
        brand: "PATEK PHILIPPE",
        name: "Aquanaut 5167A",
        priceText: "980.000.000 đ",
        priceNum: 980000000,
        imageMain: "aquanaut.jpg",
        anhPhu: ["aquanaut.jpg", "aquanaut-2.jpg", "aquanaut-3.jpg", "aquanaut-4.jpg"],
        specs: { size: "40mm", material: "Thép không gỉ", machine: "Automatic Cal. 324 S C" },
        desc: "Phiên bản trẻ trung hơn của dòng Nautilus huyền thoại. Mặt số đen với họa tiết Tropical độc đáo và dây cao su composite sang trọng."
    },
    {
        id: "audemarsoffshore",
        brand: "AUDEMARS PIGUET",
        name: "Royal Oak Offshore",
        priceText: "920.000.000 đ",
        priceNum: 920000000,
        imageMain: "offshore.jpg",
        anhPhu: ["offshore.jpg", "offshore-2.jpg", "offshore-3.jpg", "offshore-4.jpg"],
        specs: { size: "44mm", material: "Thép không gỉ", machine: "Automatic Cal. 3126/3840" },
        desc: "Người con nổi loạn của Royal Oak. Kích thước oversized mạnh mẽ với thiết kế chronograph thể thao cực kỳ ấn tượng."
    },
    {
        id: "cartiertank",
        brand: "CARTIER",
        name: "Cartier Tank Must Large",
        priceText: "850.000.000 đ",
        priceNum: 850000000,
        imageMain: "tank.jpg",
        anhPhu: ["tank.jpg", "tank-2.jpg", "tank-3.jpg", "tank-4.jpg"],
        specs: { size: "33.7mm x 25.5mm", material: "Thép không gỉ", machine: "Quartz SolarBeat" },
        desc: "Biểu tượng của sự thanh lịch Parisian. Thiết kế hình chữ nhật cổ điển, mặt số trắng với kim thép xanh đặc trưng, dây da cá sấu cao cấp."
    },
    {
        id: "rolexdaytona",
        brand: "ROLEX",
        name: "Daytona 116500LN",
        priceText: "750.000.000 đ",
        priceNum: 750000000,
        imageMain: "daytona.jpg",
        anhPhu: ["daytona.jpg", "daytona-2.jpg", "daytona-3.jpg", "daytona-4.jpg"],
        specs: { size: "40mm", material: "Thép 904L", machine: "Automatic Cal. 4130" },
        desc: "Vua của các đồng hồ đua xe. Bezel Cerachrom trắng, mặt số đen huyền bí với ba đồng hồ phụ đối lập — kiệt tác khó sở hữu nhất của Rolex."
    }
];
 
 
// ========================================================
// CẬP NHẬT BADGE GIỎ HÀNG TRÊN ICON HEADER
// ========================================================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('ducnguyen_cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalQty;
    });
}
 
// ========================================================
// HIỂN THỊ THÔNG BÁO NHỎ GÓC PHẢI (thay cho alert)
// ========================================================
function showToast(message) {
    let toast = document.getElementById('dnw-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'dnw-toast';
        toast.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; z-index: 99999;
            background: #1a1a1a; color: #fff; padding: 14px 22px;
            border-left: 3px solid #dcb365; border-radius: 4px;
            font-size: 14px; font-family: 'Montserrat', sans-serif;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            opacity: 0; transition: opacity 0.3s ease;
            max-width: 320px; line-height: 1.5;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
 
 
document.addEventListener('DOMContentLoaded', function() {
 
    // ========================================================
    // 1. XỬ LÝ CHUYỂN ẢNH GALLERY
    // ========================================================
    const mainImg = document.getElementById('main-product-img');
    const thumbnails = document.querySelectorAll('.thumb-img');
 
    if (mainImg && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImg.src = this.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
 
    // ========================================================
    // 2. XỬ LÝ TĂNG GIẢM SỐ LƯỢNG MUA
    // ========================================================
    const btnMinus = document.getElementById('btn-minus-pdp');
    const btnPlus  = document.getElementById('btn-plus-pdp');
    const qtyInput = document.getElementById('pdp-qty-input');
 
    if (btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener('click', () => {
            let v = parseInt(qtyInput.value);
            if (v > 1) qtyInput.value = v - 1;
        });
        btnPlus.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });
    }
 
    // ========================================================
    // 3. XỬ LÝ CHUYỂN TABS
    // ========================================================
    const tabBtns     = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
 
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(this.getAttribute('data-target')).classList.add('active');
            });
        });
    }
 
    // ========================================================
    // 4. DYNAMIC RENDERING — Đọc ?id= trên URL rồi bơm dữ liệu
    // ========================================================
    const urlParams        = new URLSearchParams(window.location.search);
    const currentProductId = urlParams.get('id');
 
    let activeProduct = productsDatabase.find(p => p.id === currentProductId)
                        || productsDatabase[0];
 
    if (activeProduct) {
        document.getElementById('dyn-name').textContent       = activeProduct.name;
        document.getElementById('dyn-brand').textContent      = activeProduct.brand;
        document.getElementById('dyn-price').textContent      = activeProduct.priceText;
        document.getElementById('dyn-desc').textContent       = activeProduct.desc;
        document.getElementById('dyn-long-desc').textContent  = activeProduct.desc;
        document.getElementById('dyn-breadcrumb').textContent = activeProduct.name;
 
        document.getElementById('dyn-size').textContent     = activeProduct.specs.size;
        document.getElementById('dyn-material').textContent = activeProduct.specs.material;
        document.getElementById('dyn-machine').textContent  = activeProduct.specs.machine;
        document.getElementById('tab-size').textContent     = activeProduct.specs.size;
        document.getElementById('tab-material').textContent = activeProduct.specs.material;
        document.getElementById('tab-machine').textContent  = activeProduct.specs.machine;
 
        if (mainImg) {
            mainImg.src = activeProduct.imageMain;
        }
 
        const thumbnailContainer = document.getElementById('dyn-thumbnails');
        if (thumbnailContainer && activeProduct.anhPhu && activeProduct.anhPhu.length > 0) {
            let thumbHTML = '';
            activeProduct.anhPhu.forEach((linkAnh, index) => {
                let activeClass = (index === 0) ? 'active' : '';
                thumbHTML += `<img src="${linkAnh}" class="thumb-img ${activeClass}" alt="Ảnh chi tiết ${index + 1}">`;
            });
            thumbnailContainer.innerHTML = thumbHTML;
 
            const newThumbnails = thumbnailContainer.querySelectorAll('.thumb-img');
            newThumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    if (mainImg) mainImg.src = this.src;
                    newThumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }
 
    // Cập nhật badge khi trang load
    updateCartBadge();
 
    // ========================================================
    // 5. HÀM DÙNG CHUNG ĐỂ THÊM VÀO GIỎ
    // ========================================================
    function addToCart(quantity) {
        if (!activeProduct) return;
        const newItem = {
            id:    activeProduct.id,
            brand: activeProduct.brand,
            name:  activeProduct.name,
            price: activeProduct.priceNum,
            image: activeProduct.imageMain,
            qty:   quantity
        };
        let cart = JSON.parse(localStorage.getItem('ducnguyen_cart')) || [];
        const idx = cart.findIndex(item => item.id === newItem.id);
        if (idx > -1) {
            cart[idx].qty += quantity;
        } else {
            cart.push(newItem);
        }
        localStorage.setItem('ducnguyen_cart', JSON.stringify(cart));
        updateCartBadge();
    }
 
    // ========================================================
    // 6. NÚT "THÊM VÀO GIỎ HÀNG"
    // ========================================================
    const btnAddToCart = document.getElementById('btn-add-to-cart');
    if (btnAddToCart && activeProduct) {
        btnAddToCart.addEventListener('click', function() {
            const quantity = parseInt(qtyInput ? qtyInput.value : 1);
            addToCart(quantity);
            showToast('Đã thêm "' + activeProduct.name + '" vào giỏ hàng!');
        });
    }
 
    // ========================================================
    // 7. NÚT "MUA NGAY" — Thêm vào giỏ rồi chuyển sang trang giỏ hàng
    // ========================================================
    const btnBuyNow = document.querySelector('.btn-buy-now');
    if (btnBuyNow && activeProduct) {
        btnBuyNow.addEventListener('click', function() {
            const quantity = parseInt(qtyInput ? qtyInput.value : 1);
            addToCart(quantity);
            window.location.href = 'giohang.html';
        });
    }
 
});