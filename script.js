// Datos de productos (puedes modificar estos datos)
const products = [
    {
        id: 1,
        name: "Burrito",
        category: "burritos",
        options: {
            type: "checkbox",
            label: "GUISOS A ELEGIR:",
            choices: ["DESEBRADA", "BISTEC", "CHICHARRÓN", "PICADILLO", "ASADO DE PUERCO"],
            maxSelections: 5
        },
        extras: {
            type: "checkbox",
            label: "INGREDIENTE EXTRA:",
            choices: [{ name: "QUESO", price: 10 }]
        },
        price: 35,
        includes: "INCLUYE: LECHUGA, LIMÓN Y SALSA.",
        image: "burrito.jpg"
    },
    {
        id: 2,
        name: "Hot Dog Salchicha de Pavo",
        category: "hotdogs",
        options: {
            type: "checkbox",
            label: "OPCIONAL A ELEGIR:",
            choices: ["MAYONESA", "KETCHUP", "MOSTAZA", "SALSA CHIPOTLE", "CEBOLLA", "TOMATE", "CHEETOS FLAMIN HOT", "CEBOLLA ASADA"]
        },
        price: 25,
        includes: "INCLUYE: UNA BOLSITA DE CHILES JALAPEÑOS",
        image: "hotdog_salchicha_de_pavo.jpg"
    },
    {
        id: 3,
        name: "Hot Dog Salchicha para Asar",
        category: "hotdogs",
        options: {
            type: "checkbox",
            label: "OPCIONAL A ELEGIR:",
            choices: ["MAYONESA", "KETCHUP", "MOSTAZA", "SALSA CHIPOTLE", "CEBOLLA", "TOMATE", "CHEETOS FLAMIN HOT", "CEBOLLA ASADA"]
        },
        price: 35,
        includes: "INCLUYE: UNA BOLSITA DE CHILES JALAPEÑOS",
        image: "hotdog_salchicha_para_asar.jpg"
    },
    {
        id: 4,
        name: "Orden de Bistec",
        category: "ordenes",
        options: null,
        price: 65,
        includes: "INCLUYE: CEBOLLA ASADA, CILANTRO, LIMÓN Y SALSA.",
        image: "orden_de_bistec.jpg"
    },
    {
        id: 5,
        name: "Orden de Harina",
        category: "ordenes",
        options: {
            type: "checkbox",
            label: "GUISOS A ELEGIR:",
            choices: ["DESEBRADA", "BISTEC", "CHICHARRÓN", "PICADILLO", "ASADO DE PUERCO"],
            maxSelections: 5
        },
        price: 65,
        includes: "LLEVA 5 TACOS CON SU LECHUGA, LIMÓN Y SALSA",
        image: "orden_de_harina.jpg"
    },
    {
        id: 6,
        name: "Orden de Maíz",
        category: "ordenes",
        options: {
            type: "checkbox",
            label: "GUISOS A ELEGIR:",
            choices: ["DESEBRADA", "CHICHARRÓN", "BISTEC", "PICADILLO", "ASADO DE PUERCO"],
            maxSelections: 5
        },
        price: 50,
        includes: "INCLUYE: CEBOLLA ASADA O LECHUGA, LIMÓN Y SALSA.",
        image: "orden_de_maiz.jpg"
    },
    {
        id: 7,
        name: "Pizza Dog",
        category: "hotdogs",
        options: {
            type: "checkbox",
            label: "CONTIENE (desmarca lo que no quieras):",
            choices: ["SALCHICHA PARA ASAR", "MAYONESA", "KETCHUP", "QUESO", "PEPERONI"],
            defaultChecked: true
        },
        price: 45,
        includes: "Incluye todos los ingredientes por defecto. Desmarca en el menú lo que no quieras.",
        image: "pizza_dog.jpg"
    },
    {
        id: 8,
        name: "Hamburguesa Clásica",
        category: "ordenes",
        options: {
            type: "checkbox",
            label: "CONTIENE (desmarca lo que no quieras):",
            choices: ["AGUACATE", "TOMATE", "CEBOLLA", "LECHUGA", "QUESO", "JAMÓN", "KETCHUP", "CARNE DE RES 🥩"],
            defaultChecked: true
        },
        price: 45,
        includes: "Incluye todos los ingredientes por defecto. Desmarca en el menú lo que no quieras.",
        image: "hamburguesa_clasica.jpg"
    },
    {
        id: 9,
        name: "Agua de sabor 500 ml",
        category: "bebidas",
        options: {
            type: "select",
            label: "Sabor:",
            choices: ["Jamaica", "Limón", "Horchata", "Tamarindo"]
        },
        price: 15,
        includes: "Refrescante agua de sabor natural 500 ml.",
        image: "agua_sabor.jpg"
    },
    {
        id: 10,
        name: "Pedidos de tortillas de harina",
        category: "ordenes",
        options: {
            type: "quantity",
            label: "Cantidad:",
            unitPrice: 1.50,
            min: 1,
            max: 999
        },
        price: 1.50,
        includes: "Solo por pedido. $1.50 por tortilla.",
        image: "tortillas_harina.jpg"
    }
];

