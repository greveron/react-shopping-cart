import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';


// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import { ProductContext } from "../src/contexts/ProductContext"
import { CartContext } from "../src/contexts/CartContext"

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const removeItem =(id)=>{
		const nuevoCart = cart.filter((item)=>{
		return item.id !== id
		}
		
		)
		setCart (nuevoCart)
	}

	const addItem = item => {
		// add the given item to the cart
		console.log("GR: App.js: addItem: item:", item)
	
		const nuevoProducto={
			id: Date.now(),
			title:item.title,
			price:item.price,
			image:item.image,
		}
		setCart([...cart, nuevoProducto])
	};

	return (

		<div className="App">
			<CartContext.Provider value ={{cart, removeItem}}>
			<Navigation cart={cart} />
<ProductContext.Provider value ={{addItem, products}}>
			{/* Routes */}
			<Route exact path="/">
				<Products />
			</Route>

			<Route path="/cart">
				<ShoppingCart cart={cart} />
			</Route>
			</ProductContext.Provider>
			</CartContext.Provider>
		</div>
	);
}

export default App;
