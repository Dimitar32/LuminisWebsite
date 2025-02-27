import {React} from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import useProducts from '../../hooks/useProducts';
import './Products.css';

const Products = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/'; 
    const { products, blurProducts, loading, error } = useProducts('Luminis'); 
    
    if (loading) {
        return <h2>Loading products...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }
    
    return (
        <section id="products" className={`products-section ${isHomePage ? 'no-margin' : ''}`}>
            <h2 className="products-title">Продукти</h2>
            {products.map(product => {
                const primaryImage = product.images.find(image => image.is_primary)?.image_url || '/images/placeholder.png';
                return(
                    <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={primaryImage} alt={product.name} className="product-image" />
                        <div className="discount-label">
                            <span>
                                {`-${((1 - product.discount_price / product.price) * 100).toFixed(0)}%`}
                            </span>
                        </div>
                        <h3>{product.productname}</h3>
                        <p className="old-price">{product.price}лв.</p> 
                        <p className="new-price">{product.discount_price}лв.</p>    
                        {/* <button className="add-to-cart-button" onClick={handleAddToCart}>Добави</button> */}
                    </div>
                    </Link>
                );
            })}
            {blurProducts.map(product => {
                const primaryImage = product.images.find(image => image.is_primary)?.image_url || '/images/placeholder.png';
                return(

                    <Link to={`/notavl`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card-blur">
                        <img src={primaryImage} alt={product.name} className="product-image-blur" />
                            <h3>{product.productname}</h3>
                            <p className="product-card-blur-old-price">??.??лв.</p> 
                            <p className="new-price">Изчерпано</p> 
                    </div>
                    </Link>
                );
            })}
        
        {/* {isAdded && (
            <div className="modal">
                <div className="modal-content">
                    <p>
                        Успешно добавено в количката!
                    </p>
                </div>
            </div>
        )} */}
        </section>
    );
};

export default Products;