// Imágenes genéricas SVG para productos sin foto (Pizza Dog, Hamburguesa, Agua)
function getGenericProductImage(productId) {
    const svgs = {
        7: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#F5F1E8" width="200" height="200"/><ellipse cx="100" cy="115" rx="55" ry="25" fill="#8B4513"/><ellipse cx="100" cy="108" rx="50" ry="22" fill="#D2691E"/><ellipse cx="100" cy="95" rx="45" ry="18" fill="#DEB887"/><circle cx="75" cy="88" r="8" fill="#C85A2F"/><circle cx="100" cy="85" r="8" fill="#C85A2F"/><circle cx="125" cy="90" r="8" fill="#C85A2F"/><circle cx="90" cy="75" r="6" fill="#FFD700"/><circle cx="110" cy="78" r="6" fill="#FFD700"/><text x="100" y="165" text-anchor="middle" fill="#5C4033" font-family="Arial" font-size="14" font-weight="bold">Pizza Dog</text></svg>',
        8: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#F5F1E8" width="200" height="200"/><ellipse cx="100" cy="145" rx="60" ry="12" fill="#D2691E"/><rect x="55" y="95" width="90" height="45" rx="5" fill="#8B4513"/><rect x="60" y="100" width="80" height="8" fill="#228B22"/><rect x="60" y="112" width="80" height="25" fill="#654321"/><rect x="60" y="120" width="80" height="8" fill="#FFD700"/><ellipse cx="100" cy="92" rx="55" ry="12" fill="#D2691E"/><text x="100" y="178" text-anchor="middle" fill="#5C4033" font-family="Arial" font-size="12" font-weight="bold">Hamburguesa</text></svg>',
        9: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#F5F1E8" width="200" height="200"/><path d="M75 50 L75 155 Q75 165 100 165 Q125 165 125 155 L125 50 Z" fill="none" stroke="#5C4033" stroke-width="8"/><path d="M78 55 L78 152 Q78 158 100 158 Q122 158 122 152 L122 55 Z" fill="url(#aguaGrad)"/><defs><linearGradient id="aguaGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#87CEEB"/><stop offset="100%" style="stop-color:#E0F4FF"/></linearGradient></defs><ellipse cx="100" cy="52" rx="22" ry="6" fill="#E8E8E8"/><text x="100" y="182" text-anchor="middle" fill="#5C4033" font-family="Arial" font-size="13" font-weight="bold">Agua 500 ml</text></svg>',
        10: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#F5F1E8" width="200" height="200"/><ellipse cx="100" cy="100" rx="55" ry="45" fill="#F5DEB3" stroke="#D2691E" stroke-width="2"/><ellipse cx="100" cy="98" rx="50" ry="40" fill="#FFEFD5"/><text x="100" y="175" text-anchor="middle" fill="#5C4033" font-family="Arial" font-size="12" font-weight="bold">Tortillas de harina</text></svg>'
    };
    const svg = svgs[productId];
    if (!svg) return null;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// Estado de filtros y búsqueda
let currentCategory = 'all';
let searchQuery = '';

// Estado del carrito
let cart = [];

// Cargar carrito desde localStorage al iniciar
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('elSazonCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            console.error('Error al cargar el carrito:', e);
            cart = [];
        }
    }
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('elSazonCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error al guardar el carrito:', e);
    }
}

