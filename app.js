const cart = { items: JSON.parse(localStorage.getItem('dashmate-items') || '[]') };
const countEl = document.querySelector('.cart-count');
const totalEl = document.querySelector('.cart-total');
const statusEl = document.querySelector('.cart-status');
const checkoutButton = document.querySelector('.checkout-btn');
const backdrop = document.querySelector('.modal-backdrop');
const bagModal = document.querySelector('.bag-modal');
const paymentModal = document.querySelector('.payment-modal');
const confirmationModal = document.querySelector('.confirmation-modal');
const menuModal = document.querySelector('.menu-modal');
const menuTitle = document.querySelector('#menu-title');

const menus = {
  noodle: { title: 'Noodle Theory', label: 'STUDENT-RUN KITCHEN', items: [['Spicy schezwan noodles', 'Wok-tossed noodles, vegetables, spring onion', 189], ['Crispy veg momos', 'Eight momos with spicy chutney', 149], ['Gulab jamun', 'Two warm syrup-soaked dumplings', 79]] },
  market: { title: 'The Corner Market', label: 'KIRANA · READY IN 10–15 MIN', items: [['Snack run bundle', 'Chips, namkeen, chocolate, and a cold drink', 149], ['Breakfast rescue', 'Poha, banana, curd, and chai', 189], ['Hydration pack', 'Three chilled drinks', 99]] },
  coffee: { title: 'Northside Coffee', label: 'CHAI · READY IN 8–12 MIN', items: [['Masala chai', 'Freshly brewed with ginger and cardamom', 99], ['Paneer puff', 'Flaky pastry with spiced paneer', 89], ['Cold coffee', 'Blended coffee with chilled milk', 129]] },
  thali: { title: 'Ghar Ka Tiffin', label: 'HOMESTYLE · READY IN 14–19 MIN', items: [['Daily veg thali', 'Dal, two sabzis, roti, rice, salad', 219], ['Rajma chawal', 'Slow-cooked rajma with steamed rice', 169], ['Paneer paratha', 'Two parathas, curd, and pickle', 149]] },
  dosa: { title: 'Dosa Department', label: 'SOUTH INDIAN · READY IN 11–17 MIN', items: [['Masala dosa', 'Crisp dosa, potato masala, sambar, chutney', 139], ['Idli sambar', 'Four soft idlis with sambar and chutney', 99], ['Mysore cheese dosa', 'Spicy chutney, cheese, and crisp dosa', 179]] },
  juice: { title: 'Fresh Press', label: 'MADE TO ORDER · READY IN 7–12 MIN', items: [['Mango lassi', 'Thick yogurt, mango, and cardamom', 119], ['Watermelon cooler', 'Fresh watermelon with mint and lime', 99], ['Peanut butter shake', 'Banana, peanut butter, and chilled milk', 149]] },
  pantry: { title: 'Campus Pantry', label: 'GROCERIES · READY IN 10–15 MIN', items: [['Dorm snack restock', 'Parle-G, namkeen, popcorn, fruit snacks', 179], ['Maggi 6-pack', 'Six classic masala noodle cups', 129], ['Cold drink trio', 'Water, juice, and iced tea', 99]] },
  quickstop: { title: 'QuickStop Market', label: 'ESSENTIALS · READY IN 8–12 MIN', items: [['Late-night essentials', 'Toothpaste, tissues, soap, and lip balm', 249], ['USB-C charging cable', 'Six-foot braided cable', 499], ['First aid mini-kit', 'Bandages, antiseptic, and pain relief', 199]] }
};

