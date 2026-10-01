// Data Menu Roti Cane, Sandwich, dan Yogurt
const menuItems = [
    {
        id: 1,
        name: "Serabi",
        category: "Serabi",
        price: 18000,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
        description: "Serabi empuk berlayer, disajikan dengan kental manis dan parutan keju melimpah."
    },
    {
        id: 2,
        name: "Mie goreng",
        category: "Mie Goreng",
        price: 28000,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
        description: "Mie goreng dengan rasa pedas dan gurih."
    },
    {
        id: 3,
        name: "Roti Panggang",
        category: "Roti Panggang",
        price: 32000,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80",
        description: "Roti Panggang Mentega dengan isian scrambled."
    },
    {
        id: 4,
        name: "Egg & Cheese Toast Sandwich",
        category: "Sandwich",
        price: 25000,
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=500&q=80",
        description: "Sandwich lapis isi daging ayam panggang, telur, keju slice, selada, dan tomat segar."
    },
    {
        id: 5,
        name: "Greek Yogurt Strawbery Bowl",
        category: "Yogurt",
        price: 30000,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
        description: "Yogurt segar kaya probiotik dipadu topping buah stroberi, blueberry, dan granola renyah."
    },
    {
        id: 6,
        name: "Honey Strawbery Yogurt Smoothie",
        category: "Yogurt",
        price: 27000,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80",
        description: "Minuman yogurt segar berbalut manisnya buah mangga asli dan tetesan madu murni."
    }
];

let cart = [];

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Render Menu ke Grid Halaman
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = menuItems.map(item => `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col justify-between">
            <div>
                <div class="relative overflow-hidden h-48 bg-gray-100">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
                    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                        ${item.category}
                    </span>
                </div>
                <div class="p-6 space-y-2">
                    <h3 class="font-bold text-lg text-gray-900">${item.name}</h3>
                    <p class="text-gray-500 text-sm line-clamp-2">${item.description}</p>
                </div>
            </div>
            <div class="p-6 pt-0 flex items-center justify-between mt-4">
                <span class="text-amber-600 font-extrabold text-base">Rp ${item.price.toLocaleString('id-ID')}</span>
                <button onclick="addToCart(${item.id})" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow transition flex items-center space-x-1.5">
                    <i class="fa-solid fa-plus text-xs"></i>
                    <span>Pesan</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle Cart Drawer
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
        renderCartItems();
    }
}

// Tambah produk ke keranjang
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartBadge();
    renderCartItems();
    
    // Buka otomatis keranjang saat item ditambah
    const drawer = document.getElementById('cart-drawer');
    if (drawer && drawer.classList.contains('hidden')) {
        toggleCart();
    }
}

// Update kuantitas item dalam keranjang
function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartBadge();
    renderCartItems();
}

// Update badge counter di ikon keranjang
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (totalCount > 0) {
        badge.innerText = totalCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Render isi list item di dalam Cart Drawer
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-gray-400 space-y-2">
                <i class="fa-solid fa-cart-shopping text-4xl"></i>
                <p class="text-sm font-medium">Keranjang belanja Anda masih kosong</p>
            </div>
        `;
        totalEl.innerText = 'Rp 0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        return `
            <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <div class="flex-1 pr-2">
                    <h4 class="text-xs font-bold text-gray-900">${item.name}</h4>
                    <p class="text-xs text-amber-600 font-semibold">Rp ${item.price.toLocaleString('id-ID')} x ${item.qty}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-xs">-</button>
                    <span class="text-xs font-semibold w-4 text-center">${item.qty}</span>
                    <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">+</button>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Checkout dan Kirim Pesanan ke WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    const nameEl = document.getElementById('customer-name');
    const addressEl = document.getElementById('customer-address');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const address = addressEl ? addressEl.value.trim() : '';

    if (!name || !address) {
        alert('Mohon isi Nama Pemesan dan Alamat Pengiriman terlebih dahulu!');
        return;
    }

    let message = `Halo Cane & Bite, saya ingin memesan:\n\n`;
    let total = 0;

    cart.forEach((item, index) => {
        let sub = item.price * item.qty;
        total += sub;
        message += `${index + 1}. ${item.name} (${item.qty}x) - Rp ${sub.toLocaleString('id-ID')}\n`;
    });

    message += `\n*Total Keseluruhan: Rp ${total.toLocaleString('id-ID')}*`;
    message += `\n\n*Data Pemesan:*`;
    message += `\nNama: ${name}`;
    message += `\nAlamat: ${address}`;
    message += `\n\nTerima kasih!`;

    const waNumber = '6283849971170'; // Nomor WhatsApp Tujuan
    const encodedMessage = encodeURIComponent(message);
    const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    window.open(waURL, '_blank');
}

// Kirim Pesan Cepat dari Form Contact via WhatsApp
function sendContactWhatsApp() {
    const nameInput = document.getElementById('contact-name');
    const msgInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const messageText = msgInput ? msgInput.value.trim() : '';

    if (!name || !messageText) {
        alert('Mohon isi Nama dan Pesan terlebih dahulu!');
        return;
    }

    let message = `Halo Cane & Bite, saya ${name}.\n\n${messageText}`;
    const waNumber = '6283849971170';
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(waURL, '_blank');
}

// Inisialisasi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});