// Número de WhatsApp
const whatsappNumber = "5218128833450"; // Formato: código de país + número sin espacios ni símbolos

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// Filtrar productos
function filterProducts() {
    return products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.includes && product.includes.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });
}

// Renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = filterProducts();
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products"><p>No se encontraron productos</p><p class="no-products-subtitle">Intenta con otra búsqueda o categoría</p></div>';
        return;
    }
    
    productsGrid.innerHTML = '';

    // Renderizar productos filtrados
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const priceText = product.price > 0 ? `$${product.price.toFixed(0)}` : '';
        const priceUnit = product.price > 0 && (product.name.includes('Hot Dog') || product.name.includes('Burrito') || product.id === 10) ? ' C/U' : '';
        const displayImage = getGenericProductImage(product.id) || product.image;
        const fallbackSvg = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect fill="#F5F1E8" width="300" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6B6B6B" font-family="Arial" font-size="20">Imagen no disponible</text></svg>');
        
        // Construir texto de opciones para mostrar
        let optionsText = '';
        if (product.options) {
            if (product.options.type === 'select') {
                optionsText = `${product.options.label} ${product.options.choices.join(', ')}`;
            } else {
                optionsText = `${product.options.label} ${product.options.choices.join(', ')}`;
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${displayImage}" alt="${product.name.replace(/"/g, '&quot;')}" class="product-image" data-product-id="${product.id}" data-product-name="${product.name.replace(/"/g, '&quot;')}" onerror="this.onerror=null; this.src='${fallbackSvg}';" style="cursor: pointer;">
                ${product.price > 0 ? `<div class="price-tag">${priceText}${priceUnit}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${optionsText ? `<div class="product-options">
                    <p class="options-label">Opciones disponibles:</p>
                    <p class="product-description">${optionsText}</p>
                </div>` : ''}
                ${product.extras ? `<div class="product-extras">
                    <p class="extras-text">${product.extras.label || product.extras}</p>
                </div>` : ''}
                ${product.includes ? `<div class="product-includes">
                    <p class="includes-text">${product.includes}</p>
                </div>` : ''}
                <div class="product-footer">
                    <button class="btn-add-cart" onclick="openOptionsModal(${product.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Agregar
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Configurar event listeners
function setupEventListeners() {
    const cartButton = document.getElementById('cartButton');
    const cartButtonTop = document.getElementById('cartButtonTop');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const sendWhatsApp = document.getElementById('sendWhatsApp');
    const scrollToMenu = document.getElementById('scrollToMenu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const openCart = () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    };

    const closeCartFunc = () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    };

    if (cartButton) {
        cartButton.addEventListener('click', openCart);
    }

    if (cartButtonTop) {
        cartButtonTop.addEventListener('click', openCart);
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartFunc);
    }

    overlay.addEventListener('click', closeCartFunc);

    if (sendWhatsApp) {
        sendWhatsApp.addEventListener('click', sendToWhatsApp);
    }

    if (scrollToMenu) {
        scrollToMenu.addEventListener('click', () => {
            document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Agregar scroll suave a los enlaces del nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Configurar búsqueda
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
            renderProducts();
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            renderProducts();
        });
    }

    // Configurar filtros de categoría
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Clic en imagen de producto para ampliar (delegado para soportar imágenes genéricas)
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const img = e.target.closest('.product-image');
            if (!img || !img.dataset.productId) return;
            const id = parseInt(img.dataset.productId, 10);
            const name = (img.dataset.productName || '').replace(/&quot;/g, '"');
            const product = products.find(p => p.id === id);
            const src = getGenericProductImage(id) || (product && product.image) || img.src;
            openImageModal(src, name);
        });
    }
}

// Abrir modal de opciones
function openOptionsModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Si no tiene opciones, agregar directamente
    if (!product.options && !product.extras) {
        addToCart(productId, null, null);
        return;
    }

    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'options-modal';
    modal.id = 'optionsModal';

    let modalContent = `
        <div class="options-modal-content">
            <div class="options-modal-header">
                <h3>${product.name}</h3>
                <button class="close-modal" onclick="closeOptionsModal()">&times;</button>
            </div>
            <div class="options-modal-body">
    `;

    // Agregar opciones principales
    if (product.options) {
        modalContent += `<div class="options-group">
            <label class="options-group-label">${product.options.label}</label>`;
        
        if (product.options.type === 'quantity') {
            const unitPrice = product.options.unitPrice ?? product.price;
            const min = product.options.min ?? 1;
            const max = product.options.max ?? 999;
            modalContent += `
                <div class="tortilla-quantity-row">
                    <div class="quantity-input-group">
                        <button type="button" class="qty-btn qty-minus" onclick="adjustTortillaQuantity(-1)">-</button>
                        <input type="number" id="tortillaQuantity" class="tortilla-qty-input" value="1" min="${min}" max="${max}" data-unit-price="${unitPrice}">
                        <button type="button" class="qty-btn qty-plus" onclick="adjustTortillaQuantity(1)">+</button>
                    </div>
                    <div class="tortilla-total-display">Total: <strong id="tortillaTotalDisplay">$${unitPrice.toFixed(2)}</strong></div>
                </div>
            `;
        } else if (product.options.type === 'select') {
            modalContent += `<select id="optionSelect" class="option-select">`;
            modalContent += `<option value="">Selecciona una opción</option>`;
            product.options.choices.forEach(choice => {
                modalContent += `<option value="${choice}">${choice}</option>`;
            });
            modalContent += `</select>`;
        } else if (product.options.type === 'checkbox') {
            const maxSelections = product.options.maxSelections || product.options.choices.length;
            // Para Orden de Harina y Orden de Maíz, usar selector de cantidad
            const isTacoOrder = productId === 5 || productId === 6;
            
            if (isTacoOrder) {
                modalContent += `<p class="max-selections-info">Selecciona hasta ${maxSelections} tacos en total (puedes combinar diferentes guisos)</p>`;
                product.options.choices.forEach((choice, index) => {
                    const choiceName = typeof choice === 'string' ? choice : choice.name;
                    modalContent += `
                        <div class="quantity-selector-group">
                            <label class="quantity-selector-label">${choiceName}</label>
                            <div class="quantity-selector">
                                <button type="button" class="qty-btn qty-minus" data-choice="${choiceName}" onclick="adjustTacoQuantity('${choiceName}', -1, ${maxSelections})">-</button>
                                <input type="number" class="qty-input" id="qty-${choiceName}" value="0" min="0" max="${maxSelections}" data-choice="${choiceName}" readonly>
                                <button type="button" class="qty-btn qty-plus" data-choice="${choiceName}" onclick="adjustTacoQuantity('${choiceName}', 1, ${maxSelections})">+</button>
                            </div>
                        </div>
                    `;
                });
                modalContent += `<div class="total-tacos-info" id="totalTacosInfo">Total seleccionado: <span id="totalTacosCount">0</span> / ${maxSelections}</div>`;
            } else {
                const defaultChecked = product.options.defaultChecked === true;
                if (defaultChecked) {
                    modalContent += `<p class="max-selections-info">Viene con todo. Desmarca lo que no quieras.</p>`;
                } else if (product.options.maxSelections) {
                    modalContent += `<p class="max-selections-info">Puedes seleccionar hasta ${maxSelections} opciones</p>`;
                }
                product.options.choices.forEach((choice, index) => {
                    const choiceName = typeof choice === 'string' ? choice : choice.name;
                    const checkedAttr = defaultChecked ? ' checked' : '';
                    modalContent += `
                        <label class="option-checkbox-label">
                            <input type="checkbox" class="option-checkbox" value="${choiceName}" name="options" data-max="${maxSelections}"${checkedAttr}>
                            <span>${choiceName}</span>
                        </label>
                    `;
                });
            }
        }
        modalContent += `</div>`;
    }

    // Agregar extras
    if (product.extras && product.extras.type === 'checkbox') {
        modalContent += `<div class="options-group">
            <label class="options-group-label">${product.extras.label}</label>`;
        product.extras.choices.forEach(extra => {
            modalContent += `
                <label class="option-checkbox-label">
                    <input type="checkbox" class="option-checkbox" value="${extra.name}" data-price="${extra.price}" name="extras">
                    <span>${extra.name} (+$${extra.price})</span>
                </label>
            `;
        });
        modalContent += `</div>`;
    }

    modalContent += `
            </div>
            <div class="options-modal-footer">
                <button class="btn-cancel" onclick="closeOptionsModal()">Cancelar</button>
                <button class="btn-confirm" onclick="confirmAddToCart(${productId})">Agregar al Carrito</button>
            </div>
        </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Para producto tipo cantidad (tortillas), actualizar total al cambiar y listener en input
    if (product.options && product.options.type === 'quantity') {
        const input = document.getElementById('tortillaQuantity');
        if (input) {
            input.addEventListener('input', updateTortillaTotalDisplay);
            input.addEventListener('change', updateTortillaTotalDisplay);
        }
    }

    // Agregar validación en tiempo real para máximo de selecciones
    if (product.options && product.options.type === 'checkbox' && product.options.maxSelections) {
        const isTacoOrder = productId === 5 || productId === 6;
        
        if (!isTacoOrder) {
            const checkboxes = modal.querySelectorAll('input[name="options"]');
            const maxSelections = product.options.maxSelections;
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const checked = modal.querySelectorAll('input[name="options"]:checked');
                    if (checked.length > maxSelections) {
                        this.checked = false;
                        alert(`Solo puedes seleccionar hasta ${maxSelections} opciones`);
                    }
                });
            });
        } else {
            // Actualizar contador inicial para órdenes de tacos
            setTimeout(() => updateTacoTotal(), 100);
        }
    }
}

