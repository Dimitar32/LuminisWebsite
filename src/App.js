// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products.jsx';
import FAQ from './pages/FAQ/FAQ';
import OrderForm from './pages/OrderForm/OrderForm';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import NotAvaliable from './pages/NotAvaliable/NotAvaliable.jsx';
import Delivery from './pages/Delivery/Delivery.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx';
import { CartProvider } from './pages/contexts/CartContext'; // Импортирай провайдъра
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollTop from './ScrollTop.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ScrollTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/order" element={<OrderForm />} /> {/* Добавяме нов маршрут за формата */}
            <Route path="/notavl" element={<NotAvaliable />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
      
            {/* <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} /> */}
            {/* <Route path="/cart" element={<Cart cartItems={cartItems} sendOrder={sendOrder} />} /> */}
          </Routes>
          <Cart />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