const menuExtras = {
  noodle: [['Chilli garlic noodles', 'Garlic wok noodles with crunchy vegetables', 179], ['Veg hakka noodles', 'Classic street-style noodles', 169], ['Paneer chilli', 'Crispy paneer in chilli sauce', 199], ['Gobi manchurian', 'Crisp cauliflower with tangy glaze', 179], ['Veg fried rice', 'Wok-fried rice with seasonal vegetables', 169], ['Schezwan fried rice', 'Spicy rice with spring onion', 189], ['Honey chilli potato', 'Crispy potato, honey, and sesame', 179], ['Crispy corn', 'Golden corn with chilli and lime', 159], ['Spring rolls', 'Four vegetable spring rolls', 149], ['Paneer bao', 'Three steamed buns with paneer', 169], ['Veg ramen bowl', 'Noodles, vegetables, and sesame broth', 199], ['Thai curry rice', 'Mild coconut curry with steamed rice', 219], ['Korean fried rice', 'Spicy kimchi-style rice, vegetarian', 199], ['Mushroom pepper fry', 'Peppery mushrooms and onions', 179], ['Corn cheese momos', 'Eight momos with cheese and corn', 169], ['Tandoori momos', 'Eight smoky momos with mint dip', 179], ['Chilli paneer noodles', 'Noodles with paneer and peppers', 209], ['Manchow soup', 'Hot garlic broth with crunchy noodles', 139], ['Sweet corn soup', 'Creamy corn and spring onion soup', 119], ['Fried rice combo', 'Fried rice with six vegetable momos', 249]],
  market: [['Masala dosa combo', 'Dosa, sambar, chutney, and chai', 189], ['Chole kulche', 'Spiced chickpeas with two kulchas', 159], ['Veg biryani', 'Aromatic rice with vegetables and raita', 199], ['Chicken biryani', 'Fragrant chicken biryani and raita', 249], ['Pav bhaji', 'Butter pav with spiced vegetable bhaji', 149], ['Vada pav duo', 'Two Mumbai-style vada pavs', 99], ['Samosa 4-pack', 'Four potato and pea samosas', 109], ['Kachori 2-pack', 'Two flaky dal kachoris', 89], ['Makhana snack', 'Roasted peri-peri foxnuts', 129], ['Trail mix', 'Nuts, raisins, and seeds', 159], ['Yogurt cup', 'Chilled fruit yogurt', 59], ['Lassi bottle', 'Sweet chilled lassi', 69], ['Masala buttermilk', 'Spiced chaas, 500 ml', 55], ['Bread pakoda', 'Two fried bread pakodas', 89], ['Thepla pack', 'Four methi theplas with pickle', 129], ['Ready poha', 'Fresh poha with peanuts and sev', 99], ['Cup noodles', 'Classic masala instant noodles', 45], ['Chips variety pack', 'Four assorted Indian chips', 119], ['Chocolate biscuit pack', 'Two cream biscuit packs', 79], ['Tea-time combo', 'Biscuits, namkeen, and two chais', 149]],
  coffee: [['Adrak chai', 'Ginger tea brewed with fresh milk', 89], ['Elaichi chai', 'Cardamom tea, lightly sweetened', 89], ['Filter coffee', 'South Indian filter coffee', 119], ['Irani chai', 'Strong milky tea with saffron notes', 109], ['Masala bun', 'Soft bun with spiced butter', 79], ['Aloo samosa', 'Crisp potato samosa with chutney', 49], ['Paneer sandwich', 'Grilled sandwich with spiced paneer', 159], ['Veg grilled sandwich', 'Cheese, vegetables, and green chutney', 139], ['Corn cheese toast', 'Grilled toast with corn and cheese', 149], ['Vada pav', 'Mumbai-style potato slider', 69], ['Kanda poha', 'Fresh flattened rice with peanuts', 109], ['Upma bowl', 'South Indian semolina breakfast', 109], ['Pav bhaji toastie', 'Bhaji and cheese toasted sandwich', 169], ['Chocolate brownie', 'Warm fudgy brownie', 119], ['Banana bread', 'Moist banana loaf slice', 109], ['Chai cake', 'Spiced tea cake slice', 99], ['Mango iced tea', 'Chilled tea with mango', 129], ['Nimbu soda', 'Fresh lime soda, sweet or salted', 89], ['Rose milk', 'Chilled rose-flavoured milk', 119], ['Coffee combo', 'Cold coffee with a paneer puff', 199]],
  thali: [['Dal tadka rice', 'Yellow dal with jeera rice', 159], ['Chole rice', 'Punjabi chickpeas with rice', 169], ['Kadhi chawal', 'Comforting kadhi with steamed rice', 159], ['Dal makhani', 'Slow-cooked black lentils and roti', 189], ['Shahi paneer', 'Paneer in creamy tomato gravy', 219], ['Kadai paneer', 'Paneer with peppers and masala', 219], ['Aloo gobi', 'Potato and cauliflower dry sabzi', 149], ['Palak corn', 'Spinach gravy with sweet corn', 179], ['Malai kofta', 'Koftas in a creamy gravy', 229], ['Mix veg curry', 'Seasonal vegetables in homestyle gravy', 169], ['Roti 4-pack', 'Four whole wheat rotis', 69], ['Butter naan 2-pack', 'Two soft butter naans', 89], ['Jeera rice', 'Cumin-scented basmati rice', 99], ['Veg pulao', 'Basmati rice with vegetables', 149], ['Boondi raita', 'Chilled yogurt with boondi', 79], ['Mango pickle', 'House mango pickle side', 39], ['Gajar halwa', 'Warm carrot and cardamom pudding', 99], ['Kheer', 'Rice pudding with nuts', 89], ['Aloo paratha', 'Two potato parathas with curd', 139], ['Tiffin for two', 'Two thalis with dessert', 399]],
  dosa: [['Plain dosa', 'Crisp dosa with sambar and chutney', 109], ['Rava dosa', 'Lacy semolina dosa with chutneys', 139], ['Onion uttapam', 'Thick uttapam with caramelised onion', 139], ['Tomato uttapam', 'Tomato and coriander uttapam', 139], ['Podi idli', 'Idli tossed in spicy podi', 119], ['Medu vada', 'Three crisp vadas with sambar', 109], ['Dahi vada', 'Soft vadas in chilled yogurt', 129], ['Pongal bowl', 'Peppery rice and lentil pongal', 129], ['Lemon rice', 'South Indian lemon rice', 109], ['Curd rice', 'Cooling rice with tempering', 99], ['Coconut rice', 'Fragrant rice with coconut', 119], ['Bisi bele bath', 'Karnataka-style lentil rice', 149], ['Uttapam platter', 'Three mini uttapams and chutneys', 169], ['Cheese masala dosa', 'Masala dosa with melted cheese', 189], ['Paneer dosa', 'Dosa stuffed with spicy paneer', 199], ['Mysore masala dosa', 'Spicy red chutney and potato filling', 159], ['Filter coffee', 'Fresh South Indian filter coffee', 99], ['Kesari bath', 'Warm saffron semolina sweet', 89], ['Medu vada duo', 'Two vadas with coconut chutney', 79], ['South Indian combo', 'Dosa, idli, vada, and filter coffee', 249]],
  juice: [['Mango shake', 'Fresh mango blended with chilled milk', 139], ['Banana shake', 'Banana, milk, and honey', 119], ['Chikoo shake', 'Seasonal chikoo with chilled milk', 129], ['Pineapple juice', 'Fresh pressed pineapple juice', 109], ['Mosambi juice', 'Sweet lime juice, made to order', 119], ['Orange juice', 'Fresh squeezed orange juice', 129], ['Pomegranate juice', 'Fresh pressed anar juice', 179], ['Carrot ginger juice', 'Carrot, ginger, and lemon', 129], ['Beetroot cooler', 'Beetroot, apple, and lime', 139], ['Lemon mint cooler', 'Fresh lime, mint, and soda', 99], ['Aam panna', 'Raw mango and roasted cumin cooler', 109], ['Jaljeera', 'Spiced cumin and lime cooler', 89], ['Rose falooda', 'Rose milk, basil seeds, and vermicelli', 169], ['Mango falooda', 'Mango milk, basil seeds, and ice cream', 189], ['Fruit chaat', 'Seasonal fruit with chaat masala', 119], ['Sprouts chaat', 'Moong sprouts, vegetables, and lime', 109], ['Cheese corn sandwich', 'Grilled sandwich with corn and cheese', 149], ['Veg puff', 'Flaky puff with seasoned vegetables', 79], ['Paneer wrap', 'Paneer, salad, and mint chutney wrap', 179], ['Smoothie bowl', 'Banana, berries, granola, and seeds', 199]]
};
Object.entries(menuExtras).forEach(([key, items]) => menus[key].items.push(...items));