// Ajustar cantidad de tacos
function adjustTacoQuantity(choiceName, change, maxTotal) {
    const qtyInput = document.getElementById(`qty-${choiceName}`);
    if (!qtyInput) return;
    
    const currentValue = parseInt(qtyInput.value) || 0;
    let newValue = currentValue + change;
    
    // Calcular total actual de todos los tacos (sin incluir el que estamos cambiando)
    const allQtyInputs = document.querySelectorAll('.qty-input');
    let currentTotal = 0;
    allQtyInputs.forEach(input => {
        if (input.id !== `qty-${choiceName}`) {
            currentTotal += parseInt(input.value) || 0;
        }
    });
    
    // Verificar límites
    if (newValue < 0) {
        newValue = 0;
    } else if (change > 0 && (currentTotal + newValue) > maxTotal) {
        alert(`Solo puedes seleccionar hasta ${maxTotal} tacos en total. Ya tienes ${currentTotal} seleccionados.`);
        return;
    }
    
    qtyInput.value = newValue;
    updateTacoTotal();
    
    // Actualizar estado de botones para este input específico
    const minusBtn = document.querySelector(`.qty-minus[data-choice="${choiceName}"]`);
    const plusBtn = document.querySelector(`.qty-plus[data-choice="${choiceName}"]`);
    
    if (minusBtn) {
        minusBtn.disabled = newValue <= 0;
    }
}

