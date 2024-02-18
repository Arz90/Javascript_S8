
const getProductById = async (productId) => {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    const productData = await response.json();
    return productData;
}

const getOrders = async () => {
    const response = await fetch('http://localhost:3000/orders');
    const ordersData = await response.json();
    return ordersData;
}

const displayOrders = async () => {
    const orders = await getOrders();
    const ordersContainer = document.getElementById('orders-container');

    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const order of orders) {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML =
         `
         <h3>Pedido ${order.id}</h3>
         <p>Fecha: ${order.date}</p>
         <ul></ul>
         `;
        const productsList = orderDiv.querySelector('ul');

        for (const productInfo of order.products) {
            const product = await getProductById(productInfo.productId);
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - Cantidad: ${productInfo.quantity}`;
            productsList.appendChild(listItem);
        }

        ordersContainer.appendChild(orderDiv);
    }
}


displayOrders();