function getTotal() { return cart.items.reduce((total, item) => total + item.price * item.quantity, 0); }
function getCount() { return cart.items.reduce((count, item) => count + item.quantity, 0); }

function updateCart() {
  const count = getCount();
  const total = getTotal();
  countEl.textContent = count;
  totalEl.firstChild.textContent = `₹${total.toFixed(2)} `;
  checkoutButton.disabled = count === 0;
  statusEl.querySelector('strong').textContent = count === 0 ? 'Your bag is empty' : `${count} item${count === 1 ? '' : 's'} in your bag`;
  statusEl.querySelector('small').textContent = count === 0 ? 'Add something good to get started' : 'Ready whenever you are';
  renderBag();
  localStorage.setItem('dashmate-items', JSON.stringify(cart.items));
}

function renderBag() {
  document.querySelector('.bag-items').innerHTML = cart.items.length ? cart.items.map((item) => `<div class="bag-item"><div class="bag-item-icon">${item.icon}</div><div class="bag-item-copy"><strong>${item.name}</strong><small>${item.store}</small></div><div class="quantity"><button data-action="decrease" data-name="${item.name}">−</button><span>${item.quantity}</span><button data-action="increase" data-name="${item.name}">+</button></div><strong class="item-price">₹${(item.price * item.quantity).toFixed(2)}</strong><button class="remove-item" aria-label="Remove ${item.name}" data-action="remove" data-name="${item.name}">×</button></div>`).join('') : '<div class="empty-bag"><span>✦</span><strong>Your bag is waiting</strong><small>Add a bite, a drink, or a little campus rescue.</small></div>';
  const total = getTotal();
  document.querySelector('.summary-subtotal').textContent = `₹${total.toFixed(2)}`;
  document.querySelector('.summary-delivery').textContent = total ? 'FREE' : '₹0.00';
  document.querySelector('.summary-total-value').textContent = `₹${total.toFixed(2)}`;
  document.querySelector('.payment-total-value').textContent = `₹${total.toFixed(2)}`;
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.store-card');
    const name = button.dataset.item;
    const existing = cart.items.find((item) => item.name === name);
    if (existing) existing.quantity += 1;
    else cart.items.push({ name, price: Number(button.dataset.price), quantity: 1, store: card.querySelector('h3').textContent, icon: name.includes('ramen') ? '🍜' : name.includes('latte') ? '☕' : '🧺' });
    button.textContent = 'Added ✓';
    button.disabled = true;
    updateCart();
  });
});