// Actualizar total de tacos seleccionados
function updateTacoTotal() {
    const allQtyInputs = document.querySelectorAll('.qty-input');
    let total = 0;
    const maxTotal = parseInt(allQtyInputs[0]?.max || 5) || 5;
    
    allQtyInputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    
    const totalTacosCount = document.getElementById('totalTacosCount');
    if (totalTacosCount) {
        totalTacosCount.textContent = total;
    }
    
    // Actualizar estado de botones
    allQtyInputs.forEach(input => {
        const choiceName = input.dataset.choice;
        const value = parseInt(input.value) || 0;
        const minusBtn = document.querySelector(`.qty-minus[data-choice="${choiceName}"]`);
        const plusBtn = document.querySelector(`.qty-plus[data-choice="${choiceName}"]`);
        
        if (minusBtn) {
            minusBtn.disabled = value <= 0;
        }
        if (plusBtn) {
            plusBtn.disabled = total >= maxTotal;
        }
    });
}

// Ajustar cantidad de tortillas en el modal
function adjustTortillaQuantity(change) {
    const input = document.getElementById('tortillaQuantity');
    if (!input) return;
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 999;
    let value = parseInt(input.value) || min;
    value = Math.max(min, Math.min(max, value + change));
    input.value = value;
    updateTortillaTotalDisplay();
}

