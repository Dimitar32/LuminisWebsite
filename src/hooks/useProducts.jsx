import { useState, useEffect } from "react";
import { fetchProducts } from "../api/api";

/**
 * Custom hook to manage fetching products.
 * @param {string} brand - Optional brand filter for fetching products.
 * @returns {Object} - { products, blurProducts, loading, error }
 */
const useProducts = (brand) => {
    const [products, setProducts] = useState([]);
    const [blurProducts, setBlurProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const allProducts = await fetchProducts(brand);

                // Categorize products based on stock quantity
                const availableProducts = allProducts.filter(product => product.quantity > 0);
                const outOfStockProducts = allProducts.filter(product => product.quantity <= 0);

                setProducts(availableProducts);
                setBlurProducts(outOfStockProducts);
            } catch (err) {
                setError(err.message);
                console.error("Error loading products:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [brand]);

    return { products, blurProducts, loading, error };
};

export default useProducts;