document.querySelector('.bag-items').addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  const item = cart.items.find((entry) => entry.name === event.target.dataset.name);
  if (!item) return;
  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity -= 1;
  if (action === 'remove' || item.quantity < 1) cart.items = cart.items.filter((entry) => entry !== item);
  updateCart();
});

function openModal(modal) {
  backdrop.hidden = false;
  [bagModal, paymentModal, confirmationModal, menuModal].forEach((entry) => { entry.hidden = entry !== modal; });
  document.body.classList.add('modal-open');
}
function closeModal() { backdrop.hidden = true; document.body.classList.remove('modal-open'); }
checkoutButton.addEventListener('click', () => openModal(bagModal));
document.querySelector('.payment-trigger').addEventListener('click', () => { if (cart.items.length) openModal(paymentModal); });
document.querySelectorAll('.close-modal').forEach((button) => button.addEventListener('click', closeModal));
document.querySelector('.close-confirmation').addEventListener('click', closeModal);
backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(); });
document.querySelector('.payment-form').addEventListener('submit', (event) => { event.preventDefault(); openModal(confirmationModal); });

function showMenu(menuKey) {
  const menu = menus[menuKey];
  if (!menu) return;
  menuTitle.textContent = menu.title;
  menuModal.querySelector('.eyebrow').textContent = menu.label;
  menuModal.querySelector('.menu-list').innerHTML = menu.items.map(([name, description, price]) => `<div class="menu-row"><div><strong>${name}</strong><small>${description}</small></div><span>₹${price.toFixed(2)}</span><button class="menu-add" data-item="${name}" data-price="${price}" data-store="${menu.title}">+ Add</button></div>`).join('');
  openModal(menuModal);
}

document.querySelectorAll('.menu-btn').forEach((button) => button.addEventListener('click', () => showMenu(button.closest('.store-card').dataset.store)));
document.querySelector('.menu-list').addEventListener('click', (event) => {
  if (!event.target.classList.contains('menu-add')) return;
  const button = event.target;
  const existing = cart.items.find((item) => item.name === button.dataset.item);
  if (button.dataset.added === 'true') {
    if (existing) { existing.quantity -= 1; if (existing.quantity < 1) cart.items.splice(cart.items.indexOf(existing), 1); }
    button.dataset.added = 'false';
    button.textContent = '+ Add';
    button.classList.remove('remove-product');
  } else {
    if (existing) existing.quantity += 1;
    else cart.items.push({ name: button.dataset.item, price: Number(button.dataset.price), quantity: 1, store: button.dataset.store, icon: '🛍️' });
    button.dataset.added = 'true';
    button.textContent = '− Remove';
    button.classList.add('remove-product');
  }
  updateCart();
});

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '♡' ? '♥' : '♡';
    button.style.color = button.textContent === '♥' ? '#ff805d' : 'white';
  });
});

document.querySelectorAll('.category').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.category.active')?.classList.remove('active');
    button.classList.add('active');
  });
});

document.querySelector('.search-box input').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('.store-card').forEach((card) => {
    card.hidden = query && !card.textContent.toLowerCase().includes(query);
  });
});

document.querySelector('.filter-btn').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('active');
  event.currentTarget.innerHTML = event.currentTarget.classList.contains('active') ? 'Filters on <span>×</span>' : 'Filters <span>≡</span>';
});

updateCart();