// Actualizar el total mostrado para tortillas
function updateTortillaTotalDisplay() {
    const input = document.getElementById('tortillaQuantity');
    const display = document.getElementById('tortillaTotalDisplay');
    if (!input || !display) return;
    const unitPrice = parseFloat(input.dataset.unitPrice) || 1.5;
    let qty = parseInt(input.value) || 0;
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 999;
    qty = Math.max(min, Math.min(max, qty));
    input.value = qty;
    const total = (qty * unitPrice).toFixed(2);
    display.textContent = `$${total}`;
}

// Cerrar modal de opciones
function closeOptionsModal() {
    const modal = document.getElementById('optionsModal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Confirmar y agregar al carrito con opciones
function confirmAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let selectedOptions = null;
    let selectedExtras = null;
    let extraPrice = 0;
    let customQuantity = null;

    // Producto tipo cantidad (ej. tortillas de harina)
    if (product.options && product.options.type === 'quantity') {
        const input = document.getElementById('tortillaQuantity');
        if (!input) return;
        const qty = parseInt(input.value) || 0;
        const min = product.options.min ?? 1;
        if (qty < min) {
            alert(`Por favor ingresa al menos ${min} cantidad`);
            return;
        }
        customQuantity = qty;
        addToCart(productId, null, null, 0, customQuantity);
        closeOptionsModal();
        return;
    }

    // Obtener opciones seleccionadas
    if (product.options) {
        if (product.options.type === 'select') {
            const select = document.getElementById('optionSelect');
            if (select && select.value) {
                selectedOptions = select.value;
            } else {
                alert('Por favor selecciona una opción');
                return;
            }
        } else if (product.options.type === 'checkbox') {
            const isTacoOrder = productId === 5 || productId === 6;
            
            if (isTacoOrder) {
                // Para órdenes de tacos, obtener cantidades de cada guiso
                const qtyInputs = document.querySelectorAll('#optionsModal .qty-input');
                const selectedGuisos = [];
                
                qtyInputs.forEach(input => {
                    const quantity = parseInt(input.value) || 0;
                    if (quantity > 0) {
                        const choiceName = input.dataset.choice;
                        // Agregar el guiso la cantidad de veces seleccionada
                        for (let i = 0; i < quantity; i++) {
                            selectedGuisos.push(choiceName);
                        }
                    }
                });
                
                // Validar que se haya seleccionado al menos un taco
                if (selectedGuisos.length === 0) {
                    alert('Por favor selecciona al menos un taco');
                    return;
                }
                
                // Validar máximo de selecciones
                const maxSelections = product.options.maxSelections || 5;
                if (selectedGuisos.length > maxSelections) {
                    alert(`Solo puedes seleccionar hasta ${maxSelections} tacos en total`);
                    return;
                }
                
                selectedOptions = selectedGuisos;
            } else {
                const checkboxes = document.querySelectorAll('#optionsModal input[name="options"]:checked');
                selectedOptions = Array.from(checkboxes).map(cb => cb.value);
                
                // Validar máximo de selecciones
                const maxSelections = product.options.maxSelections || product.options.choices.length;
                if (selectedOptions.length > maxSelections) {
                    alert(`Solo puedes seleccionar hasta ${maxSelections} opciones`);
                    return;
                }
                
                // Si no hay opciones seleccionadas pero son requeridas (no aplica si es "desmarca lo que no quieras")
                if (selectedOptions.length === 0 && product.options.required !== false && !product.options.defaultChecked) {
                    alert('Por favor selecciona al menos una opción');
                    return;
                }
            }
        }
    }

    // Obtener extras seleccionados
    if (product.extras && product.extras.type === 'checkbox') {
        const extraCheckboxes = document.querySelectorAll('#optionsModal input[name="extras"]:checked');
        selectedExtras = Array.from(extraCheckboxes).map(cb => cb.value);
        extraPrice = Array.from(extraCheckboxes).reduce((sum, cb) => sum + parseFloat(cb.dataset.price || 0), 0);
    }

    addToCart(productId, selectedOptions, selectedExtras, extraPrice);
    closeOptionsModal();
}

// Añadir al carrito
function addToCart(productId, selectedOptions = null, selectedExtras = null, extraPrice = 0, customQuantity = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const finalPrice = product.price + extraPrice;
    const quantity = customQuantity != null && customQuantity > 0 ? customQuantity : 1;
    const cartItem = {
        ...product,
        id: `${productId}-${Date.now()}`, // ID único para cada item con opciones diferentes
        originalId: productId,
        selectedOptions: selectedOptions,
        selectedExtras: selectedExtras,
        price: finalPrice,
        quantity: quantity
    };

    cart.push(cartItem);
    saveCartToStorage();
    updateCartUI();
    
    const optionsText = selectedOptions ? ` con ${Array.isArray(selectedOptions) ? selectedOptions.join(', ') : selectedOptions}` : '';
    showNotification(`${product.name}${optionsText} añadido al carrito`);
}

// Remover del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartUI();
}

