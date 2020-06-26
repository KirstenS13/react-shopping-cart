import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const item = window.localStorage.getItem("cart");
		return item ? JSON.parse(item) : [];
	});

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item]);
		setValue([...cart, item]);
	};

	const removeItem = id => {
		const newCart = cart.filter(item => item.id !== id);
		setCart(newCart);
		setValue(newCart);
	};

	const useLocalStorage = (key, initialValue) => {
		const [storedValue, setStoredValue] = useState(() => {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		});
		const setValue = value => {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		};
		return [storedValue, setValue];
	};

	const [storedValue, setValue] = useLocalStorage("cart", cart);	

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
				
			</ProductContext.Provider>
		</div>
	);
}

export default App;
