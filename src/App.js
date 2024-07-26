import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [customerName, setCustomerName] = useState('');
  const [sushiAQuantity, setSushiAQuantity] = useState(0);
  const [sushiBQuantity, setSushiBQuantity] = useState(0);
  const [orders, setOrders] = useState([]);

  const addToCart = async () => {
    const order = {
      customer_name: customerName,
      items: [
        { sushi_type: 'Sushi A', quantity: parseInt(sushiAQuantity) },
        { sushi_type: 'Sushi B', quantity: parseInt(sushiBQuantity) }
      ]
    };

    const response = await fetch('http://localhost:8000/add_to_cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchOrders = async () => {
    const response = await fetch('http://localhost:8000/fetch_orders');
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="App">
      <h1>Susan's Sushi Shop</h1>
      <div>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sushi A Quantity"
          value={sushiAQuantity}
          onChange={(e) => setSushiAQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sushi B Quantity"
          value={sushiBQuantity}
          onChange={(e) => setSushiBQuantity(e.target.value)}
        />
        <button onClick={addToCart}>Add to Cart</button>
      </div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            {order.customer_name} ordered {order.items.map(item => (
              <span key={item.id}>{item.quantity} x {item.sushi_type}</span>
            ))}
            - Total: {order.total_price}£, Discount: {order.discount_applied}, Final Price: {order.final_price}£
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