// Limpiar todo el carrito
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
        cart = [];
        saveCartToStorage();
        updateCartUI();
        showNotification('Carrito vaciado');
    }
}

// Actualizar cantidad
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCartToStorage();
        updateCartUI();
    }
}

// Actualizar UI del carrito
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    const cartBadgeTop = document.getElementById('cartBadgeTop');
    const cartButton = document.getElementById('cartButton');
    const sendWhatsApp = document.getElementById('sendWhatsApp');

    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Actualizar badges
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (cartBadgeTop) {
        cartBadgeTop.textContent = totalItems;
        cartBadgeTop.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Actualizar botón flotante del carrito
    if (cartButton) {
        const totalText = cartButton.querySelector('.cart-total-text');
        const totalDisplay = total > 0 ? `TOTAL $${total.toFixed(2)}` : 'Carrito';
        if (totalText) {
            totalText.textContent = totalDisplay;
        } else {
            const totalTextEl = document.createElement('span');
            totalTextEl.className = 'cart-total-text';
            totalTextEl.textContent = totalDisplay;
            cartButton.appendChild(totalTextEl);
        }
    }

    // Actualizar botón de limpiar carrito
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.style.display = cart.length > 0 ? 'flex' : 'none';
        clearCartBtn.onclick = clearCart;
    }

    // Actualizar items del carrito
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        sendWhatsApp.disabled = true;
        cartTotal.textContent = '$0.00';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const itemTotal = item.price > 0 ? `$${(item.price * item.quantity).toFixed(2)}` : 'Consultar precio';
            
            let optionsInfo = '';
            if (item.selectedOptions) {
                if (Array.isArray(item.selectedOptions)) {
                    const isPizzaOrBurger = item.originalId === 7 || item.originalId === 8;
                    if (isPizzaOrBurger) {
                        optionsInfo = `<div class="cart-item-options">Con: ${item.selectedOptions.join(', ')}</div>`;
                    } else {
                        const guisosCount = {};
                        item.selectedOptions.forEach(guiso => {
                            guisosCount[guiso] = (guisosCount[guiso] || 0) + 1;
                        });
                        const guisosFormatted = Object.entries(guisosCount)
                            .map(([guiso, count]) => count > 1 ? `${count}x ${guiso}` : guiso)
                            .join(', ');
                        optionsInfo = `<div class="cart-item-options">Guisos: ${guisosFormatted}</div>`;
                    }
                } else {
                    optionsInfo = `<div class="cart-item-options">${item.name.includes('Agua') ? 'Sabor: ' : 'Guiso: '}${item.selectedOptions}</div>`;
                }
            }
            
            if (item.selectedExtras && item.selectedExtras.length > 0) {
                optionsInfo += `<div class="cart-item-options">Extras: ${item.selectedExtras.join(', ')}</div>`;
            }
            
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${optionsInfo}
                    <div class="cart-item-price">${itemTotal}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Actualizar total en el sidebar
        if (cartTotal) {
            cartTotal.textContent = total > 0 ? `$${total.toFixed(2)}` : 'Consultar precio';
        }
        if (sendWhatsApp) {
            sendWhatsApp.disabled = false;
        }
    }
}

