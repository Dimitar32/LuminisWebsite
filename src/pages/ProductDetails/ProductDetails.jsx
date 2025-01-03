import { useState } from 'react';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import emailjs from 'emailjs-com';
import './ProductDetails.css';
import Saturn from '../Products/luminis saturn.png';
import Heart from '../Products/luminis heart.png';
import MilkyWay from '../Products/luminis milky way.png';
import Earth from '../Products/luminis earth.png';
import { CartContext } from '../contexts/CartContext'; 

const products = [
    { id: 1, name: 'Luminis Saturn', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Saturn], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Ерик и Ариел. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 2, name: 'Luminis Milky Way', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [MilkyWay], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Ерик и Ариел. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 3, name: 'Luminis Earth', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Earth], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Ерик и Ариел. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` },
    { id: 4, name: 'Luminis Heart', oldPrice: '35.99 лв', price: '25.99 лв', imageUrl: [Heart], description: `
                        Подарете магическо докосване на връзката си с тези уникални ключодържатели за двойки, вдъхновени от незабравимите герои Нала и Симба. Комплектът включва два ключодържателя и поставка за тях,
                        съчетаващи се перфектно, за да символизират вашата любовна история. С изображенията на емблематичната двойка на красив фон, те са идеалният аксесоар за вас и вашия партньор.
                        Вашата любов е уникална, затова я отпразнувайте с нещо специално!` }
];

const ProductDetails = () => {
    let errOrder = "";
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1); 
    
    const [isAdded, setIsAdded] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [cantAddZero, cantAddZeroToCart] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const toggleDescription = () => {
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    const handleOrderClick = () => {
        setShowModal(true); 
    };

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
        order: product.name,
        quantity: 1,
        additionalInfo: '',
        option: product.option
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        if (product.id === 7 && !formData.option) {
            alert('Моля, изберете опция преди да добавите този продукт в количката.');
            return;
        }

        e.preventDefault();

        emailjs.send('service_b06m24g', 'template_mk02aun', formData, 'mjkXxA3GKaz2EgF9X')
            .then((response) => {
                // console.log('SUCCESS!', response.status, response.text);
                // alert('Вашата поръчка е изпратена успешно!');
            })
            .catch((err) => {
                errOrder = err;
                console.error('FAILED...', err);
                alert('Грешка при изпращането на поръчката.');
            });
        
        if (errOrder === '')
        {
            handleCloseModal();
            handleSubmitFastOrder(product);
        }

        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
            order: product.name,
            quantity: 1,
            additionalInfo: '',
            option: product.option
        });
    };

    const { addToCart } = useContext(CartContext); 

    const handleSubmitFastOrder = () =>{
        setIsOrdered(true);

        // Автоматично скриване на съобщението след 3 секунди
        setTimeout(() => {
            setIsOrdered(false);
        }, 5000);
    }
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // if (value > 0) {
            setQuantity(value); // Актуализиране на бройката само ако е по-голямо от 0
        // }
    };

    // Функция за добавяне в количката и показване на съобщението
    const handleAddToCart = (product, quantity, value) => {
        if (product.id === 7 && !value) {
            alert('Моля, изберете опция преди да добавите този продукт в количката.');
            return;
        }

        addToCart(product, quantity, value); // Извиква съществуващата функция за добавяне в количката

        if (quantity > 0) {
            // Показване на съобщението
            setIsAdded(true);
        } else if (quantity === 0) {
            cantAddZeroToCart(true);
        }

        // Автоматично скриване на съобщението след 1.5 секунди
        setTimeout(() => {
            cantAddZeroToCart(false);
            setIsAdded(false);
        }, 1500);
    };

    if (!product) {
        return <h2>Продуктът не е намерен</h2>;
    }

    return (
        <section id="products" className="product-details-section">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                loop
                className="swiper-container" // Ensure this class is applied
            >
                {product.imageUrl.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="product-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="product-details">
            <h2>{product.name}</h2>
                <p className="old-price">Стара Цена: {product.oldPrice}</p>
                <p className="product-price">Цена: {product.price}</p>

                <label className='product-quantity-input-label'>
                    <input className="product-quantity-input"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        style={{ width: '50px', marginLeft: '0px' }}
                    />
                </label>
                
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

                <div className="product-buttons">
                    <button className="order-button" onClick={() => handleAddToCart(product, quantity, formData.option)}>Добави в количката</button>
                    <button className="order-button" onClick={handleOrderClick}>Бърза поръчка</button>
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

            {/* Показване на съобщението, когато е добавено в количката */}
            {cantAddZero && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Не може да добавяте 0 продукта в количката!
                        </p>
                    </div>
                </div>
            )}

             {/* Показване на съобщението, когато е добавено в количката */}
             {isOrdered && (
                <div className="modal">
                    <div className="modal-content">
                        <p>
                            Благодарим за поръчката! Очаквайте да се свържем с Вас за потвърждение от 1 до 3 работни дни.
                        </p>
                    </div>
                </div>
            )}
            
            {/* Модал */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}> &times;{/*times;*/}</span>
                        <form  onSubmit={handleSubmit} className="order-form">
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
                                Брой {product.name} :
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </label>
                            <label>
                                Адрес на офис на Еконт:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Град:
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">Поръчай</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;
