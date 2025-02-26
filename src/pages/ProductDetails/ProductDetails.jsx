import { useState } from 'react';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useEcontOffices from '../../hooks/useEcontOffices';  
import useSaveOrder from "../../hooks/useSaveOrder";
import './ProductDetails.css';
import useProductDetails from '../../hooks/UseProductsDetails';
import { CartContext } from '../contexts/CartContext'; 

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1); 
    
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [cantAddZero, cantAddZeroToCart] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    
    const [cityFilter, setCityFilter] = useState('');

    const { offices } = useEcontOffices();

    const { product, loading, error } = useProductDetails(id);

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    // const handleOrderClick = () => {
    //     setShowModal(true); 
    // };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        order: '',
        quantity: 1,
        additionalInfo: '',
        option: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,  
            ...(name === "office" && { address: value }) 
        }));
    };

    const handleCityFilterChange = (e) => {
        setCityFilter(e.target.value);
    };

    const filteredOffices = offices.filter((office) => {
        const fullAddress = office.address?.fullAddress?.toLowerCase().trim() || "";
        const searchInput = cityFilter.toLowerCase().trim();
        
        return fullAddress.includes(searchInput);
    });

    const { submitOrder } = useSaveOrder();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderItems = [{ id: product.id, name: product.name, quantity: formData.quantity, option: product.option, price: product.price }];
        await submitOrder(formData, orderItems, cityFilter);
        handleCloseModal();
        handleSubmitFastOrder(product);
    };

    const { addToCart } = useContext(CartContext); 

    const handleSubmitFastOrder = () =>{
        setIsOrdered(true);

        setTimeout(() => {
            setIsOrdered(false);
            navigate("/"); 
        }, 5000);
    }
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // if (value > 0) {
            setQuantity(value); // Актуализиране на бройката само ако е по-голямо от 0
        // }
    };

    const handleAddToCart = (product, quantity, value) => {
        if (product.id === 7 && !value) {
            alert('Моля, изберете опция преди да добавите този продукт в количката.');
            return;
        }

        addToCart(product, quantity, value); 

        if (quantity > 0) {
            setIsAdded(true);
        } else if (quantity === 0) {
            cantAddZeroToCart(true);
        }

        setTimeout(() => {
            cantAddZeroToCart(false);
            setIsAdded(false);
        }, 1500);
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    // Display a loading message while data is being fetched
    if (loading) {
        return <h2>Loading product details...</h2>;
    }

    // Display an error message if there was an issue fetching data
    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                loop
                className="swiper-container" 
            >
                {product.images.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <img
                            src={image.image_url}
                            alt={`Product ${index + 1}`}
                            className="product-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="product-details">
            <h2>{product.productname}</h2>
                <p className="old-price">Стара Цена: {product.price}</p>
                <p className="product-price">Цена: {product.discount_price}</p>

                <label className='product-quantity-input-label'>
                    <input className="product-quantity-input"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        style={{ width: '50px', marginLeft: '0px' }}
                    />
                </label>
                
                {/*
                {product.id === 7 && (
                    <label className="product-options-dropdown-label">
                        <select 
                            className="product-options-dropdown" 
                            value={formData.option || ''} 
                            onChange={(e) => 
                                setFormData({ ...formData, option: e.target.value })
                            }
                            required
                        >
                            <option value="" disabled>Изберете опция</option>
                            <option value="Ариел и Ерик">Ариел и Ерик</option>
                            <option value="Шрек и Фиона">Шрек и Фиона</option>
                            <option value="Нала и Симба">Нала и Симба</option>
                            <option value="Бел и Звяр">Бел и Звяр</option>
                            <option value="Рапунцел и Флин">Рапунцел и Флин</option>
                            <option value="Бъгс и Лола">Бъгс и Лола</option>
                        </select>
                    </label>
                )}
                */}

                <div className="product-buttons">
                    <button className="order-button" onClick={() => handleAddToCart(product, quantity, formData.option)}>Добави в количката</button>
                    {/* <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button> */}
                </div>

                <div className="product-description">
                    <div onClick={toggleDescription} className="description-toggle">
                        Описание на продукта {isDescriptionOpen ? "▲" : "▼"}
                    </div>
                    {isDescriptionOpen && <p className="description-text">{product.description}</p>}
                </div>

            </div>

            {isAdded && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Успешно добавено в количката!
                        </p>
                    </div>
                </div>
            )}

            {cantAddZero && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Не може да добавяте 0 продукта в количката!
                        </p>
                    </div>
                </div>
            )}

             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
            
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}> &times;{/*times;*/}</span>
                        <form  onSubmit={handleSubmit} className="order-form">
                        <div className="form-group">
                                <label>
                                    Име:
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                </label>
                                <label>
                                    Фамилия:
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        required 
                                        />
                                </label>
                                <label>
                                    Телефон:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Брой {product.productname} :
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </label>
                                <label>Търси офис по град
                                    <input 
                                        type="text" 
                                        value={cityFilter} 
                                        onChange={handleCityFilterChange} 
                                        placeholder="Например: София" 
                                    />
                                </label>
                                <label>Офис на Еконт</label>
                                <select
                                    name="office"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    >
                                    <option value="">Избери офис</option>
                                    {filteredOffices.length > 0 ? (
                                        filteredOffices.map((office) => (
                                            <option key={office.code} value={'Име на офиса: ' + office.name + ' ; Адрес: ' + office.address.fullAddress}>
                                                {office.name || "Няма име"} - {office.address.settlement?.name || office.address.fullAddress || "Няма адрес"}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Няма намерени офиси</option>
                                    )}
                                </select>
                            </div>
                            <button type="submit">Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