// Enviar a WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) return;

    let message = "🍽️ *EL SAZON*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    message += "👋 *¡Hola!*\n\n";
    message += "Me gustaría realizar el siguiente pedido:\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";

    cart.forEach((item, index) => {
        message += `📦 *${index + 1}. ${item.name}*\n`;
        message += `   ✨ Cantidad: ${item.quantity}\n`;
        
        if (item.selectedOptions) {
            if (Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0) {
                const isPizzaOrBurger = item.originalId === 7 || item.originalId === 8;
                const label = isPizzaOrBurger ? 'Con:' : 'Guisos seleccionados:';
                if (isPizzaOrBurger) {
                    message += `   🎯 ${label} ${item.selectedOptions.join(', ')}\n`;
                } else {
                    const guisosCount = {};
                    item.selectedOptions.forEach(guiso => {
                        guisosCount[guiso] = (guisosCount[guiso] || 0) + 1;
                    });
                    message += `   🎯 ${label}\n`;
                    Object.entries(guisosCount).forEach(([guiso, count]) => {
                        if (count > 1) {
                            message += `      • ${count}x ${guiso}\n`;
                        } else {
                            message += `      • ${guiso}\n`;
                        }
                    });
                }
            } else if (!Array.isArray(item.selectedOptions)) {
                message += `   🎯 ${item.name.includes('Agua') ? 'Sabor' : 'Guiso'}: ${item.selectedOptions}\n`;
            }
        }
        
        if (item.selectedExtras && item.selectedExtras.length > 0) {
            message += `   ➕ Extras:\n`;
            item.selectedExtras.forEach(extra => {
                message += `      • ${extra}\n`;
            });
        }
        
        if (item.price > 0) {
            message += `   💵 Precio unitario: $${item.price.toFixed(2)}\n`;
            message += `   💰 Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
        } else {
            message += `   💵 Precio: Consultar\n`;
        }
        message += `\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    if (total > 0) {
        message += `💰 *TOTAL A PAGAR: $${total.toFixed(2)}*\n\n`;
    } else {
        message += `💰 *Total: Consultar precio*\n\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `✨ *De La Abuela y Su Nieta* ✨\n\n`;
    message += `🙏 ¡Gracias por tu preferencia! 😊`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(139, 69, 19, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Añadir animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .cart-item {
        animation: fadeIn 0.3s ease-out;
    }
    
    .product-card {
        animation: fadeIn 0.5s ease-out;
        animation-fill-mode: both;
    }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    .product-card:nth-child(5) { animation-delay: 0.5s; }
    .product-card:nth-child(6) { animation-delay: 0.6s; }
    .product-card:nth-child(7) { animation-delay: 0.7s; }
    .product-card:nth-child(8) { animation-delay: 0.8s; }
    .product-card:nth-child(9) { animation-delay: 0.9s; }
`;
document.head.appendChild(style);

// Modal de imagen ampliada
function openImageModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.id = 'imageModal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <button class="close-image-modal" onclick="closeImageModal()">&times;</button>
            <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
            <p class="modal-image-caption">${imageAlt}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}
