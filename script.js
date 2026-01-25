// Datos de productos (puedes modificar estos datos)
const products = [
    {
        id: 1,
        name: "Burrito",
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
        options: null,
        price: 65,
        includes: "INCLUYE: CEBOLLA ASADA, CILANTRO, LIMÓN Y SALSA.",
        image: "orden_de_bistec.jpg"
    },
    {
        id: 5,
        name: "Orden de Harina",
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
        options: {
            type: "checkbox",
            label: "GUISOS A ELEGIR:",
            choices: ["DESEBRADA", "CHICHARRÓN", "BISTEC", "PICADILLO", "ASADO DE PUERCO"],
            maxSelections: 5
        },
        price: 50,
        includes: "INCLUYE: CEBOLLA ASADA O LECHUGA, LIMÓN Y SALSA.",
        image: "orden_de_maiz.jpg"
    }
];

// Estado del carrito
let cart = [];

// Número de WhatsApp
const whatsappNumber = "5218128833450"; // Formato: código de país + número sin espacios ni símbolos

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateCartUI();
});

// Renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    // Renderizar todos los productos juntos
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const priceText = product.price > 0 ? `$${product.price.toFixed(0)}` : '';
        const priceUnit = product.price > 0 && (product.name.includes('Hot Dog') || product.name.includes('Burrito')) ? ' C/U' : '';
        
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
                <img src="${product.image}" alt="${product.name}" class="product-image">
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
        
        if (product.options.type === 'select') {
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
                modalContent += `<p class="max-selections-info">Puedes seleccionar hasta ${maxSelections} opciones</p>`;
                product.options.choices.forEach((choice, index) => {
                    const choiceName = typeof choice === 'string' ? choice : choice.name;
                    modalContent += `
                        <label class="option-checkbox-label">
                            <input type="checkbox" class="option-checkbox" value="${choiceName}" name="options" data-max="${maxSelections}">
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
                
                // Si no hay opciones seleccionadas pero son requeridas
                if (selectedOptions.length === 0 && product.options.required !== false) {
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
function addToCart(productId, selectedOptions = null, selectedExtras = null, extraPrice = 0) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const finalPrice = product.price + extraPrice;
    const cartItem = {
        ...product,
        id: `${productId}-${Date.now()}`, // ID único para cada item con opciones diferentes
        originalId: productId,
        selectedOptions: selectedOptions,
        selectedExtras: selectedExtras,
        price: finalPrice,
        quantity: 1
    };

    cart.push(cartItem);
    updateCartUI();
    
    const optionsText = selectedOptions ? ` con ${Array.isArray(selectedOptions) ? selectedOptions.join(', ') : selectedOptions}` : '';
    showNotification(`${product.name}${optionsText} añadido al carrito`);
}

// Remover del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Actualizar cantidad
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
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
                    optionsInfo = `<div class="cart-item-options">Opciones: ${item.selectedOptions.join(', ')}</div>`;
                } else {
                    optionsInfo = `<div class="cart-item-options">Opción: ${item.selectedOptions}</div>`;
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
                message += `   🎯 Guisos seleccionados:\n`;
                item.selectedOptions.forEach(option => {
                    message += `      • ${option}\n`;
                });
            } else if (!Array.isArray(item.selectedOptions)) {
                message += `   🎯 Guiso: ${item.selectedOptions}\n`;
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

// Añadir animación de salida
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
`;
document.head.appendChild(style);
