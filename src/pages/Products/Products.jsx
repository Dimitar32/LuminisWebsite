import { React} from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import useProducts from "../../hooks/useProducts"; 
import './Products.css';

const Products = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/'; 
    const { products, blurProducts, loading, error } = useProducts("Luminis");

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    return (
        <section id="products" className={`products-section ${isHomePage ? 'no-margin' : ''}`}>
            <h2 className="products-title">Нашите продукти</h2>
            {products.map(product => {
                const primaryImage = product.images.find(image => image.is_primary)?.image_url || '/images/placeholder.png';
                return(
                    <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                    <div key={product.id} className="product-card">
                        <img src={primaryImage} alt={product.productname} className="product-image" />
                        <div className="discount-label">
                            <span>
                                {`-${((1 - product.discount_price / product.price) * 100).toFixed(0)}%`}
                            </span>

                        </div>
                        <h3>{product.productname}</h3>
                        <p className="old-price">{product.price} лв.</p> 
                        <p className="new-price">{product.discount_price} лв.</p>    
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
                        <img src={primaryImage} alt={product.productname} className="product-image-blur" />
                            <h3>{product.productname}</h3>
                            <p className="product-card-blur-old-price">??.?? лв.</p> {/* Показване на старата цена */}
                            <p className="new-price">Очаквайте скоро</p> {/* Показване на новата цена */}
                    </div>
                    </Link>
                );
            })}
        </section>
    );
};

export default Products;
