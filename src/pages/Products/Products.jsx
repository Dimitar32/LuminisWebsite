import {useState, useEffect, React} from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import './Products.css';
// import Saturn from '../Products/luminis saturn.png';
// import Heart from '../Products/luminis heart.png';
// import MilkyWay from '../Products/luminis milky way.png';
// import Earth from '../Products/luminis earth.png';
// import Perla from '../Products/Perla12.png';

// const products = [
//     { id: 9, name: 'Luminis Saturn', oldPrice: '39.99 лв', price: '29.99 лв', imageUrl: Saturn },
//     { id: 10, name: 'Luminis Milky Way', oldPrice: '39.99 лв', price: '29.99 лв', imageUrl: MilkyWay },
//     { id: 11, name: 'Luminis Earth', oldPrice: '39.99 лв', price: '29.99 лв', imageUrl: Earth },
//     { id: 12, name: 'Luminis Heart', oldPrice: '39.99 лв', price: '29.99 лв', imageUrl: Heart },
//     { id: 13, name: 'Колие с перла в мида', oldPrice: '25.99 лв', price: '17.99 лв', imageUrl: Perla }
// ];

// const blurProducts = [
//     // { id: 8, name: 'Макуин и Сали', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: McQueen }
// ];

const Products = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/'; // Adjust if your home page route is different

    const [products, setProducts] = useState([]);
    const [blurProducts, setBlurProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const brand = 'Luminis';
                // Dynamically update API URL based on the selected brand
                const url = brand ? `https://luminisapi.onrender.com/api/products?brand=${brand}` : "https://luminisapi.onrender.com/api/products";
                const response = await fetch(url);
                const data = await response.json();
    
                // Ensure backend response contains products array
                if (!data.products) throw new Error("Invalid API response");
    
                // Categorize products based on stock quantity
                const availableProducts = data.products.filter(product => product.quantity > 0);
                const outOfStockProducts = data.products.filter(product => product.quantity <= 0);
    
                setProducts(availableProducts);
                setBlurProducts(outOfStockProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts(); // Fetch all products by default
    
    }, []); // Runs only on mount
    

    return (
        <section id="products" className={`products-section ${isHomePage ? 'no-margin' : ''}`}>
            <h2 className="products-title">Нашите продукти</h2>
            {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.productname} className="product-image" />
                        <div className="discount-label">
                            <span>-26%</span>
                        </div>
                        <h3>{product.productname}</h3>
                        <p className="old-price">{product.price} лв.</p> 
                        <p className="new-price">{product.discount_price} лв.</p>    
                        {/* <button className="add-to-cart-button" onClick={handleAddToCart}>Добави</button> */}
                    </div>
                </Link>
            ))}
            {blurProducts.map(product => (
                <Link to={`/notavl`} key={product.id} className="product-link">
                <div key={product.id} className="product-card-blur">
                    <img src={product.imageUrl} alt={product.productname} className="product-image-blur" />
                        <h3>Изчерпано</h3>
                        <p className="product-card-blur-old-price">??.?? лв.</p> {/* Показване на старата цена със зачеркване */}
                        <p className="new-price">{product.discount_price}</p> {/* Показване на новата цена */}
                </div>
                </Link>
            ))}
        </section>
    );
};

export default Products;
