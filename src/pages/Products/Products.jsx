import {/*useState,*/ React} from 'react';
import { Link } from 'react-router-dom'; 
import './Products.css';
import Saturn from '../Products/luminis saturn.png';
import Heart from '../Products/luminis heart.png';
import MilkyWay from '../Products/luminis milky way.png';
import Earth from '../Products/luminis earth.png';

const products = [
    { id: 1, name: 'Luminis Cosmos', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Saturn },
    { id: 2, name: 'Luminis Milky Way', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: MilkyWay },
    { id: 3, name: 'Luminis Earth', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Earth },
    { id: 4, name: 'Luminis Heart', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: Heart }
];

const blurProducts = [
    // { id: 8, name: 'Макуин и Сали', oldPrice: '??.?? лв', price: 'Изчерпано', imageUrl: McQueen }
];

const Products = () => {
    return (
        <section id="products" className="products-section">
            <h2 className="products-title">Нашите продукти</h2>
            {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="discount-label">
                            <span>-28%</span>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="old-price">{product.oldPrice}</p> 
                        <p className="new-price">{product.price}</p>    
                        {/* <button className="add-to-cart-button" onClick={handleAddToCart}>Добави</button> */}
                    </div>
                </Link>
            ))}
            {blurProducts.map(product => (
                <Link to={`/notavl`} key={product.id} className="product-link">
                <div key={product.id} className="product-card-blur">
                    <img src={product.imageUrl} alt={product.name} className="product-image-blur" />
                        <h3>{product.name}</h3>
                        <p className="product-card-blur-old-price">{product.oldPrice}</p> {/* Показване на старата цена със зачеркване */}
                        <p className="new-price">{product.price}</p> {/* Показване на новата цена */}
                </div>
                </Link>
            ))}
        </section>
    );
};

export default Products;
